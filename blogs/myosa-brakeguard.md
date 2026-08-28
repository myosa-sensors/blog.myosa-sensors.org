---
publishDate: 2026-08-25
title: BrakeGuard - A Continuous IoT-Based Capacitive Brake Fluid Moisture Health Monitoring System
excerpt: BrakeGuard is a low-cost embedded safety system that monitors brake fluid moisture and braking conditions to identify brake-fluid degradation and provide an early indication of brake fade risk.
image: brakeguard/image1.jpg
tags:
  - smart-sensing
  - condition-monitoring
  - automotive-safety
  - edge-iot
  - sensor-fusion
---

> Continuous brake-fluid health monitoring for safer, condition-based brake maintenance.

## Acknowledgements

This project was developed using the MYOSA Mini Kit and its sensor ecosystem as part of the IEEE Sensors Council MYOSA 6.0 Global Student Competition. We acknowledge the MYOSA platform for providing the embedded hardware and sensor modules that enabled the development and testing of BrakeGuard. We also thank our mentor Dr.Rajesh Kannan Megalingam for his support and encouragement during the prototyping and validation process.

---

## Overview

BrakeGuard is a continuous IoT-based capacitive brake fluid moisture health monitoring system using the MYOSA Mini IoT Kit[cite: 2]. It is a low-cost embedded safety system that monitors brake fluid moisture and braking conditions to identify brake-fluid degradation and provide an early indication of brake fade risk[cite: 2]. 

Brake fluid is a critical yet often overlooked part of a vehicle's braking system. Glycol-based brake fluids such as DOT 3, DOT 4, and DOT 5.1 gradually absorb moisture from their surroundings. As moisture increases, the fluid's boiling point decreases and the risk of thermal degradation and internal corrosion increases[cite: 3]. Despite this continuous degradation, brake-fluid condition is typically assessed only during periodic maintenance, providing no continuous view of how the fluid is changing between service intervals[cite: 3].

BrakeGuard is designed for vehicle owners, automotive technicians, and safety-conscious drivers who want continuous visibility into their brake-fluid condition[cite: 3]. It is especially valuable for performance vehicles, commercial fleets, and regions with high humidity where brake-fluid degradation accelerates[cite: 3].

BrakeGuard addresses this gap by converting brake-fluid condition into a continuously monitored safety parameter[cite: 3]. A capacitive sensing unit detects changes in the electrical properties of the fluid associated with moisture contamination, while the ESP32-based MYOSA Mini Kit processes the measurement alongside braking-event data from the MPU6050 and environmental data from the BMP180[cite: 3].

Instead of reporting moisture content alone, BrakeGuard combines these measurements and evaluates them against experimentally established thresholds to generate a Brake Fade Risk Index[cite: 3]. The resulting status is presented locally through the MYOSA OLED and can also be transmitted for remote monitoring and trend analysis[cite: 3].

The project demonstrates a low-cost approach to condition-based brake-fluid monitoring, bringing together capacitive sensing, sensor fusion, edge processing, and IoT telemetry to make a normally invisible maintenance concern measurable and actionable[cite: 3].

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/brakeguard/image1.jpg" width="800"><br/>
  <i>BrakeGuard - Complete system overview</i>[cite: 3]
</p>

<p align="center">
  <img src="/assets/images/brakeguard/image2.jpg" width="800"><br/>
  <i>BrakeGuard - System in action</i>[cite: 3]
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/FQXrVpQ0Xbg"></iframe>
</div>

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/tfa1GhzAw6c"></iframe>
</div>

---

## Features (Detailed)

### 1. Continuous Brake-Fluid Health Sensing

BrakeGuard uses a custom parallel-plate capacitive sensing unit to monitor changes in brake-fluid condition[cite: 3]. Two conductive plates form the sensing element, with the brake fluid occupying the controlled gap between them[cite: 3].

As the dielectric properties of the fluid change with increasing moisture content, the effective capacitance of the sensing unit changes[cite: 3]. This electrical variation provides the primary sensing signal used by BrakeGuard[cite: 3].

<p align="center">
  <img src="/assets/images/brakeguard/feature1.jpg" width="800"><br/>
  <i>BrakeGuard capacitive sensing prototype</i>[cite: 3]
</p>

### 2. RC-Based Capacitance Measurement

The sensing unit is interfaced with the ESP32 through an RC charge-time measurement circuit[cite: 3]. Instead of requiring a dedicated capacitance-measurement IC, the system measures how quickly the sensing circuit charges towards a defined voltage level[cite: 3].

The charging behaviour of the RC circuit follows[cite: 3]:

V(t) = VCC × (1 − e^(−t/RC))[cite: 3]

where R is the known resistance and C represents the effective capacitance of the sensing unit[cite: 3].

As the capacitance changes, the charging time also changes[cite: 3]. The ESP32 measures this time and uses the resulting electrical response as the sensing signal for brake-fluid condition[cite: 3].

### 3. Experimental Calibration

The raw capacitive response is not directly treated as a moisture percentage[cite: 3]. BrakeGuard establishes a calibration relationship by measuring the sensing unit under controlled reference conditions[cite: 3].

The measured electrical response is mapped against known reference states to determine the usable operating range and condition thresholds[cite: 3]. This experimental approach also allows factors such as probe geometry, fluid type, temperature, and other practical effects to be evaluated during calibration[cite: 3].

### 4. Braking-Aware Condition Monitoring

Brake-fluid condition becomes particularly important when the braking system is subjected to repeated or severe braking[cite: 3]. BrakeGuard therefore uses the MPU6050 to detect significant deceleration events[cite: 3].

The acceleration signal is filtered and compared against experimentally selected thresholds[cite: 3]. Braking events are then tracked over a defined time window, allowing both braking severity and braking frequency to contribute to the system's assessment[cite: 3].

This provides operational context that a standalone moisture sensor cannot provide[cite: 3].

### 5. Brake Fade Risk Index

BrakeGuard combines the measured brake-fluid condition with braking behaviour to produce a single Brake Fade Risk Index[cite: 3].

The current risk model combines three normalised parameters[cite: 3]:

R = Wm × Sm + Wd × Sd + Wf × Sf[cite: 3]

where R is the Brake Fade Risk Index, Sm represents the moisture-condition score, Sd represents deceleration severity, Sf represents braking frequency, and Wm, Wd, and Wf are their respective weights[cite: 3].

Multiple thresholds classify the resulting index into different operating states[cite: 3]. This converts several raw sensor measurements into a simple, actionable indication of increasing brake-fluid-related risk[cite: 3].

### 6. Real-Time Edge Feedback

The sensing, filtering, and risk-assessment pipeline runs locally on the ESP32[cite: 3]. The MYOSA OLED provides immediate feedback by displaying the current BrakeGuard status and selected sensor information[cite: 3].

The core safety indication therefore does not depend on a computer, cloud service, or continuous internet connection[cite: 3].

### 7. IoT Telemetry and Condition Tracking

BrakeGuard can transmit sensor readings, braking data, risk index, and system status over Wi-Fi using MQTT[cite: 3]. This enables remote monitoring and long-term tracking of brake-fluid condition, supporting a shift from periodic inspection towards condition-based maintenance[cite: 3].

This creates the foundation for moving from periodic inspection towards condition-based maintenance, where changes in brake-fluid condition can be observed over time rather than only during scheduled servicing[cite: 3].

---

## Usage Instructions

1. Connect the capacitive sensing unit to the ESP32[cite: 3]
2. Power on the system[cite: 3]
3. The OLED display will show the current brake-fluid status[cite: 3]
4. Monitor remotely via MQTT dashboard[cite: 3]

---

## Tech Stack

- **ESP32** - Main microcontroller (MYOSA Mini Kit)
- **MPU6050** - Accelerometer/Gyroscope for braking detection[cite: 2, 3]
- **BMP180** - Barometric pressure and temperature sensor[cite: 2, 3]
- **OLED Display** - Local status display[cite: 2, 3]
- **MQTT** - IoT communication protocol[cite: 2, 3]
- **Wi-Fi** - Wireless connectivity[cite: 3]

---

## Requirements / Installation

### Hardware Requirements
- MYOSA Mini Kit (ESP32-based)[cite: 3]
- MPU6050 sensor module[cite: 3]
- BMP180 sensor module[cite: 3]
- OLED display module[cite: 3]
- Custom capacitive sensing unit[cite: 3]
- Brake fluid samples (DOT 3/4/5.1)[cite: 3]

### Software Requirements
- Arduino IDE or PlatformIO[cite: 3]
- ESP32 board support package[cite: 3]

### Libraries
```bash
Wire.h
Adafruit_GFX.h
Adafruit_SSD1306.h
MPU6050.h
Adafruit_BMP085.h
PubSubClient.h
WiFi.h
