---
publishDate: 2026-08-28
title: SentinelTrace, Cryptographic Edge Intelligence for the Cold-Chain "Dead Zone"
excerpt: SentinelTrace is a reusable, offline ESP32 watchdog that self-arms the moment a medical package is set down, runs on-device TinyML anomaly detection through the unattended handoff window, and hands the recipient a tamper-evident, cryptographically signed verdict before the box is opened.
image: sentineltrace/cover.jpg
tags:
  - cold-chain
  - tinyml
  - healthcare
  - iot
  - security
---
<p align="center">
  <img src="/assets/images/sentineltrace/cover.png" width="800"><br/>
  <i>SentinelTrace - MYOSA 6.0</i>
</p>

---

> Guarding the unwatched hours of a medical shipment - offline, on-device, and cryptographically provable.

---

## Acknowledgements

Thanks to the MYOSA 6.0 platform and the IEEE Sensors Council for the opportunity to build against a real ESP32 sensor kit rather than a simulated one, and to our faculty mentor for pushing us to keep scope honest under a hard deadline. SentinelTrace was built by a two-person team: one of us led all hardware, firmware, and ML work; the other led logistics, documentation, and testing.

---

## Overview

Every cold-chain failure the world hears about happens in transit - the part the industry has spent two decades and tens of billions of dollars instrumenting. Almost no one addresses the quiet hours between drop-off and pickup: a vaccine cooler on a busy clinic counter, a biologic waiting on a pharmacy loading dock, a clinical-trial parcel on a doorstep. No driver is watching, connectivity is frequently the weakest link, and nothing produces a trustworthy record of what happened inside that silence.

SentinelTrace is a reusable, offline watchdog built on the MYOSA ESP32 platform that self-arms the instant a courier sets a medical package down. Using entirely on-device machine learning, it guards the payload through this unattended window and hands the receiving clinician an unambiguous, evidence-backed verdict before the box is opened - backed by an HMAC-SHA256 hash-chained black-box log that survives total loss of connectivity.

**Key features:**

* Dual-core ESP32 design - Core 0 polls the sensor bus, Core 1 runs state logic, TinyML inference, display, and logging, so sensing is never blocked by decision-making
* On-device TinyML anomaly detection - an INT8-quantized TensorFlow Lite Micro autoencoder trained only on normal-handling motion, flagging abnormal handling by reconstruction error rather than a fixed threshold
* Tamper-evident black-box logging - every log row is HMAC-SHA256 hash-chained on the microSD card, so a single edited or deleted row breaks verification
* Two independent, purpose-built access paths - BLE (challenge–response HMAC unlock + chunked log pull) for the Flutter recipient app, and a self-hosted WiFi Access Point + HTTP API for the React dispatcher dashboard
* Reusable lifecycle state machine - STANDBY → ARMED → CAUTION/CRITICAL → REVIEW → STANDBY, with gesture-swipe log review on the OLED via the APDS9960
* Nine-sensor fusion (MPU6050, BMP180, APDS9960, DHT11, MQ-135, NEO-6M GPS, SSD1306, DS3231, reed switch) covering motion, seal integrity, light tamper, ambient conditions, air quality, and location - GPS is captured only on a CRITICAL event to protect the power budget

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/sentineltrace/circuit_diagram.png" width="800"><br/>
  <i>SentinelTrace circuit diagram</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/enclosure_inside_connection.png" width="800"><br/>
  <i>Inside the enclosure - sensor wiring and connections</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/web_dashboard_overview.png" width="800"><br/>
  <i>Web dashboard - Overview, live unit status</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/web_dashboard_device_status.png" width="800"><br/>
  <i>Web dashboard - Unit Detail, admin controls and telemetry</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/web_dashboard_device_logs.png" width="800"><br/>
  <i>Web dashboard - Log Review, hash-chain verified black-box log</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/flutter_app_scan_screen.png" width="400"><br/>
  <i>Flutter app - scanning for the SentinelTrace BLE advertisement</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/flutter_app_authenticating_screen.png" width="400"><br/>
  <i>Flutter app - HMAC challenge-response unlock in progress</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/flutter_app_device_status.png" width="400"><br/>
  <i>Flutter app - cycle summary after unlock</i>
</p>

<p align="center">
  <img src="/assets/images/sentineltrace/flutter_app_device_logs.png" width="400"><br/>
  <i>Flutter app - verified black-box log timeline</i>
</p>

### Videos

**Presentation**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/0sE_7A_Q8Yo"></iframe>
</div>

**Demonstration**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/AGhvunoX0Cw"></iframe>
</div>

---

## Features (Detailed)

### 1. Dual-Core Architecture

Core 0 continuously polls the I2C bus - IMU at roughly 50 Hz, ambient sensors (pressure, gas, light, humidity) every 2 seconds - and writes into a mutex-protected snapshot shared with Core 1. Core 1 owns the state machine, TinyML inference, OLED, buzzer, black-box logging, BLE server, and WiFi admin API on a 100 ms logic tick. Splitting the work this way means a slow operation on one core (an SD write, a BLE notify, an HTTP request) never causes a missed IMU sample on the other.

### 2. Sensor Fusion

| Sensor | Role | Interface / Address |
|--------|------|----------------------|
| MPU6050 | Kinematic motion - arming (jostle-then-still), drop/tamper detection, TinyML input | I2C, 0x69 (AD0 tied HIGH to avoid the DS3231 clash at 0x68) |
| BMP180 | Internal pressure seal verification - a sudden normalisation flags a cracked/opened enclosure | I2C, 0x77 |
| APDS9960 | Dual-phase: ambient-light tamper sensing in transit, then gesture-based touchless log review at pickup | I2C, 0x39 |
| SSD1306 OLED | Single-line status verdict; brief approach-wake "SYSTEM ARMED" overlay; 5-screen gesture-swipe review UI | I2C, 0x3C |
| DS3231 RTC | Timestamps every log row independent of network/NTP availability | I2C, 0x68 |
| DHT11 | Ambient (outside-enclosure) temperature and humidity, corroborating signal | GPIO4 |
| MQ-135 | Air-quality / VOC reading as a corroborating spoilage signal | ADC1, GPIO34 |
| NEO-6M GPS | Last-known location, captured only on a CRITICAL event to protect the power budget | UART2, RX=16 / TX=17 |
| Piezo buzzer | Escalating audible warning on CAUTION / CRITICAL | GPIO25 |
| Reed switch | Enclosure-open detection, LOW = sealed | GPIO27 (`INPUT_PULLUP`) |
| microSD (SPI) | Black-box flight recorder, hash-chained, survives total connectivity loss | SPI, CS=5 / SCK=18 / MISO=19 / MOSI=23 |

All I2C access is protected by a shared mutex so Core 0's polling and Core 1's occasional direct reads never collide on the bus. See `circuit_diagram.png` and `enclosure_inside_connection.jpg` above for the full wiring layout.

### 3. Reusable Lifecycle State Machine

```
STANDBY → ARMED → (CAUTION / CRITICAL) → REVIEW → STANDBY
```

* **STANDBY** - idle, waiting for a jostle-then-still motion signature (3 s of stillness after motion) to self-arm.
* **ARMED** - baseline pressure/light/gas captured at arming time; the unit is now watching for deviation from that baseline plus TinyML-flagged abnormal handling.
* **CAUTION** - a moderate deviation (e.g. a ~3 hPa pressure shift, elevated gas reading, or an anomalous-but-mild motion signature) - soft buzzer tone, amber OLED state.
* **CRITICAL** - a serious deviation (e.g. an ~8 hPa pressure drop, sustained light exposure, or the reed switch opening) - continuous buzzer, GPS fix captured, red OLED state.
* **REVIEW** - entered only after a successful BLE unlock; a 2-second "UNLOCKED" toast, then a 5-screen gesture-swipe summary (verdict, inside conditions, outside conditions, air quality, location) navigable via left/right APDS9960 swipes.

### 4. On-Device TinyML Anomaly Detection

An unsupervised autoencoder (TensorFlow Lite Micro, INT8-quantized) trained only on normal-handling IMU sequences runs directly on Core 1. Core 0 fills a rolling ~1-second IMU window; Core 1 feeds that window through the model and compares reconstruction error against a learned threshold - normal and anomalous handling produce errors that separate by orders of magnitude, so no labelled "bad handling" data was needed to train it. The model uses `MicroMutableOpResolver` restricted to only the ops the network actually needs (`FULLY_CONNECTED`), which keeps the compiled binary well inside flash budget compared to pulling in the full op resolver. During the roughly one second it takes to fill a fresh window right after arming, the firmware falls back to a simple accelerometer-magnitude threshold so there's no blind spot immediately after arming.

The MPU6050 is configured at ±8g / ±500°/s - this has to match the range used to collect the training data exactly, since a range mismatch would silently invalidate every inference the model makes.

### 5. Tamper-Evident Black-Box Logging

Every log row is signed before it's written: `HMAC-SHA256(previous row's hash + this row's fields)` becomes the new hash, and `fields,hash` is appended to a plain CSV file on the microSD card. This produces a hash chain - editing or deleting any single historical row breaks the chain from that point forward, which is what both the Flutter app and the web dashboard check for when they report a log as "verified." The signing key is a shared PSK, deliberately simple for a single judged prototype (see the security note in Usage Instructions below) rather than a per-unit provisioned key, which is what a real fleet deployment would need instead.

### 6. Two Independent Access Paths

SentinelTrace deliberately keeps the mobile (BLE) and dispatcher (WiFi) paths fully separate so either can be live without the other:

* **BLE - Flutter recipient app.** A GATT server advertising as `SentinelTrace` exposes a 16-byte challenge (read), an HMAC-SHA256 response (write), a compact cycle-summary string (read), and a chunked log-pull protocol (write "START"/"NEXT", notify 200-byte CSV chunks ending in `EOF`). Unlock requires the app to correctly HMAC-sign the device's nonce with the shared PSK - a passive BLE sniffer can't replay a captured response, since every connection gets a fresh nonce.
* **WiFi - React dispatcher dashboard.** The unit hosts its own Access Point (`SentinelTrace-Admin`) and a small HTTP API at `http://192.168.4.1`: `GET /api/status`, `GET /api/log`, `POST /api/unlock`, `POST /api/reset`, `GET /api/health`. A laptop joins that AP directly - there's no bridge server in between. This is intentionally a "join the network = trusted" model for a single bench prototype, not a production auth scheme (see the security note below).

### 7. OLED UI - Approach-Wake Deterrent and Swipe Review

While ARMED, the OLED holds a single calm status line. The APDS9960 detects a proximity approach and briefly (non-blockingly) overlays a "SYSTEM ARMED" message as an active deterrent, then returns to the calm state - this never interrupts sensor polling or logic ticks on either core. After a successful unlock, the UI shows a 2-second "UNLOCKED" toast, then a 5-screen gesture-swipe review (verdict → inside conditions → outside conditions → air quality → GPS) that the recipient scrolls through with a touchless left/right swipe over the APDS9960.

### 8. Web Dashboard - Dispatcher / Admin View

A React 19 + Vite single-page app, styled to an industrial-neumorphism design system (IBM Plex Sans/Mono, flat status colors), that talks straight to the unit's WiFi AP - no bridge process. It polls `/api/status` and `/api/log` every 5 seconds, verifies the HMAC hash chain client-side using the Web Crypto API, and never substitutes a placeholder value for a field the device hasn't actually reported (unreported fields render as `-`, not a guessed number). It provides an Overview card, a per-unit detail view with Unlock/Reset admin controls, and a searchable/paginated Log Review screen with a "Export Proof-of-Condition Certificate" download.

### 9. Flutter Mobile App - Recipient / Field View

A Flutter app that scans for the `SentinelTrace` BLE advertisement, performs the HMAC challenge–response unlock, pulls and verifies the chunked black-box log, and presents the cycle summary and log timeline in the same neumorphic visual language as the web dashboard. `flutter_blue_plus` handles scanning/GATT, and `crypto` computes the HMAC response entirely on-device.

---

## Usage Instructions

### Security Note (read before demoing)

Both the BLE PSK (`BLE_PSK_STR` in the firmware, `kPsk` in the Flutter app) and the WiFi AP password are hardcoded shared secrets - a reasonable, honest simplification for a single judged prototype, not how a real fleet would be secured (each unit should carry its own provisioned key, and the WiFi admin routes would need a per-request auth header). If you change either value, update **both** the firmware and the app copies so they stay byte-for-byte identical, or the HMAC unlock will simply fail.

### Hardware Setup

1. Wire all I2C sensors to the shared bus: `SDA=GPIO21`, `SCL=GPIO22` - DS3231 (0x68), MPU6050 (0x69, **AD0 tied to 3V3** to avoid clashing with the RTC), BMP180 (0x77), APDS9960 (0x39), SSD1306 (0x3C).
2. Wire the microSD/SPI module (VSPI): `SCK=18`, `MISO=19`, `MOSI=23`, `CS=5`.
3. Wire the NEO-6M GPS to UART2: ESP32 `RX=16` ← GPS TX, ESP32 `TX=17` → GPS RX.
4. Wire DHT11 data to `GPIO4`, MQ-135 analog out to `GPIO34` (ADC1 - stays readable with WiFi/BLE active), piezo buzzer to `GPIO25`, and the reed/limit switch to `GPIO27` (`INPUT_PULLUP`, LOW = sealed).
5. Power from the LiPo cell through the TP4056 charge circuit (bench prototype currently runs off a power bank during development).

See `circuit_diagram.png` and `enclosure_inside_connection.jpg` above for the complete wiring reference.

### Flashing the Firmware

1. Install the Arduino IDE and the Espressif ESP32 board package.
2. Copy the custom MYOSA-derived libraries into your Arduino `libraries/` folder: `BarometricPressure.h/.cpp` (BMP180), `LightProximityAndGesture.h/.cpp` (APDS9960), `oled.h/.cpp` (SSD1306 wrapper).
3. Install from the Library Manager: `DHT sensor library` by Adafruit (+ `Adafruit Unified Sensor`), `RTClib` by Adafruit, `TinyGPSPlus` by Mikal Hart, and `TensorFlowLite_ESP32`. `SD`, `SPI`, `Wire`, `BLEDevice`, `WiFi`, `WebServer`, and `mbedTLS` come with the ESP32 board package - no separate install.
4. Open `sentineltrace_firmware/sentineltrace_firmware.ino` in the Arduino IDE.
5. **Tools → Partition Scheme → set "Huge APP (3MB No OTA/1MB SPIFFS)".** This build compiles to roughly 1.73 MB - BLE + WiFi/WebServer + TFLite Micro + the ~200 KB model array + SD/SPI + mbedTLS together no longer fit the default OTA-reserving partition (~1.31 MB app slot), and the default scheme will fail with a "Sketch too big" error. A 4 MB flash board is required (standard on MYOSA and most ESP32 dev boards).
6. **On the first upload after changing the partition scheme**, set `Tools → Erase All Flash Before Sketch Upload → Enabled` for that one upload, then switch it back to `Disabled` - leftover NVS data from the old partition layout can otherwise cause a WiFi crash-loop on boot.
7. Select board `ESP32 Dev Module`, pick the correct COM/serial port, and upload.
8. Open the Serial Monitor at 115200 baud to watch the boot sequence, sensor init, and state transitions.

### Connecting via BLE (Flutter app)

1. Power on the unit and confirm the serial log shows `BLE advertising as "SentinelTrace"`.
2. Open the Flutter app and let it scan - it filters for devices advertising as `SentinelTrace`.
3. Tap the unit to connect. The app reads the 16-byte nonce, signs it with the shared PSK, and writes the HMAC response - a correct response flips the unit into `REVIEW` mode and unlocks the log-pull.
4. Shared BLE PSK (must match on both firmware and app): `SentinelTrace-Demo-PSK-ChangeMe!`

### Connecting via WiFi (Web Dashboard)

1. Power on the unit and confirm the serial log prints its AP SSID and IP (normally `192.168.4.1`).
2. On the laptop that will run the dashboard, join WiFi network **`SentinelTrace-Admin`**, password **`SentinelDemo!`**.
3. Run the dashboard (see below) - by default its dev-server proxy forwards `/api/*` straight to `http://192.168.4.1`, so no further configuration is needed once you're joined to that AP.

### Running the Flutter App

```bash
cd sentineltrace_flutter_app
flutter pub get
flutter run
```

Grant Bluetooth and Location permissions when prompted (required by the OS for BLE scanning). Build a release APK with `flutter build apk`.

### Running the Web Dashboard

```bash
cd sentineltrace_web_dashboard
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`) while your laptop is joined to the `SentinelTrace-Admin` WiFi network. If you'd rather not disconnect from your regular WiFi while developing, delete the proxy block in `vite.config.js` and instead create a `.env.local` file with:

```
VITE_DEVICE_BASE_URL=http://192.168.4.1
```

For a production build:

```bash
npm run build
npm run preview
```

---

## Tech Stack

### Firmware

* **ESP32 (MYOSA board)**, Arduino framework, FreeRTOS dual-core split
* **TensorFlow Lite Micro** - INT8-quantized autoencoder for on-device anomaly detection
* **mbedTLS** - HMAC-SHA256 for log signing and BLE challenge–response
* **BLEDevice / BLEServer** - GATT server for the mobile unlock path
* **WiFi + WebServer** - self-hosted Access Point and HTTP admin API for the dashboard
* **SD / SPI** - hash-chained black-box logging

### Machine Learning

* **Google Colab** - model training environment (local Python/TensorFlow environment incompatibility made this the practical choice)
* **TensorFlow Lite Micro** - on-device INT8 inference
* Unsupervised autoencoder trained only on normal-transit motion sequences

### Mobile App

* **Flutter / Dart**
* `flutter_blue_plus` - BLE scanning and GATT communication
* `crypto` - on-device HMAC-SHA256 computation
* `permission_handler` - runtime Bluetooth/Location permissions

### Web Dashboard

* **React 19 + Vite**
* **React Router** (HashRouter, so the built output also works from `file://`)
* **Tailwind CSS** - styled to the project's neumorphic design system
* **Web Crypto API** - client-side HMAC verification of the log hash chain

---

## Requirements / Installation

### Hardware Requirements

* MYOSA ESP32 motherboard
* MPU6050, BMP180, APDS9960, SSD1306 OLED (MYOSA Mini IoT Kit)
* DS3231 RTC, DHT11, MQ-135, NEO-6M GPS, microSD + SPI module, piezo buzzer, reed/limit switch (external additions)
* LiPo cell + TP4056 charge circuit
* 4 MB flash ESP32 board (required for the "Huge APP" partition scheme)

### Software Requirements

* **Arduino IDE** with the ESP32 board package
* **Flutter SDK** (3.3+) and a device/emulator with BLE support for the mobile app
* **Node.js** (for the Vite/React dashboard)

```bash
# Firmware libraries (Arduino Library Manager)
DHT sensor library, Adafruit Unified Sensor
RTClib, TinyGPSPlus, TensorFlowLite_ESP32
# + custom: BarometricPressure, LightProximityAndGesture, oled (place in Arduino libraries/)
```

```bash
# Flutter app
cd sentineltrace_flutter_app
flutter pub get
```

```bash
# Web dashboard
cd sentineltrace_web_dashboard
npm install
```

---

## File Structure

```
SentinelTrace_Myosa6.0/
│   circuit_diagram.png
│   cover.png
│   enclosure_inside_connection.png
│   flutter_app_authenticating_screen.png
│   flutter_app_device_logs.png
│   flutter_app_device_status.png
│   flutter_app_scan_screen.png
│   sentineltrace_demonstration_video.mp4
│   sentineltrace_myosa.md
│   sentineltrace_presentation_video.mp4
│   web_dashboard_device_logs.png
│   web_dashboard_device_status.png
│   web_dashboard_overview.png
│
├───sentineltrace_firmware
│       LightProximityAndGesture.cpp
│       LightProximityAndGesture.h
│       model_data.h
│       model_params.h
│       sentineltrace_firmware.ino
│
├───sentineltrace_flutter_app
│   │   pubspec.yaml
│   │   README.md
│   │
│   ├───android
│   ├───ios
│   ├───linux
│   ├───macos
│   ├───windows
│   ├───web
│   ├───assets
│   │   └───icon
│   │           app_icon.png
│   │
│   └───lib
│       │   main.dart
│       │
│       ├───ble
│       │       ble_constants.dart
│       │       log_verifier.dart
│       │       sentinel_ble_service.dart
│       │
│       ├───models
│       │       cycle_summary.dart
│       │       log_entry.dart
│       │
│       ├───screens
│       │       authenticating_screen.dart
│       │       dashboard_screen.dart
│       │       log_timeline_screen.dart
│       │       scan_screen.dart
│       │
│       ├───theme
│       │       app_colors.dart
│       │       app_text_styles.dart
│       │
│       └───widgets
│               neumorphic.dart
│
└───sentineltrace_web_dashboard
    │   index.html
    │   package.json
    │   README.md
    │   tailwind.config.js
    │   vite.config.js
    │
    ├───public
    │       app_icon.png
    │       favicon.svg
    │
    └───src
        │   App.jsx
        │   index.css
        │   main.jsx
        │
        ├───components
        │       NotificationBell.jsx
        │       Sidebar.jsx
        │       StatusChip.jsx
        │       TopBar.jsx
        │
        ├───context
        │       SyncContext.jsx
        │
        ├───data
        │       units.js
        │
        ├───pages
        │       LogReview.jsx
        │       Overview.jsx
        │       UnitDetail.jsx
        │
        └───services
                firmwareService.js
```

---
