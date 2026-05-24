---
publishDate: 2026-05-23T00:00:00Z
title: Smart Solar-Powered Light Trap for Monitoring and Control of Spodoptera frugiperda Using MYOSA Platform
excerpt: An autonomous, solar-powered IoT light trap that exploits the phototactic response of the fall armyworm (*Spodoptera frugiperda*) to monitor and control a major pest in maize crops, replacing chemical pesticides with sensor-driven Integrated Pest Management.
image: agrolumen/light-trap-internals.jpg
tags:
  - iot
  - esp32
  - myosa
  - precision-agriculture
  - pest-monitoring
  - biosensors
  - embedded-systems
  - sustainable-agriculture
---

> Turning moth phototaxis into actionable IoT data for sustainable maize protection.

---

## Acknowledgements

This project was developed by **Team AgroLumen** at **Universidad del Magdalena** (Santa Marta, Colombia) for the **MYOSA Contest 2026** (APSCON 2026), targeting **IEEE BIOSENSORS Bangkok**.

- **Faculty Mentor:** Carlos Arturo Robles Algarín — *Universidad del Magdalena*
- **Team members:**
  - Rafael Junior Acosta Vargas *(Team Leader)*
  - María de los Ángeles Delgado Villalobos
  - Ivan Andres Robles Rodriguez

Special thanks to the **MYOSA / MakeSense Edutech** team and the **IEEE Sensors Council** for the platform that made the rapid integration of this prototype possible.

---

## Overview

The fall armyworm (*Spodoptera frugiperda*) is one of the most destructive pests of maize and other staple crops in tropical regions. Conventional control relies heavily on chemical pesticides, which carry well-documented environmental, health, and resistance costs.

This project replaces — or at least complements — that approach with an **automated, solar-powered light trap** that leverages the nocturnal moths' **phototactic response** to a UV-A light source. When insects approach the attractor stage, a downward-facing 12 V fan pulls them into a collection chamber, where they are physically removed from the field. Every capture event, together with environmental conditions (temperature, atmospheric pressure, altitude), is logged locally on an SD card and streamed in near real time to a public web dashboard.

The result is not just a trap, but an **ecological monitoring station**: data on capture frequency, time of day, and ambient conditions feeds back into IPM (Integrated Pest Management) decisions and lets farmers correlate pest activity with climate dynamics.

**Key features:**

* Solar-powered for full off-grid operation in rural farms
* Dual-mode Wi-Fi (Access Point + Station) on a single ESP32 — local UI *and* cloud streaming at the same time
* Five **independent, programmable operating windows** (AP, attractor LED, fan, SD logging, cloud sync) persisted in NVS
* Three configurable storage modes: `LOCAL` (SD), `CLOUD` (Neon Postgres), or `BOTH`
* Resilient cloud sync with an SD-backed **pending buffer** that auto-flushes when the station link comes back
* **Deep sleep** between windows with intelligent wake-up timed to the next scheduled subsystem
* On-device OLED for field diagnostics; multi-tenant public dashboard with live charts at [spodoptera.vercel.app](https://spodoptera.vercel.app)

---

## Demo / Examples

### Images

<p align="center">
  <img src="assets/images/agrolumen/trap-assembled-front.jpg" width="800"><br/>
  <i>Assembled prototype — PVC structural frame, 3D-printed upper enclosure housing the electronics and capture fan, central duct lined with UV-A LED strips, and lower collection chamber.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/light-trap-internals.jpg" width="800"><br/>
  <i>Inside the upper enclosure: MYOSA Motherboard (red PCB, bottom-left) with its 0.96" OLED, ESP32 dev module (center), DS1307 RTC with CR2032 coin cell, microSD breakout, and a custom 15×15&nbsp;cm power perfboard with the MOSFET + optocoupler driver stage for the 12&nbsp;V loads.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/ir-sensor-detail.jpg" width="800"><br/>
  <i>IR proximity sensor (MH-series module) mounted on the inner wall of the capture duct, surrounded by UV-A LED strips. This sensor detects each insect crossing the duct on a LOW→HIGH transition of its digital output.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/capture-fan.jpg" width="800"><br/>
  <i>GDSTime brushless DC fan (model GDA8015, 12&nbsp;V / 0.18&nbsp;A) integrated into the upper enclosure. When the area counter reaches the configured threshold, the fan engages for a programmable duration and pulls insects into the collection chamber.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/oled-live-data.jpg" width="800"><br/>
  <i>SSD1306 OLED display in the BMP view, showing live readings from the trap — date/time from the DS1307 RTC, temperature, pressure, and the current LED / Fan states. A front-panel button cycles between this view, an operating-windows view, and STA connectivity info.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/dashboard-hero.png" width="800"><br/>
  <i>Landing page of the public dashboard at <a href="https://spodoptera.vercel.app">spodoptera.vercel.app</a>. Branded for the MYOSA Contest 2026 entry from Universidad del Magdalena, with direct entry points to the live dashboard and to the MYOSA blog.</i>
</p>

### Videos

#### **Recorded presentation (5 min)**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/tUJR4lVR-no"></iframe>
</div>

Formal walkthrough of the project: motivation, hardware and software architecture, integration with the MYOSA platform, and outcomes.

#### **Demo video (3 min)**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/c3WBw1cDimc"></iframe>
</div>


End-to-end demo: the IR sensor detects an insect crossing the duct, the on-board counter increments on the OLED, the capture fan engages once the threshold is met, and the same event is streamed to the public dashboard in under 3 seconds.

---

## Features (Detailed)

### **1. Dual-mode Wi-Fi (AP + STA simultaneously)**

The ESP32 simultaneously exposes a local Access Point (`MYOSA_BoardServer`) for in-field configuration and joins the user's home/farm Wi-Fi as a Station for cloud sync. This means a technician can configure the trap on the spot from a phone *without* taking the trap off the network, and without needing a separate provisioning flow.

The dual mode runs only while inside the AP operating window — outside that window the radio is shut down to save power.

<p align="center">
  <img src="assets/images/agrolumen/local-wifi-config.jpg" width="800"><br/>
  <i>Local dashboard "Connectivity" tab — served by the ESP32 itself at <code>http://192.168.4.1</code>. Operators connect from a phone, see the current STA status (here: disabled), and configure router credentials in the field without re-flashing the device.</i>
</p>

### **2. Programmable operating windows**

Five subsystems run on **independent, configurable time ranges** persisted in NVS:

| Window | Default schedule | Purpose |
|--------|------------------|---------|
| `AP`    | 08:00 → 23:50 | Local Wi-Fi configuration interface |
| `LED`   | 19:30 → 04:00 | UV-A attractor LEDs |
| `Fan`   | 19:30 → 04:00 | 12 V capture fan |
| `SD`    | 18:30 → 23:50 | Local CSV logging |
| `Cloud` | 00:00 → 23:59 | Cloud streaming window |

Each window is fully editable from the dashboard and supports overnight ranges (e.g., 19:30 → 04:00 is correctly evaluated across midnight). Changes are written to `Preferences` (NVS) so they survive deep sleep and power cycles.

<p align="center">
  <img src="assets/images/agrolumen/dashboard-windows.png" width="800"><br/>
  <i>"Configured operating windows" card on the public dashboard. Each subsystem (Attractor LED, Access Point, Fan, SD Storage) has an independent start/end schedule, plus the global fan duration and detection threshold.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/local-config-windows.jpg" width="800"><br/>
  <i>Same operating-window configuration, but from the ESP32-served local dashboard. Each schedule is editable on-site via the SD-served UI when there is no internet — perfect for first-time setup in the field.</i>
</p>

### **3. Three storage modes with resilient cloud sync**

The user can switch between three storage policies from the dashboard at any time:

- **`LOCAL`** — readings are written to monthly-rotated CSV files on the SD card. Nothing leaves the device.
- **`CLOUD`** — readings are POSTed to `/api/measurements` on the Vercel backend, every 2 seconds inside the cloud window.
- **`BOTH`** — both at once, redundant.

If the Wi-Fi link drops during `CLOUD` or `BOTH` mode, the firmware **queues unsent rows to an SD-backed buffer** (`/Pending/queue.csv`). When the STA link comes back, the buffer is flushed in order — replaying the timestamp-original measurements without data loss.

<p align="center">
  <img src="assets/images/agrolumen/local-storage-mode.jpg" width="800"><br/>
  <i>Storage-mode selector on the local dashboard. The operator picks Local (SD only), Cloud (Vercel + Neon), or Both, and sets the device ID + X-Device-Key that authenticates uploads against the backend.</i>
</p>

### **4. Near real-time cloud push**

While inside the cloud window and connected to STA, the firmware pushes the current sensor frame to the backend every **2 seconds**, with the OLED, IR, and actuator state attached. Failed pushes are *not* queued (this path is for live data); they're simply retried on the next cycle. The dashboard polls `/api/latest` every 10 s.

### **5. Deep sleep with smart wake-up**

When *no* operating window is active and there are no manual overrides, the ESP32 disconnects from Wi-Fi, releases the I²C bus, and enters **deep sleep**. The wake-up timer is computed dynamically: the firmware looks at all four scheduled start times (AP / LED / Fan / SD) and sleeps until the closest one — never longer than needed, never shorter.

A front-panel button (GPIO 32) is also wired as an external wake source for manual intervention.

### **6. IR-based insect detection with debounce**

An MH-series IR sensor mounted inside the duct counts each insect crossing on a **LOW→HIGH rising edge** of its digital output, with a 30 ms debounce. Counting is paused — and the counter is reset — while the fan is running, so detections during a capture aren't double-counted.

> **Sensor disclaimer.** The original Expression of Interest proposed the **APDS9960** gesture/proximity sensor from the MYOSA Mini IoT Kit for this role. During integration the team was unable to get the APDS9960 module to operate correctly and we suspect the unit is defective. To keep the prototype on schedule we substituted it with a digital IR module that gives the same edge-triggered behavior the algorithm needs. The detection logic is unchanged — only the front-end transducer differs.

### **7. Threshold-triggered capture**

The area counter is compared against a configurable threshold (default 10) every cycle, *only* while inside the fan window. When the count exceeds the threshold:

1. The fan engages for a programmable duration (default 1 min, max 10 min).
2. The counter is cleared.
3. Manual override flags from the dashboard always take priority and bypass the schedule.

If the count never reaches the threshold within a 5-minute evaluation window, the counter is reset to avoid stale-state lock-in.

### **8. Public real-time dashboard**

The public dashboard at [spodoptera.vercel.app](https://spodoptera.vercel.app) shows:

- Current temperature, pressure, altitude
- LED and fan state
- Per-subsystem operating-window status pills
- A history chart of the last 100 measurements (Recharts)
- The configured operating windows for the device

Updates land within ~12 s of the physical event (2 s push interval + 10 s dashboard poll), which is well below the timescale of nocturnal insect activity.

<p align="center">
  <img src="assets/images/agrolumen/dashboard-realtime.png" width="800"><br/>
  <i>"Real-time data" view: the three environmental cards (temperature, pressure, altitude), the actuator state cards, and the operating-windows status pills. All four subsystems showing ACTIVE means the trap is currently inside every scheduled window simultaneously.</i>
</p>

<p align="center">
  <img src="assets/images/agrolumen/dashboard-history.png" width="800"><br/>
  <i>"Recent history" chart powered by Recharts, plotting the last 100 measurements (temperature, pressure, altitude) on a synchronized dual axis. Hovering reveals the exact reading at that timestamp — here, 12:22 PM with 26.92 °C, 100.8968 hPa, and 35.81 m altitude.</i>
</p>

### **9. Multi-task FreeRTOS architecture**

The firmware runs three pinned FreeRTOS tasks:

- **`taskControl`** (Core 1, priority 3) — LED PWM, IR sampling, fan logic
- **`taskUI`** (Core 1, priority 2) — RTC, BMP180 readings, OLED rendering
- **`taskComm`** (Core 0, priority 1) — Wi-Fi, HTTP server, cloud push, SD logging, deep-sleep check

I²C is protected with a `xSemaphoreCreateMutex` to avoid contention between the UI and control paths.

### **10. Local dashboard served from the SD card**

In parallel with the cloud dashboard, the ESP32 hosts a **full local web UI directly from its SD card** at `http://192.168.4.1`. This means everything you can do remotely — view sensor readings, change operating windows, switch storage mode, override LED / fan manually, configure Wi-Fi credentials — is also doable on-site from a phone, **even with no internet at all**. The HTML / CSS / JS are streamed from the SD card on demand, so the UI can be updated without re-flashing the firmware: just drop new files on the SD.

<p align="center">
  <img src="assets/images/agrolumen/local-dashboard.jpg" width="800"><br/>
  <i>Landing view of the SD-served dashboard. Three tabs (Dashboard / Configuration / Connectivity) cover the full feature set, and the live sensor readings — here, 31.93 °C and 1008.73 hPa — come from the ESP32 itself, not from a remote API.</i>
</p>

---

## Usage Instructions

### First-time field setup

1. Mount the trap on its stand and connect the solar panel + battery harness.
2. Power the board. The OLED should briefly show `LightTrap online`.
3. From a phone, connect to the Wi-Fi network **`MYOSA_BoardServer`** (password `prueba123`).
4. Open `http://192.168.4.1` in the browser — the local dashboard is served directly from the ESP32's SD card.
5. Under **Wi-Fi**, enter the farm's STA credentials. The trap will join and start streaming.
6. Under **Storage**, choose `LOCAL`, `CLOUD`, or `BOTH` and set the device key (matching the backend's `DEVICE_KEY` env var).
7. Adjust the five operating windows under **Schedules** if the defaults don't match the local pest cycle.

### Public viewing

Anyone can watch live data at:

```plaintext
https://spodoptera.vercel.app
```

No login required for read-only access.

### Field commands (manual override from the dashboard)

```plaintext
POST /control       { "led": true }         # force LED on
POST /control       { "fan": true }         # force fan on
POST /clearManual                           # release all manual overrides
```

---

## Tech Stack

**Embedded:**

* **MYOSA Motherboard** (ESP32-WROOM-32 based, stackable I²C ecosystem)
* **BMP180** barometric pressure & temperature sensor
* **SSD1306** 0.96" OLED display
* **DS1307** RTC with CR2032 backup
* **MH-series IR module** (insect detection — replaces APDS9960, see disclaimer above)
* **MicroSD** breakout (logs + pending buffer + dashboard static files)
* **Custom MOSFET + optocoupler power stage** for 12 V loads (perfboard, 15×15 cm)
* **UV-A LED strips** (attractor) and **GDSTime GDA8015** 12 V brushless DC fan (capture)
* **Solar subsystem:** PV panel + charge controller + Li-Ion battery + DC-DC buck regulator
* **Arduino IDE** (firmware) + **FreeRTOS** (multi-tasking on dual core)

**Web:**

* **Next.js 16** (App Router) + **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **Recharts** (history charts) + **lucide-react** (icons)
* **Neon Postgres** (serverless)
* **Vercel** (Edge runtime for the API routes)

---

## Requirements / Installation

### Firmware (Arduino IDE)

Required libraries (Library Manager):

```plaintext
Wire (built-in)
SPI (built-in)
SD (built-in)
WiFi (built-in, ESP32 core)
WebServer (built-in, ESP32 core)
HTTPClient (built-in, ESP32 core)
Preferences (built-in, ESP32 core)
ArduinoJson
RTClib
BarometricPressure (MYOSA)
oled (MYOSA)
```

Build and flash:

```bash
# Clone the firmware repo
git clone https://github.com/IvAndres21/spodoptera.git
cd spodoptera/firmware

# Create your secrets file from the template
cp secrets.example.h secrets.h
# Edit secrets.h to set DEFAULT_DEVICE_KEY and DEFAULT_DEVICE_ID

# Open MYOSA_TranslateCode.ino in Arduino IDE
# Board: ESP32 Dev Module
# Upload at 115200 baud
```

Also copy `dashboard.html`, `style.css`, and `chart.js` to the root of the microSD card — those files are served by the ESP32 directly from the card.

### Web (Next.js + Neon + Vercel)

```bash
cd spodoptera/web
npm install

# Local development
cp .env.example .env
# Edit .env with your Neon DATABASE_URL and DEVICE_KEY
npm run dev
```

Initialize the database:

```bash
psql "$DATABASE_URL" -f lib/schema.sql
```

Deploy to Vercel:

```bash
vercel link
vercel env add DATABASE_URL production
vercel env add DEVICE_KEY production
vercel --prod
```

---

## File Structure

This blog repository:

```plaintext
agrolumen-spodoptera-blog/
├── agrolumen-spodoptera.md
├── light-trap-internals.jpg
├── trap-assembled-front.jpg
├── ir-sensor-detail.jpg
├── capture-fan.jpg
├── oled-live-data.jpg
└── agrolumen-spodoptera-demo.mp4
```

The full firmware + web codebase lives in a separate repository at [github.com/IvAndres21/spodoptera](https://github.com/IvAndres21/spodoptera):

```plaintext
spodoptera/
├── firmware/                     # ESP32 (Arduino IDE)
│   ├── MYOSA_TranslateCode.ino   # ~1100 LOC main firmware
│   ├── dashboard.html            # Local UI served from SD
│   ├── style.css
│   ├── chart.js
│   └── secrets.example.h
└── web/                          # Public dashboard
    ├── app/
    │   ├── api/                  # /measurements, /latest, /config
    │   ├── components/           # DashboardLive, HistoryChart, etc.
    │   ├── layout.tsx
    │   └── page.tsx
    ├── lib/
    │   ├── db.ts                 # Neon serverless client
    │   └── schema.sql            # measurements + windows_config tables
    └── scripts/
        └── migrate.mjs
```

---

## Hardware deviations from the original proposal

For transparency, the shipped prototype deviates from our original Expression of Interest in two ways:

1. **APDS9960 → IR module (MH-series).** The APDS9960 gesture/proximity sensor included in the MYOSA Mini IoT Kit could not be brought to working order — we suspect the specific unit is defective. To keep the project on schedule we substituted it with a digital IR module that delivers the same edge-triggered detection signal the algorithm consumes. The detection logic, debounce, and counting behavior are identical.

2. **INA219 omitted in this prototype.** The current demo unit runs from a bench supply, not a battery pack, so power-consumption monitoring was de-scoped for the conference demo. The hardware architecture, however, is fully compatible: the INA219 can be added on the I²C bus and the firmware can be extended to log power/energy alongside the existing measurements for a battery-powered field deployment.

---

## License

This project is released under the **MIT License**. The MYOSA platform and its libraries belong to **MakeSense Edutech / IEEE Sensors Council** and are used here under their respective terms.

---

## Contribution Notes

We welcome issues and pull requests on the [main project repository](https://github.com/IvAndres21/spodoptera) — particularly around:

- Adding INA219 power monitoring for battery-backed deployments
- Tuning the IR sensor's debounce and threshold for different insect sizes
- Porting the dashboard to additional backends (Supabase, self-hosted Postgres)
- 3D-printed enclosure improvements for tropical climates (humidity, UV degradation)

For broader questions or collaboration on agricultural deployments, reach the team at **rjacosta@unimagdalena.edu.co**.
