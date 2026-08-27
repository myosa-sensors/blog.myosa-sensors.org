---
publishDate: 2026-08-24
title: EcoFlame – Smart LPG Optimization and Wastage Prevention System
excerpt: EcoFlame is an ESP32-based smart LPG stove monitoring system that tracks knob position, flame quality, vessel presence, temperature and gas usage, then streams live telemetry to Firebase for a Flutter dashboard with analytics, cost estimation and safety alerts.
image: ecoflame/Myosa_cover.jpeg
tags:
  - MYOSA
  - IoT
  - ESP32
  - Firebase
  - Flutter
  - LPG
  - EnergyEfficiency
  - SmartCooking
  - 
---

> Measure the flame, understand the usage, and optimize the cooking.

---

## Acknowledgements

EcoFlame is developed as a practical smart-energy application around the MYOSA platform. The project combines embedded sensing, cloud telemetry, analytics and a Flutter companion application.

### Faculty Mentor

- **Name:** Sreeram M
- **Institute:** Government Engineering College Kozhikode
- **Email:** manghat.sreeram@gmail.com
- **Contact:** 9446460806

### Team

| Name | Academic Year | Institute | Email |
|---|---|---|---|
| Ashlin Mariya | 2025-26 | Government Engineering College, Kozhikode | ashlinshaiju748@gmail.com |
| Nakul Menon | 2025-26 | Government Engineering College, Kozhikode | nakulmenon15@gmail.com |
| Yadunandan K P | 2025-26 | Government Engineering College, Kozhikode | nandanyadu36@gmail.com |
| Vimal John M V | 2025-26 | Government Engineering College, Kozhikode | vimaljohnmv@ieee.org |

---

## Overview

### What the Project Does

**EcoFlame – Smart LPG Optimization and Wastage Prevention System** is a smart gas-stove monitoring system built around an **ESP32 microcontroller**. It observes a domestic LPG stove in real time by tracking:

- Stove-knob position
- Flame quality
- Vessel presence
- Temperature
- LPG usage
- Cooking duration
- Cooking cost
- Efficiency score

The ESP32 streams telemetry to a **Firebase Realtime Database (RTDB)**. A **Flutter companion application** subscribes to this data and presents a live dashboard, analytics and cost information, recommendations, and safety alerts.

### Problem It Solves

Household LPG can be wasted because of inefficient flame combustion, idle burning, excessive flame settings, leaving the flame on without a vessel, and lack of visibility into cooking-energy usage.

EcoFlame makes these conditions measurable and gives the user real-time and historical information that can support more efficient cooking practices.

### Who It Is For

The system is intended for households using LPG cooking stoves and for users who want to monitor cooking efficiency, LPG consumption, cooking cost, and safety-related conditions.

### How It Works

```text
LPG Stove
   │
   ├── MPU6050 ──► Knob position
   ├── APDS9960 ─► Flame quality + vessel presence
   └── BMP180 ──► Temperature
             │
             ▼
           ESP32
     Sensor processing
     Efficiency logic
     Gas estimation
             │
             ▼
      Firebase RTDB
             │
             ▼
       Flutter App
       ├── Live Dashboard
       └── Analytics & Cost
```

The project evolved from an initial edge-sensing prototype using **MPU6050, APDS9960, BMP180, OLED and Blynk**, through an analytical-engine layer, to the current Firebase + Flutter companion-app architecture.

**Key features:**

- Real-time stove monitoring
- Dynamic stove-knob calibration
- Flame-colour classification
- Vessel-presence detection
- Temperature and overheat monitoring
- LPG consumption estimation
- Cooking-cost estimation
- Efficiency scoring
- Session logging
- Monthly LPG cost projection
- Rule-based cooking recommendations
- Firebase cloud telemetry
- Flutter Live Dashboard
- Flutter Analytics & Cost dashboard
- Threshold-based safety alerts
- Alert history
- Offline/reconnecting status indication

---

## Demo / Examples

### Images

### Calibration Images

<p align="center">
  <img src="/assets/images/ecoflame/ecoflame-calibration-1.jpg" width="800"><br/>
</p>

<p align="center">
  <img src="/assets/images/ecoflame/ecoflame-calibration-2.jpg" width="800"><br/>
</p>

<p align="center">
  <img src="/assets/images/ecoflame/ecoflame-calibration-3.jpg" width="800"><br/>
</p>

### Live Dashboard

The Live Dashboard provides the current state of the stove, including system status, efficiency score, live gas usage, flame condition, knob setting and vessel detection.

<p align="center">
  <img src="/assets/images/ecoflame/live-1.jpeg" width="800"><br/>
</p>

<p align="center">
  <img src="/assets/images/ecoflame/live-2.jpeg" width="800"><br/>
  <i>EcoFlame Flutter Live Dashboard showing real-time stove telemetry.</i>
</p>

### Analytics & Cost

The Analytics & Cost tab converts cooking-session data into useful information such as cooking time, cooking cost, projected monthly cost and an energy-efficiency recommendation.

<p align="center">
  <img src="/assets/images/ecoflame/analytics.jpeg" width="800"><br/>
  <i>EcoFlame Flutter Analytics & Cost dashboard showing cooking analytics, projected cost and recommendations.</i>
</p>

### Analytics & Cost

The Analytics & Cost tab converts cooking-session data into useful information such as cooking time, cooking cost, projected monthly cost and an energy-efficiency recommendation.

<p align="center">
<img src="/assets/images/ecoflame/analytics.jpeg" width="800"><br/>
<i>EcoFlame Flutter Analytics & Cost dashboard showing cooking analytics, projected cost and recommendations.</i>
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/ZDaLKAden50"></iframe>
</div>

The intended demonstration shows the hardware sensing the stove, the ESP32 processing telemetry, Firebase receiving the data, and the Flutter application displaying live and analytical results.

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/9U3853cbF6Q"></iframe>
</div>


---

## Features (Detailed)

### 1. ESP32-Based Edge Controller

The **ESP32** is the central embedded controller. It provides Wi-Fi connectivity and processes sensor readings before sending telemetry to Firebase.

The firmware handles sensor initialization, startup calibration, knob-state detection, flame classification, vessel detection, temperature monitoring, efficiency calculation, gas-consumption estimation, session-cost calculation, Firebase synchronization, and OLED status feedback.

### 2. Dynamic Knob Calibration with MPU6050

Instead of relying on fixed angle thresholds, EcoFlame performs calibration at startup.

Reference angles are captured for:

- **OFF**
- **HIGH**
- **SIMMER**

Each reference is obtained by averaging **20 accelerometer samples** while the knob is held at the corresponding position.

During operation, the current angle is compared with the calibrated reference angles. The closest reference determines the current knob state.

This approach was selected because fixed angular thresholds can be unreliable across different physical knob and sensor mounting positions.

### 3. Flame Quality and Vessel Detection with APDS9960

The **APDS9960** provides optical and proximity measurements.

The RGB channel balance classifies the flame as:

- **BLUE (OPTIMAL)**
- **YELLOW**
- **ORANGE**
- **RED**
- **ERRATIC**

The clear-light reading is used to detect vessel presence above the burner. A timeout-based mechanism reduces sensitivity to short detection fluctuations.

### 4. Temperature and Overheat Monitoring with BMP180

The **BMP180** measures temperature around the stove and contributes to safety monitoring.

The Flutter-side overheat alert threshold is:

- **Temperature > 70°C** → overheat alert

Hysteresis is used to avoid rapid alert triggering and clearing around the threshold.

### 5. OLED Local Feedback

A **128×64 SSD1306 OLED** provides local status information, including states such as:

- EcoFlame System
- Calibrating...
- Connecting WiFi...

This gives the user immediate confirmation of calibration and connectivity without requiring the phone app.

### 6. LPG Consumption and Cost Estimation

The firmware estimates LPG consumption during an active cooking session.

Current prototype burn-rate values are:

- **HIGH:** approximately 2.5 g/min
- **SIMMER:** approximately 0.83 g/min

A configured 14.2 kg cylinder price is used to derive a cost-per-gram basis.

The system tracks:

- Gas used in grams
- Cooking cost in ₹
- Cooking duration
- Projected monthly LPG expenditure

These are prototype configuration values and should be recalibrated when burner characteristics or LPG pricing assumptions change.

### 7. Efficiency Scoring

The **Efficiency Score** combines cooking-condition information. Poor flame colour, elevated temperature, and HIGH operation without a vessel can reduce the score.

The Flutter application displays this score as a percentage.

### 8. Firebase Realtime Database

Firebase RTDB is the cloud telemetry layer between the ESP32 and Flutter application.

The current implementation uses a flat root-key schema:

| Key | Type | Description |
|---|---|---|
| `Knob_Setting` | String | OFF, HIGH or SIMMER |
| `Flame` | String | Flame-quality classification |
| `Pot_Detected` | Boolean | Vessel presence |
| `Efficiency_Score` | Number | Current efficiency score |
| `Gas` | Number | Live gas used in grams |
| `Cooking_Cost` | Number | Current session cost in ₹ |
| `Cooking_Time` | Number | Cooking duration in minutes |
| `Monthly_Cost_Projected` | Number | Projected monthly LPG expenditure |
| `Latest_Insight` | String | Current recommendation |
| `Gas_Leak` | Boolean | Gas-leak flag |
| `Temperature` | Number | Current temperature in °C |

The ESP32 and Flutter app reference the same Firebase RTDB instance so the app receives live hardware writes.

### 9. Flutter Live Dashboard

The Flutter application provides a **Live Dashboard** containing:

- System status
- Efficiency Score
- Live Gas Used
- Flame Status
- Knob Setting
- Pot Detection

The interface can indicate normal stove operation or gas-wastage conditions.

### 10. Flutter Analytics & Cost

The **Analytics & Cost** tab is a core part of the current application.

It presents:

- **Cooking Time**
- **Cooking Cost**
- **Projected Monthly Cost**
- **Energy-efficiency insight / recommendation**

This provides the user with information beyond the current sensor state and turns session data into useful cost and usage insights.

### 11. Recommendation Engine

The current recommendation logic is rule-based.

Examples include:

- No sessions yet → request more usage data.
- More than half of sessions contain waste incidents → recommend turning the stove off promptly.
- More than one-third of sessions contain frequent yellow flames → recommend burner cleaning.
- Last session score above 90 → provide positive reinforcement.
- Otherwise → provide a general SIMMER-usage efficiency recommendation.

The resulting message is stored in `Latest_Insight` and shown in the Analytics & Cost view.

### 12. Safety and Alert System

Current Flutter alert conditions include:

| Condition | Response |
|---|---|
| Temperature > 70°C | Overheat warning |
| Efficiency Score < 10 | Efficiency-drop alert |
| Flame ON + no vessel for ≥ 10 minutes | Gas-wastage alert |
| `Gas_Leak == true` | Critical gas-leak alert |

Alerts use active/cleared states to prevent repeated firing for the same continuing condition. A timestamped Alert History is also maintained in the application sidebar.

### 13. Connection Resilience

The Flutter application separately monitors Firebase connectivity.

When the connection is lost, the application shows:

> **App is offline. Reconnecting…**

This distinguishes a connection problem from a system that simply has no data yet.

### 14. Blynk-to-Firebase Evolution

Blynk Cloud was used during an earlier development stage through virtual pins V1–V13.

The current architecture uses a dedicated Flutter application with direct Firebase RTDB streaming:

```text
ESP32
  │
  ▼
Firebase Realtime Database
  │
  ▼
Flutter Companion App
  ├── Live Dashboard
  └── Analytics & Cost
```

---

## Usage Instructions

### Hardware Setup

1. Set up the ESP32 and EcoFlame sensor hardware around the LPG stove.
2. Connect the **MPU6050**, **APDS9960**, **BMP180**, and **SSD1306 OLED** according to the implemented hardware configuration.
3. Power the ESP32.
4. Allow startup calibration to begin.
5. Calibrate the OFF, HIGH and SIMMER knob positions.
6. Connect the ESP32 to the configured Wi-Fi network.

### Normal Operation

1. Start a cooking session.
2. MPU6050 determines the knob setting.
3. APDS9960 monitors flame colour and vessel presence.
4. BMP180 monitors stove-area temperature.
5. ESP32 processes the sensor information.
6. LPG consumption and cooking cost are estimated.
7. ESP32 writes telemetry to Firebase RTDB.
8. Flutter receives the live data.
9. **Live Dashboard** displays the current stove state.
10. **Analytics & Cost** displays cooking time, cost, projected monthly expenditure and recommendations.
11. Safety alerts are generated when configured thresholds are exceeded.
12. Session information is used for historical analysis and recommendations.

### Application Views

#### Live Dashboard

Use this tab to monitor system status, efficiency score, live gas usage, flame condition, knob setting and vessel presence.

#### Analytics & Cost

Use this tab to view cooking time, cooking cost, projected monthly LPG expenditure and the latest energy-efficiency insight.

## Suggested Improvements 

-Extended Session Tracking: Improve the current session-logging system to support more than three cooking sessions per day and handle additional sessions without carrying them over to the following day.

-Multi-Burner Support: Extend EcoFlame to support multiple burners and independently track their knob positions, flame conditions, and gas consumption.

-Knob detection can be improved via a rotary encoder or a magnetic hall effect sensor

### Data Flow

```text
Sensor Reading
      ↓
ESP32 Processing
      ↓
Efficiency / Gas / Cost Logic
      ↓
Firebase RTDB
      ↓
Flutter Stream
      ↓
Live Dashboard
      +
Analytics & Cost
      ↓
User Feedback / Alerts
```

---

## Tech Stack

### Embedded Hardware

- **ESP32** – Wi-Fi-enabled dual-core microcontroller
- **MPU6050** – Accelerometer for knob-angle detection
- **APDS9960** – Color/light and proximity sensing
- **BMP180** – Temperature and pressure sensing
- **SSD1306 OLED** – Local status display

### Cloud

- **Firebase Realtime Database**
- **Firebase Authentication**

### Mobile Application

- **Flutter**
- `firebase_core`
- `firebase_database`
- Material dark theme

### Legacy / Interim Layer

- **Blynk Cloud**
- Virtual pins V1–V13 during the earlier development stage

---

## Requirements / Installation

### Hardware Requirements

- ESP32 development board
- MPU6050
- APDS9960
- BMP180
- SSD1306 OLED
- LPG stove prototype
- Suitable wiring and power supply

### Software Requirements

- ESP32 development environment
- Firebase project with Realtime Database
- Firebase Authentication
- Flutter development environment
- Android build environment

### Firebase Configuration

The ESP32 and Flutter application must use the same Firebase Realtime Database instance.

Authentication supports:

- Email/Password authentication for the dedicated ESP32 device user
- Anonymous authentication as a development/testing fallback

> Development database rules were temporarily opened during integration. Public or production deployment must use appropriately restricted Firebase read/write permissions.

### Flutter Build Note

The project encountered Android Gradle / Java compatibility issues during development. The build was standardized around a modern Gradle/Android Gradle Plugin configuration compatible with the development Java environment.

The `flutter_ringtone_player` dependency was removed because of Android build compatibility issues. Flutter's built-in `SystemSound.play(SystemSoundType.alert)` is used instead for alert sounds.

---

