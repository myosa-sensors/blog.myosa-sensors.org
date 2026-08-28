---
publishDate: 2026-08-24T00:00:00Z
title: "DHRUV: Last-Mile Vaccine Cold Chain Monitoring System with Firebase IoT"
excerpt: "An IoT sensor-fusion node built on MYOSA with Firebase Realtime Cloud Sync to prevent vaccine degradation during rural last-mile transport."
image: dhruv-myosa-coldchain/dhruv-cover.jpg
tags:
  - Cold Chain Monitoring
  - MYOSA 6.0
  - ESP32
  - Firebase IoT
  - Sensor Fusion
  - Healthcare Innovation
---

> DHRUV safeguards life-saving vaccines at the last mile by providing real-time sensor fusion monitoring, tamper detection, offline flash logging, and Firebase IoT cloud synchronization for ASHA health workers in rural India.

---

## Acknowledgements

We express our sincere gratitude to **Team MYOSA Sensors Council** and **Dr. Mitradip Bhattacharjee** (IISER Bhopal) for organizing MYOSA 6.0 and providing the hardware ecosystem. We also extend our deepest thanks to our faculty mentor, **Dr. Abraham George**, and **Saintgits College of Engineering (Autonomous), Kottayam, Kerala**, for their guidance and support throughout this project.

---

## Overview

India’s Universal Immunization Programme relies on cold chains to deliver vaccines to millions of children annually. However, while district cold storage facilities are strictly monitored, the **last mile**—where an ASHA (Accredited Social Health Activist) worker carries vaccines in an insulated carrier box to remote villages—has **zero sensor monitoring**.

During this rural journey:
1. **Thermal Excursions:** Heat exposure in summer temperatures rises above the strict 2°C – 8°C vaccine safe zone.
2. **Unrecorded Tamper Events:** The carrier box is opened repeatedly at individual homes, letting warm ambient air inside.
3. **Rough Physical Handling:** Drops, impacts, and vibrations on rural terrain damage delicate glass vials.
4. **Lid Seal Degradation:** Worn rubber seals allow humidity and heat leakage over time.

According to the World Health Organization (WHO), **up to 50% of vaccines are wasted globally each year**, with cold chain breaches being a leading cause.

**DHRUV** (Digital Health Protection & Remote Universal Monitoring) solves this last-mile gap. Built using the MYOSA hardware platform and **Firebase IoT Cloud**, DHRUV sits inside the ASHA worker's vaccine bag, continuously sampling sensors offline, calculating a live **Chain Integrity Score (0–100%)**, alerting the worker immediately on breach, and automatically pushing live telemetry & audit logs to Firebase Realtime Database for PHC supervisors worldwide.

**Key Features:**
* **100% Kit Sensor Utilization:** Harnesses ESP32, BMP180, MPU6050/6500, APDS9960, and SSD1306 OLED display.
* **Continuous Multi-Sensor Fusion:** Monitors temperature (2°C – 8°C), ambient light lux (lid open detection), proximity (seal integrity), altitude/pressure (route deviation), and G-force impacts.
* **Firebase IoT Cloud Synchronization:** Pushes live telemetry and breach logs to Firebase Realtime Database when WiFi is active.
* **Touchless Gesture UI:** ASHA workers can swipe past display screens (Overview, Telemetry, Audit) hands-free using APDS9960 gestures while wearing medical gloves.
* **Chain Integrity Score Algorithm:** Calculates a dynamic quality index per delivery run.
* **Hybrid Offline-Cloud Sync:** Stores events in local Flash memory during rural offline deliveries and auto-flushes queued logs to Firebase Cloud upon reconnecting.

---

## Demo / Examples

### **Images**

<p align="center">
  <img src="/assets/images/dhruv-myosa-coldchain/dhruv-cover.jpg" width="800"><br/>
  <i>Figure 1: DHRUV Node hardware setup integrated inside the MYOSA enclosure alongside design notes, showing live OLED status.</i>
</p>

<p align="center">
  <img src="/assets/images/dhruv-myosa-coldchain/dhruv-dashboard.jpg" width="800"><br/>
  <i>Figure 2: PHC Base Station Web Dashboard connected live to node ASHA-KL05, rendering Chain Integrity Index (75%) and active alerts.</i>
</p>

<p align="center">
  <img src="/assets/images/dhruv-myosa-coldchain/dhruv-firebase.jpg" width="800"><br/>
  <i>Figure 3: Firebase Realtime Database cloud backend streaming live telemetry coordinates and breach events in real time.</i>
</p>

### **Videos**

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/9y0lkcgLg0w"></iframe>
</div>

---

## Features (Detailed)

### **1. Multi-Sensor Fusion & Breach Detection Matrix**

DHRUV maps every sensor provided in the MYOSA kit to a specific last-mile cold chain threat:

| Sensor Board | Physical Metric | Detection Condition | Cold Chain Breach Trigger |
| :--- | :--- | :--- | :--- |
| **BMP180** (I2C `0x77`) | Temperature (°C) & Altitude (m) | Temp > 8.0°C or < 2.0°C | `ALERT: Thermal Excursion` |
| **APDS9960** (I2C `0x39`) | Ambient Light (Lux) | Lux > 60 Lux inside bag | `ALERT: Box Lid Open / Tamper` |
| **APDS9960** (I2C `0x39`) | Proximity Distance (0–255) | Proximity < 100 | `ALERT: Seal Displacement` |
| **MPU6050** (I2C `0x68`) | 3-Axis Acceleration (G) | Total Accel > 2.50 G | `ALERT: Physical Drop / Shock` |
| **BMP180** (I2C `0x77`) | Barometric Pressure (hPa) | Altitude Shift > 150m | `LOG: Route Altitude Shift` |

### **2. Dynamic Chain Integrity Score (0–100%)**

Rather than raw sensor dumps, PHC supervisors require an immediate actionable quality metric before administering vaccines to children. DHRUV calculates a dynamic **Chain Integrity Score** starting at 100%:

- **Thermal Penalty:** Deducts 0.5% per second spent outside 2°C – 8°C.
- **Light Tamper Penalty:** Deducts 5.0% per unrecorded lid open event (>60 Lux).
- **Shock Penalty:** Deducts 8.0% per high impact drop (>2.5G).
- **Seal Penalty:** Deducts 3.0% per lid gap event.

### **3. Firebase Realtime Database IoT Cloud Integration**

DHRUV leverages **Firebase Realtime Database** for seamless cloud IoT capabilities:
- **Live Stream Path (`/deliveries/{node_id}/telemetry`):** Pushes live temperature, pressure, G-force, light, and score every 2 seconds.
- **Event Audit Stream (`/deliveries/{node_id}/breaches`):** Pushes individual breach records instantly when detected.
- **Offline Flush Engine:** Automatically flushes queued Flash NVS breach logs to Firebase as soon as an Internet connection is detected.

---

## Usage Instructions

### Hardware Wiring Setup (MYOSA Platform)

Connect the MYOSA sensor boards to the ESP32 motherboard via I2C bus:

```plaintext
ESP32 Pin 21 (SDA) ----> BMP180 SDA | MPU6050 SDA | APDS9960 SDA | OLED SDA
ESP32 Pin 22 (SCL) ----> BMP180 SCL | MPU6050 SCL | APDS9960 SCL | OLED SCL
ESP32 3.3V         ----> VCC of all sensor modules & OLED
ESP32 GND          ----> GND of all sensor modules & OLED
ESP32 Pin 2        ----> Red Alert LED Indicator
### Compiling & Flashing Firmware with Firebase

1. Open `DHRUV_Firmware/DHRUV_Firmware.ino` in Arduino IDE.
2. Update `FIREBASE_HOST` with your Firebase Realtime Database domain.
3. Select board **ESP32 Dev Module** and click **Upload**.

---

## Tech Stack

* **Microcontroller & Hardware:** ESP32 NodeMCU, SSD1306 0.96" OLED, BMP180 Barometric Temp/Pressure, MPU6050/6500 6-Axis Accelerometer, APDS9960 Sensor.
* **IoT Cloud Infrastructure:** Firebase Realtime Database (RTDB), HTTPS REST API Client.
* **Firmware:** Embedded C++ / Arduino Framework, Wire I2C, ESP32 NVS Preferences, ESP32 WebServer.
* **Web Dashboard:** HTML5, CSS3, Modern Vanilla JavaScript, Firebase Web SDK v9, Chart.js.

---

## Requirements / Installation

List all dependencies clearly:

```bash
# Arduino IDE Libraries Required:
- Adafruit GFX Library
- Adafruit SSD1306
- Adafruit BMP085 Library
- HTTPClient & WiFi (Built into ESP32 core)
---

## File Structure

```plaintext
dhruv-myosa-coldchain/
├── dhruv-cover.jpg
├── dhruv-dashboard.jpg
├── dhruv-firebase.jpg
├── dhruv-demonstration-video.mp4
├── dhruv-myosa-coldchain.md
└── README.md


---

## License

This project is open-source under the **MIT License**.

