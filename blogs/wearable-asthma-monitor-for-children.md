---
publishDate: 2025-12-30
title: Wearable Asthma Monitoring Device for Children
date: 2026-05-17
authors: Ingrid Morales, Esteban Pena, David Vazques
image: wearable-asthma-monitor-for-children/cover.png
tags: [wearable, asthma, healthcare, IoT, BLE, Android]
---

## Project Overview

Asthma is a chronic respiratory condition that triggers coughing, wheezing, shortness of breath, and chest tightness. It affects an estimated **6.2% of children under 18** in the United States — making it the **3rd most common cause of hospitalization among children** and accounting for **44% of all asthma-related hospital admissions**. Children are especially vulnerable because they may struggle to recognize or communicate early symptoms.

The **Wearable Asthma Monitoring Device** is a Bluetooth-enabled wearable tailored for children that continuously monitors Heart Rate (HR) and Respiration Rate (RR), detects early warning signs of asthma attacks, and transmits real-time data to a companion Android app — instantly alerting parents, caregivers, and doctors when intervention is needed.

<img src="/assets/images/wearable-asthma-monitor-for-children/cover.png">

---

## Hardware Architecture

The system is built on the **MYOSA Motherboard** (ESP32-WROOM-32E) with a modular, stackable sensor design:

- **MAX30001** ECG/BioZ Module — acquires ECG and respiration signals at 128 sps via SPI
- **MPU6050** 6-Axis IMU — motion-aware signal filtering
- **SSD1306** OLED Display — shows live BPM and SpO₂ on the device
- **BLE (Bluetooth Low Energy)** — wirelessly streams data to the Android app

---

## ECG Signal Processing

Heart rate is extracted using a **Pan-Tompkins-inspired pipeline** with 11 stages:

1. Raw ECG acquisition via MAX30001
2. Band-pass filtering (0.7–18 Hz)
3. Derivative
4. Squaring
5. Moving window integration (~80 ms)
6. Adaptive peak detection
7. Physiological limits + refractory period (~220 ms)
8. Heart Rate (BPM) calculation
9. Smoothing / stable output
10. BLE transmission
11. OLED + App display

---

## Real-World Signal Challenges & Solutions

Wearable signals face three major real-world problems: **motion artifacts**, **electrical noise**, and **false peak detection**. We address each with a multi-layer validation approach:

| Validation Layer | Description |
|---|---|
| **Physiological Limits** | Rejects BPM outside 40–220 and RESP outside 6–60 |
| **Refractory Period** | Prevents counting the same heartbeat twice (~220 ms window) |
| **Smoothing / Stable Holds** | Gradual updates using recent values to avoid sudden BPM jumps |
| **Motion Awareness** | MPU6050 adjusts confidence level based on activity (still / walking / running) |

---

## Features

- **Live Dashboard** — real-time BPM and respiration metric cards with NORMAL / WARNING / EMERGENCY event status
- **BLE Connect/Disconnect** — seamless Bluetooth pairing with the ESP32 device
- **History Screen** — interactive tap-to-inspect graphs with time-range filters (Minutes / Hours / Days / Months)
- **Trend Analysis** — BPM (red) and Respiration (blue) trend lines with aggregated Room DB data
- **Smart Alert Engine** — push notifications + in-app AlertDialog with 30-second debounce to prevent alert spam
- **Reminders** — medication and appointment reminders in Settings
- **Caregiver Notifications** — instant alerts sent to parents and doctors
- **Offline-First Storage** — Room Database stores all sensor readings locally; DataStore preserves latest vitals for offline access
- **Demo / Simulation Mode** — test WARNING + EMERGENCY sequences without physical hardware

---

## Alert Engine Logic

The system continuously evaluates sensor readings against three alert thresholds:

| Condition | Heart Rate (BPM) | Respiration (br/min) | Alert Level |
|---|---|---|---|
| Normal | < 120 | < 15 | NORMAL |
| Warning | ≥ 120 | ≥ 15 | WARNING |
| Emergency | ≥ 150 | ≥ 18 | EMERGENCY |

Alerts are debounced against `lastEventLevel` — no repeated alerts within 30 seconds. Both a push notification and an in-app AlertDialog fire simultaneously.

---

## Tech Stack

### Hardware

| Component | Role |
|---|---|
| MYOSA Motherboard (ESP32-WROOM-32E) | Central processing & BLE communication |
| MAX30001 ECG/BioZ Module | ECG and respiration signal acquisition |
| MPU6050 6-Axis IMU | Motion detection and signal confidence |
| SSD1306 OLED Display | On-device vitals display |

### Firmware

- **Language:** C/C++ on ESP32
- **Protocol:** Bluetooth Low Energy (GATT) — broadcasts `BPM=xx` and `RESP=xx` packets

### Mobile Application (Android)

| Technology | Usage |
|---|---|
| Kotlin + Jetpack Compose | Fully declarative Material 3 UI |
| BleManager (custom class) | BLE scan filters, GATT callbacks, descriptor writes, simulation mode |
| Room Database | Offline-first sensor data storage with time-bucketed queries |
| DataStore | Persistent latest vitals across app sessions |
| Canvas-drawn line graphs | Interactive tap-to-inspect charts with crosshair and time-range support |
| Push Notifications | Warning and emergency alerts with debounce logic |

---

## How to Use

### Hardware Setup

1. Attach ECG electrodes to the chest (RA, LA, RL positions)
2. Stack the MPU6050 and SSD1306 OLED modules onto the MYOSA Motherboard
3. Power the board — the OLED will display live BPM and SpO₂
4. The device broadcasts as `ESP32-BPM` over BLE

### Mobile App Setup

1. Install the Android APK on your device
2. Open the app and tap **Connect** on the Dashboard screen
3. The app scans for `ESP32-BPM`, connects via GATT, and begins streaming data
4. Monitor live vitals on the Dashboard; view trends in the History tab
5. Configure medication info and device model in Settings
6. Enable **Demo Mode** in Settings to simulate WARNING and EMERGENCY alerts without hardware

---

## Demo Videos

### Full Demo

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/LLqgRSZ4yS4"></iframe>
</div>

### Presentation

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/1Tb4sPS0oYM"></iframe>
</div>

---

## Team

**Ingrid Morales · Esteban Pena · David Vazques**
University of Texas at El Paso (UTEP)
MYOSA Event 5.0 — APSCON 2026
