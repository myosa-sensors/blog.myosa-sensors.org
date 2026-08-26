---
publishDate: 2026-08-25
title: TamperTrace — Sealed-Enclosure Tamper Detection via Pressure–Light Correlation
excerpt: ESP32-based sealed-enclosure tamper detection system combining sensor fusion (BMP180, MPU6050, APDS9960, DS1307) with an onboard INT8 TinyML autoencoder to detect covert breaches in complete darkness.
image: /assets/images/tampertrace/myosa.jpg
tags:
  - ESP32
  - TinyML
  - Sensor Fusion
  - FreeRTOS
  - Cold Chain Security
---

> Covert dark-tamper detection for sealed enclosures using pressure–light correlation and on-device TinyML autoencoder anomaly scoring.

---

## Acknowledgements

We express our sincere gratitude to **IEEE MYOSA 6.0 organizers** for providing the MYOSA hardware platform. Special thanks to our faculty mentor, **Prof. Fayisa M K** (Asst. Professor, Dept. of Computer Science & Engineering, Mar Athanasius College of Engineering / MBITS), for technical guidance in real-time system synchronization and sensor fusion architecture.

---

## Overview

TamperTrace is an advanced embedded tamper detection and forensic logging system designed for high-security transit enclosures, cold-chain pharmaceutical shipping, and critical asset containers.

### The Problem Gap

Conventional tamper detection devices and cold-chain loggers rely primarily on ambient light sensors (photodiodes/phototransistors) or mechanical switches. These traditional mechanisms suffer from a critical vulnerability:
* **The "Dark Tamper" Vulnerability:** A sophisticated bad actor can easily defeat photodiode-based tamper loggers by opening the enclosure in complete darkness (e.g., inside a dark cargo container, under an opaque shroud, or at night).
* **False Alarms from Mechanical Stress:** Vibrations and drops during transit often trigger false alarms on simple mechanical tamper switches, causing unnecessary shipment rejections.
* **Environmental Drift vs. Real Breaches:** Temperature changes during transit cause natural internal pressure drift, which naive pressure thresholds misclassify as breaches.

### The Solution: TamperTrace

TamperTrace eliminates light-blind tamper vulnerabilities by introducing **pressure–light temporal correlation** combined with an **onboard INT8 TinyML Autoencoder neural network** ($5 \rightarrow 8 \rightarrow 3 \rightarrow 8 \rightarrow 5$ architecture).

When a sealed enclosure is cracked open, the rapid equalization between internal and ambient atmospheric pressure creates a sharp pressure transient ($\Delta P \ge 0.80\text{ hPa}$ in $<300\text{ ms}$). TamperTrace captures this transient signature even when the light level remains strictly zero ($0\text{ Lux}$), flagging covert dark tampering with high statistical confidence.

```
                  ┌─────────────────────────────────────────┐
                  │          Sealed Enclosure               │
                  │  (BMP180 + MPU6050 + APDS9960 + DS1307) │
                  └────────────────────┬────────────────────┘
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
             [ Dual-EMA Filtering ]           [ IMU Shock & Light ]
             Fast (α=0.15), Slow (α=0.01)     RMS Accel & Lux Delta
                      │                                 │
                      └────────────────┬────────────────┘
                                       │
                                       ▼
                       [ 5-Feature Normalization ]
                 [ ΔP/2.0, Accel/40, Gyro/10, Prox/255, Lux/1000 ]
                                       │
                                       ▼
                     [ Onboard INT8 Autoencoder (152 Param) ]
                        Reconstruction Error (MSE) > 3σ
                                       │
                                       ▼
                    [ Confidence-Tiered Decision Engine ]
          ┌────────────────────────────┼───────────────────────────┐
          ▼                            ▼                           ▼
    [EVENT_BREACH_DARK]        [EVENT_BREACH_HIGH]         [EVENT_SHOCK_SEALED]
   Pressure Drop + Dark        Pressure + Light Correlated   Shock Only (No Breach)
          │                            │                           │
          └────────────────────────────┴───────────────────────────┘
                                       │
                                       ▼
                      [ OLED + SD Logger + Web Portal ]
```

**Key Features:**
* **Dark Tamper Detection:** Detects lid breaches in zero-light conditions via barometric pressure equalization dynamics.
* **Onboard TinyML Neural Network:** $5 \rightarrow 8 \rightarrow 3 \rightarrow 8 \rightarrow 5$ Autoencoder running at $1\text{ Hz}$ computes reconstruction error ($\text{MSE}$) on normalized sensor features.
* **Dual-EMA Baseline Drift Rejection:** Fast ($\alpha=0.15$) and slow ($\alpha=0.01$) Exponential Moving Averages eliminate diurnal weather and altitude pressure drift without sacrificing transient sensitivity.
* **Cold-Chain Spoilage Tracking:** Monitors real-time ambient temperature and flags spoilage if thresholds ($34.0^\circ\text{C}$ absolute or $+3.5^\circ\text{C}$ spike) are breached.
* **Inertial Shock Disambiguation:** Differentiates harmless cargo drops ($\ge 18\text{ m/s}^2$) from actual seal breaches.
* **Real-Time Forensic Audit Chain:** Timestamped CSV event logs backed by a dedicated DS1307 hardware RTC and MicroSD card.
* **Embedded Web Portal:** Standalone ESP32 WiFi Access Point (`TamperTrace-Secured`) serving a real-time responsive dashboard and CSV export.

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/tampertrace/myosa.jpg" width="800"><br/>
  <i>TamperTrace main unit with ESP32, BMP180, MPU6050, APDS9960, SSD1306 display, and DS1307 RTC</i>
</p>

<p align="center">
  <img src="/assets/images/tampertrace/dashboard.jpg" width="800"><br/>
  <i>Authenticated embedded Web Dashboard serving real-time telemetry, autoencoder anomaly scores, and event history</i>
</p>

<p align="center">
  <img src="/assets/images/tampertrace/kit.jpg" width="800"><br/>
  <i>TamperTrace hardware kit components and everyother used components</i>
</p>

### Videos
*Live Demo* - https://github.com/user-attachments/assets/fdde133c-9d91-4e8b-a44a-dcca97ff1152

<video controls width="100%">
  <source src="/tampertrace-demo.mp4" type="video/mp4">
</video>

---

## Features (Detailed)

### 1. Dual-EMA Adaptive Pressure Filter & Step Transient Detector

Natural atmospheric pressure changes continuously due to weather shifts and elevation changes (up to $1\text{ hPa/hr}$). Standard thresholding would cause severe false positive rates.

TamperTrace implements a 5-sample median pre-filter followed by two parallel Exponential Moving Averages in `event_classifier.cpp`:
* **Fast EMA ($\alpha = 0.15$):** Rapidly tracks real-time physical pressure changes.
* **Slow EMA ($\alpha = 0.01$):** Gradually tracks long-term ambient and altitude drift.

$$\Delta P = \text{EMA}_{\text{fast}} - \text{EMA}_{\text{slow}}$$

In addition, a 16-sample sliding history buffer evaluates rate-of-change over $500\text{ ms}$ (12 samples at $26\text{ Hz}$). A sudden seal break produces a sharp pressure pulse ($\ge 0.80\text{ hPa}$), triggering the transient event detector while rejecting slow environmental drift.

### 2. Onboard INT8 TinyML Autoencoder Model

The system embeds an autoencoder neural network (`autoencoder_model.h`) with 152 trainable weights:
* **Architecture:** $5 \text{ Inputs} \rightarrow 8 \text{ Hidden1 (ReLU)} \rightarrow 3 \text{ Latent (ReLU)} \rightarrow 8 \text{ Hidden2 (ReLU)} \rightarrow 5 \text{ Outputs (Linear)}$.
* **Inputs Normalized:**
  1. $\Delta P / 2.0\text{ hPa}$ (Divergence)
  2. $\text{Accel}_{\text{RMS}} / 40.0\text{ m/s}^2$
  3. $\text{Gyro}_{\text{RMS}} / 10.0\text{ rad/s}$
  4. $\text{Proximity} / 255.0$
  5. $\text{Ambient Light} / 1000.0\text{ Lux}$
* **Commissioning Calibration:** During a initial 60-second commissioning window (`COMMISSION_DURATION_S = 60`), the system collects baseline transit data to compute normal score mean ($\mu$) and standard deviation ($\sigma$). The anomaly threshold is dynamically locked to:

$$\text{Threshold} = \mu + 3.0 \times \sigma$$

When an anomaly occurs during transit, the autoencoder reconstruction error ($\text{MSE}$) exceeds this threshold, notifying the decision engine in $< 1\text{ ms}$ of computation.

### 3. Multi-Sensor Fusion & Decision Engine

The fusion layer (`event_classifier.cpp`) processes feature signals, autoencoder scores, and sensor states into classified event records with confidence metrics:

| Event Type | Condition & Logic | Severity | Action Taken |
| :--- | :--- | :--- | :--- |
| `EVENT_BREACH_HIGH` | $\Delta P \ge 0.80\text{ hPa}$ AND Light Transition from Dark within $2500\text{ ms}$ | **CRITICAL** (98% Conf) | Emergency Popup, Audible Alarm ($2.5\text{ kHz}$), SD Log |
| `EVENT_BREACH_DARK` | $\Delta P \ge 0.80\text{ hPa}$ AND Ambient Light $< 40\text{ Lux}$ (Total Darkness) | **CRITICAL** (95% Conf) | Dark Tamper Alert, Dual-Tone Alarm ($1.8/2.5\text{ kHz}$), SD Log |
| `EVENT_BREACH_PRESSURE` | $\Delta P \ge 0.80\text{ hPa}$ in ambient lighting | **CRITICAL** (88% Conf) | Seal Breach Alert, Alarm, SD Log |
| `EVENT_THERMAL_SPOILED` | Temp $\ge 34.0^\circ\text{C}$ OR $\Delta T \ge +3.5^\circ\text{C}$ spike | **ALERT** (95% Conf) | Thermal Alert Popup, Continuous $1.4\text{ kHz}$ Alarm, SD Log |
| `EVENT_SHOCK_SEALED` | Accel $\ge 18.0\text{ m/s}^2$ without pressure drop | **WARNING** (85% Conf) | Logged as Rough Handling, Non-breach chirp |
| `EVENT_LIGHT_WARNING` | Light spike without pressure drop (Translucent case test) | **WARNING** (75% Conf) | Light Warning flag, Timed warning chirp |

### 4. Real-World Engineering & Robustness Rigor

* **Sealing Integrity:** Tested with gasketed vacuum-tight enclosures to ensure a seal opening generates instantaneous $0.5\text{–}2.0\text{ hPa}$ differential pressure spikes.
* **Condensation Mitigation:** Includes silica gel desiccant packs within the enclosure, conformal coating on all exposed PCB copper traces, and hot-glue potting on sensitive I2C header pins to prevent moisture shorts during cold-chain temperature transitions.
* **Dual I2C Bus Architecture:**
  * **Bus 0 (Wire - Pins 21/22):** Dedicated to high-speed sensors (BMP180, APDS9960, MPU6050 at shift address `0x69`, SSD1306). Mutex-protected with $25\text{ ms}$ timeout.
  * **Bus 1 (Wire1 - Pins 16/17):** Dedicated to DS1307 RTC (`0x68`) to eliminate address collisions between MPU6050 default address (`0x68`) and DS1307.

---

## Usage Instructions

### Hardware Wiring Reference

| Module | Interface | ESP32 Pin | Address / Spec | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **BMP180 Barometer** | I2C Bus 0 | SDA: GPIO 21, SCL: GPIO 22 | `0x77` | Pressure & Temperature ($26\text{ Hz}$) |
| **MPU6050 IMU** | I2C Bus 0 | SDA: GPIO 21, SCL: GPIO 22 | `0x69` | **AD0 pin tied to 3.3V** ($50\text{ Hz}$) |
| **APDS9960 Optical** | I2C Bus 0 | SDA: GPIO 21, SCL: GPIO 22 | `0x39` | Light & Proximity ($10\text{ Hz}$) |
| **SSD1306 OLED** | I2C Bus 0 | SDA: GPIO 21, SCL: GPIO 22 | `0x3C` | $128 \times 64$ Display ($5\text{ Hz}$) |
| **DS1307 RTC** | I2C Bus 1 | SDA: GPIO 16, SCL: GPIO 17 | `0x68` | Dedicated Real-Time Clock |
| **MicroSD Card** | SPI | CS: 5, MOSI: 23, MISO: 19, SCK: 18 | SPI | FAT32 Formatted |
| **Piezo Buzzer** | GPIO PWM | GPIO 25 | LEDC PWM | Auditory alert sounder |
| **Red Alert LED** | GPIO Digital | GPIO 26 | Digital Out | Visual breach indicator |

### Flashing and Commissioning

1. Open the project folder in VS Code with PlatformIO installed.
2. Build and upload firmware to ESP32:
```bash
pio run -t upload
```
3. Open serial monitor ($115200\text{ baud}$):
```bash
pio device monitor
```
4. **Commissioning Phase:** On system power-up, keep the enclosure tightly sealed for 60 seconds. The OLED displays a progress bar while collecting baseline statistical data.
5. **Accessing Web Dashboard:**
   * Connect smartphone/laptop to WiFi AP: `TamperTrace-Secured` (Password: `tampertrace`).
   * Navigate to `http://192.168.4.1` in browser.
   * Log in with credentials: User `admin`, Password `tampertrace`.

---

## Tech Stack

* **Core Controller:** ESP32-WROOM-32E Dual-Core $240\text{ MHz}$ Microcontroller
* **Operating System / RTOS:** FreeRTOS (8 Pinned Multithreaded Tasks)
* **Framework:** PlatformIO / Arduino ESP-IDF Framework
* **TinyML Engine:** Custom embedded INT8-equivalent C++ Autoencoder ($152\text{ parameters}$, $<1\text{ ms}$ execution)
* **Storage & File System:** FAT32 MicroSD SPI Driver, SPIFFS/Flash HTML storage
* **Sensors & Peripherals:** BMP180, MPU6050, APDS9960, DS1307 RTC, SSD1306 OLED
* **Web UI:** Single-Page HTML5 / Vanilla CSS3 / JavaScript App (SSE & REST API)

---

## Requirements / Installation

### PlatformIO `platformio.ini` Dependencies

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
upload_speed = 921600
lib_deps = 
    adafruit/Adafruit BMP085 Library@^1.2.4
    adafruit/Adafruit APDS9960 Library@^1.2.5
    adafruit/Adafruit MPU6050@^2.2.6
    adafruit/RTClib@^2.1.4
    adafruit/Adafruit SSD1306@^2.5.10
    adafruit/Adafruit GFX Library@^1.11.10
    adafruit/Adafruit Unified Sensor@^1.1.14
    adafruit/Adafruit BusIO@^1.16.1
```

---

## File Structure

```
/TamperTrace
  ├─ src/
  │   ├─ main.cpp                 # FreeRTOS 8-task orchestration, setup, and loop
  │   ├─ config.h                 # Pin definitions, I2C addresses, thresholds, and data structures
  │   ├─ autoencoder_model.h      # Quantized 5-8-3-8-5 Edge AI neural network weights & inference
  │   ├─ sensor_manager.h         # Sensor manager class declaration (BMP, APDS, IMU)
  │   ├─ sensor_manager.cpp       # Mutex-protected non-blocking I2C sensor driver routines
  │   ├─ event_classifier.h       # Event classifier class declaration (Dual-EMA & fusion)
  │   ├─ event_classifier.cpp     # Dual-EMA transient filter, light history, and decision tree
  │   ├─ data_logger.h            # Data logger class declaration (RTC & MicroSD)
  │   ├─ data_logger.cpp          # Non-volatile CSV logging & DS1307 timestamp formatting
  │   ├─ display_manager.h        # SSD1306 OLED display manager declaration
  │   ├─ display_manager.cpp      # Splash screen, commissioning progress, and alert views
  │   ├─ alert_manager.h          # Alert manager class declaration (Buzzer & LED)
  │   ├─ alert_manager.cpp        # LEDC PWM tone patterns (continuous siren, dual-tone, chirps)
  │   ├─ web_server_manager.h     # Embedded Web Server class declaration
  │   ├─ web_server_manager.cpp   # SoftAP Web Server, glassmorphic UI, REST APIs & log terminal
  │   └─ test_rtc.cpp             # Hardware diagnostic utility for DS1307 RTC validation
  ├─ platformio.ini               # PlatformIO build environments, partition tables, & dependencies
  └─ README.md                    # Master technical documentation
```

---

## License

This project is open-sourced under the **MIT License**.

---

## Contribution Notes

Contributions, bug reports, and hardware integration enhancements are welcome. Feel free to open an issue or submit a pull request on the official repository.
