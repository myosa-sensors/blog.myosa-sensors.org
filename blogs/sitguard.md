---
publishDate: 2026-08-02T00:00:00Z
title: SitGuard Predictive Posture Intelligence
excerpt: A context-aware predictive spinal health system using dual MYOSA sensor fusion to detect, explain, and correct posture deviations through live embedded tracking and intelligent medical coaching.
image: sitguard/sitguard-cover.jpg
tags:
  - MYOSA
  - IoT
  - Sensor-Fusion
  - Posture-Intelligence
  - ESP32
---
> A context-aware predictive posture correction system using dual MYOSA sensor fusion.
---
## Acknowledgements
SitGuard was developed by Abdulrahman Ehab for the MYOSA IEEE Event. We acknowledge the MYOSA platform for enabling an embedded sensing environment where dual-axis motion and posture signals can be combined into one intelligent medical coaching system. We also thank the physiotherapy experts whose clinical insights guided our personalized exercise algorithms.
---
## Overview
SitGuard is a context-aware predictive spinal health system built upon dual MYOSA sensor fusion.

The idea is simple but powerful: clinical posture correction cannot be understood from a single chest sensor. A slouch may involve forward pitch, while a lateral spinal deviation involves roll. A single sensor cannot differentiate between a user leaning forward entirely versus actually bending their spine dangerously.

SitGuard solves this by utilizing dual-node MYOSA sensor fusion. By mounting one MPU6050 on the upper back and a second on the lower back, the system continuously studies multiple sensor streams and calculates the exact spinal differential. Instead of acting like a basic threshold alarm, it behaves like a clinical command center that understands context, identifies specific musculoskeletal stress vectors (pitch vs. roll), and predicts fatigue.

The system translates raw kinematics into an explainable Pain & Fatigue risk state, provides real-time visual feedback via an interactive dashboard, and acts as a digital physiotherapist by generating customized rehabilitation routines based on the user's biometrics and real-time posture signature.

**Key features:**
* Dual-node MYOSA sensor fusion for true spinal differential tracking.
* Unified 0–100% Fatigue & Pain risk score.
* SAFE, WATCH, WARNING, and CRITICAL state model.
* Fall/Slouch-signature interpretation using pitch, roll, and inactivity context.
* Explainable incident story and tailored physiotherapy decision matrix.
* Real-time Flutter dashboard with live posture gauges and pie charts.
* Lightweight, purely sensor-driven embedded hardware stack (zero pneumatic latency).
* Simulation-ready presentation flow for reliable clinical evaluation.
---
## Demo / Examples
### **Images**

<p align="center">
  <img src="/assets/images/sitguard/sitguard-app-dashboard.jpg" width="470"><br/>
  <i>Predictive Posture Intelligence Dashboard showing live Risk State, split Roll metrics, and incident story</i>
</p>

<p align="center">
  <img src="/assets/images/sitguard/sitguard-sensors.jpg" width="470"><br/>
  <i>Dual MPU6050 placement architecture processing combined upper and lower lumbar signals</i>
</p>

<p align="center">
  <img src="/assets/images/sitguard/sitguard-app-coaching.jpg" width="470"><br/>
  <i>Coaching Screen: Collecting User Biometrics and Generating Personalized Physiotherapy</i>
</p>

<p align="center">
  <img src="/assets/images/sitguard/sitguard-app-chat.jpg" width="470"><br/>
  <i>Intelligent Chat Assistant: Medical support and posture history breakdown</i>
</p>

<p align="center">
  <img src="/assets/images/sitguard/sitguard-state-screen-1.jpg" width="470"><br/>
  <i>State Dashboard (Part 1): Live Roll & Pitch breakdown</i>
</p>

<p align="center">
  <img src="/assets/images/sitguard/sitguard-state-screen-2.jpg" width="470"><br/>
  <i>State Dashboard (Part 2): Posture history and detailed fatigue metrics</i>
</p>

### **Videos**
<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/XVGB6w_eqgo"></iframe>
</div>
---
## Features (Detailed)

### **1. Dual-Node MYOSA Sensor Fusion**
SitGuard uses dual MYOSA MPU channels as a combined posture-awareness layer. It interprets upper back pitch, lower back pitch, and lateral roll simultaneously. This makes the project stronger than a simple sensor logger. The system does not only ask, “Is the user tilted?” It asks, “What is the differential angle between the cervical and lumbar spine, and does this specific curvature pattern pose a long-term musculoskeletal risk?”

### **2. Unified Fatigue Risk Score**
The dashboard converts the fused dual-sensor stream into a clear 0–100 Fatigue Risk score. 
Risk levels are interpreted as:
* **0–24: SAFE** (Healthy alignment)
* **25–49: WATCH** (Minor slouching detected)
* **50–74: WARNING** (Prolonged deviation, muscle fatigue building)
* **75–100: CRITICAL** (High risk of chronic pain, immediate correction needed)

This makes the system easy to understand during a live demonstration. Judges can immediately see whether the user's spine is in a normal state, slightly stressed, or reaching a critical fatigue limit.

### **3. Explainable Intelligence Instead of Black-Box Alerts**
SitGuard provides specific reason codes and clinical incident summaries. The dashboard explains exactly *why* the risk changed.
Example reasons include:
* Normal baseline
* Left lateral roll stress
* Severe forward pitch (slouch)
* Prolonged static posture

This makes the system transparent and useful for real-world physiotherapy support.

### **4. Slouch-Signature Detection**
A slouch is not treated as just a sudden forward movement. SitGuard looks at a sequence of signals:
* Upper vs. Lower sensor differential
* Duration of the sustained angle
* Lack of micro-movements indicating muscle stiffness

This improves the clinical quality of the interpretation and reduces the chance of a standard leaning motion (like tying a shoe) being treated as bad posture.

### **5. Incident Story and Physiotherapy Matrix**
The dashboard includes an intelligent state panel that turns raw sensor values into human-readable clinical interpretation. Rather than just showing raw X/Y/Z data, the app uses medical guidelines to suggest targeted rehabilitation exercises to strengthen the exact muscles needed to fix the user's specific posture flaws, acting as an automated medical coach.

### **6. Lightweight Embedded Architecture**
By stripping away older, bulky Force Sensitive Resistors (FSRs) and pneumatic air pumps used in previous iterations, this version of SitGuard is vastly more energy-efficient and comfortable, proving that high-fidelity sensor fusion is superior to brute-force hardware feedback.

---
## Usage Instructions

**Hardware Demonstration:**
1. Power the ESP32 and connected dual MPU6050 nodes.
2. Put on the SitGuard vest, ensuring secure placement against the upper and lower spine.
3. Start the Node.js backend server.
4. Open the Flutter dashboard on your mobile device.
5. Calibrate the system by standing straight for 3 seconds.
6. Demonstrate forward pitch, left roll, and right roll. 
7. Watch the dashboard dynamically update the visual posture gauges, live pie charts, and risk state.

**Core Sensor Fusion Logic:**
Below is the critical embedded code snippet demonstrating the dual-MPU initialization and differential tracking logic:

```cpp
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

Adafruit_MPU6050 mpuUpper; 
Adafruit_MPU6050 mpuLower; 

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // I2C communication

  // Initialize Upper MPU
  if (mpuUpper.begin(0x68, &Wire, 0)) {
    mpuUpper.setAccelerometerRange(MPU6050_RANGE_8_G);
  } else {
    Serial.println("Upper MPU error!");
  }

  // Initialize Lower MPU
  if (mpuLower.begin(0x69, &Wire, 1)) {
    mpuLower.setAccelerometerRange(MPU6050_RANGE_8_G);
  } else {
    Serial.println("Lower MPU error!");
  }

  Serial.println("\n--- SITGUARD DUAL SENSOR FUSION ACTIVE ---");
}
```

---
## Tech Stack
* **Hardware:** MYOSA IoT Kit, ESP32, Dual MPU6050 Accelerometer/Gyroscope Modules
* **Firmware:** Arduino C++ (Sensor reading, I2C fusion, serial stream)
* **Mobile Frontend:** Flutter, Dart, GetX State Management, FL Chart
* **Backend:** Node.js, Express, Socket.IO (for real-time telemetry)
* **Database:** MongoDB (Local reading and historical posture event storage)
---
## Requirements / Installation

**Firmware Setup:**
For firmware upload, open the Arduino sketch, install the `Adafruit_MPU6050` and `Adafruit_Sensor` libraries, select the correct ESP32 board and serial port, and upload it to the MYOSA-connected ESP32 device.

**Backend Setup:**
```bash
npm install express socket.io mongoose
node server.js
```

**Flutter App Setup:**
```bash
flutter pub get
flutter run
```
---
## File Structure
```
sitguard/
  ├─ sitguard.md 
  ├─ sitguard-demo.mp4 
  ├─ sitguard-cover.jpg 
  ├─ sitguard-app-dashboard.jpg 
  └─ sitguard-sensors.jpg
```
---
## License
This project is submitted for educational and innovation showcase purposes under the MYOSA IEEE context. All included dashboard screenshots and hardware photographs are original project materials from Abdulrahman Ehab.
---
## Contribution Notes
Future improvements may include multi-patient monitoring dashboards for physiotherapy clinics, cloud-based posture history, machine-learning-assisted risk tuning, and structured validation in clinical rehabilitation environments. 
The core principle remains the same: explainable MYOSA sensor fusion for predictive posture intelligence.
