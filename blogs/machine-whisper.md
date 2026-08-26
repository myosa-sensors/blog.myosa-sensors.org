---
publishDate: 2026-08-25T00:00:00Z
title: MachineWhisper — Catching Machine Faults Before They Become Breakdowns
excerpt: An industrial predictive maintenance system using ESP32, Edge AI (TinyML), and Flutter to analyze vibration frequencies and detect machine faults in real-time.
image: hardware-photo.jpg
tags:
  - predictive-maintenance
  - esp32
  - tinyML
  - flutter
  - iot
  - edge-computing
---

> Catching machine faults before they become breakdowns using Edge AI and real-time mobile monitoring.

---

## Acknowledgements 

MachineWhisper was developed by undergraduate engineering students from **Government Engineering College Thrissur (GECT)**.

We gratefully acknowledge the guidance and support provided by our faculty mentor, **Dr. Deepak S**, throughout the development and evaluation of this project. Special thanks to the MYOSA community and the open-source hardware ecosystem for providing the foundation to build accessible, AI-powered industrial IoT solutions.

**Team Members:**
* Athmaj Das K
* Ajul G Krishnan
* Athul Krishna C S
* Brijo

---

## Overview

**MachineWhisper** is a complete, end-to-end predictive maintenance system designed for industrial motors and rotating machinery. 

* **What the project does:** It continuously monitors the mechanical and thermal health of a motor, running an Artificial Intelligence model directly on the hardware to classify its state as *Normal*, *Imbalance*, *Bearing Wear*, or *Idle*. 
* **How it works:** By utilizing an ESP32 and an MPU6050 vibration sensor, the system captures microscopic vibrations, processes them using a Fast Fourier Transform (FFT), and feeds the frequency features into a local TensorFlow Lite (TinyML) model. The processed predictions are streamed to a Flutter app via Firebase.
* **What problem it solves:** Traditional maintenance is either *reactive* (fixing after catastrophic failure) or *preventive* (replacing perfectly good parts on a rigid schedule). Both lead to massive financial losses in downtime and parts. MachineWhisper introduces *predictive* maintenance at a fraction of the cost of heavy industrial sensors.
* **Who it is for:** Factory floor operators, industrial maintenance teams, and hobbyists looking to protect their mechanical equipment from overheating and structural failure.

**Key features:**
* Real-time machine state classification via Neural Networks on the Edge.
* Fast Fourier Transform (FFT) signal processing to isolate dominant vibration frequencies.
* Automated physical emergency cut-off using an active-LOW hardware relay.
* Dynamic current auto-calibration to detect motor "Idle" states perfectly.
* Live remote operator dashboard built in Flutter with Riverpod state management.

---

## Demo / Examples

### **Images**

<p align="center">
<img src="hardware-photo.jpg" width="800"><br/>
<i>The MachineWhisper hardware connected to the DC motor</i>
</p>

<p align="center">
<img src="login-page.jpg" width="800"><br/>
<i>Cross-platform web and Android login interface</i>
</p>

<p align="center">
<img src="dashboard.png" width="800"><br/>
<i>The real-time dashboard showing live telemetry and anomaly alerts</i>
</p>

<p align="center">
<img src="notification-warning.png" width="800"><br/>
<i>Instant push notification warnings triggered during a severe anomaly</i>
</p>

### **Videos**

**Live Project Demo:**
<video controls width="100%">
<source src="project-demo.mp4" type="video/mp4">
</video>

**PPT Presentation Overview:**
<video controls width="100%">
<source src="ppt-presentation.mp4" type="video/mp4">
</video>

---

## Features (Detailed)

### **1. Signal Processing Pipeline & FFT**
Raw vibration data is essentially indistinguishable noise. MachineWhisper actively samples 200 precise data points from the MPU6050 accelerometer at strict 5ms intervals (200Hz sampling rate). The ESP32 then passes this time-domain data through a **Fast Fourier Transform (FFT)** to convert it into the frequency domain. This allows the system to isolate the exact *Dominant Frequency*, *Amplitude*, and *Harmonics* of the rotating motor, cleanly filtering out background noise.

### **2. Edge AI Classification (TinyML)**
Instead of relying on the cloud to do the heavy lifting (which introduces latency and bandwidth costs), the AI lives on the device. We deployed a **TensorFlow Lite** neural network natively on the ESP32. The model takes the extracted FFT features and physical RMS energy, passes them through a quantized Dense Neural Network, and outputs a Softmax probability array. It instantly classifies whether the motor is experiencing a clean rotation (Normal), an off-center weight (Imbalance), or high-frequency friction (Bearing Wear).

### **3. Smart Idle Detection & Auto-Calibration**
Because standard electrical noise can trick a vibration sensor into thinking an idle motor is running smoothly, MachineWhisper incorporates an **ACS712 Current Sensor**. Upon boot, the ESP32 dynamically auto-calibrates the zero-point voltage of the local environment. If the current draw drops below 0.40A, the system intelligently overrides the AI and locks into an "Idle (Motor OFF)" state, saving processing power and preventing false positives.

### **4. Failsafe Emergency Stop System**
Safety cannot rely on Wi-Fi. If the Machine Learning model detects a severe anomaly, or if the secondary **DHT22** sensor detects an ambient casing temperature exceeding 40.0°C, a local hardware interrupt is triggered. The ESP32 sends a `HIGH` signal to an active-HIGH Relay wired in a **Normally Closed (NC)** configuration. This physically breaks the circuit, instantly killing power to the motor and sounding an active-HIGH buzzer to alert factory floor workers.

### **5. Real-Time Flutter Operator Dashboard**
The ESP32 pushes strict, lightweight JSON payloads to a **Firebase Realtime Database** every 5 seconds. A cross-platform mobile application, built using **Flutter**, subscribes to this data stream. Using Riverpod for reactive state management, the UI dynamically changes colors (Green/Yellow/Red) based on the motor's health, plots severity history, and calculates an "Estimated Time to Maintenance" metric based on the physical degradation of the machine.

---

## Usage Instructions

### **1. Hardware Assembly & Wiring**
* **MPU6050:** Mount completely flat and tightly against the motor casing (Pins: 3V3, GND, SDA->21, SCL->22).
* **DHT22:** Mount near the motor to monitor ambient heat (Pins: 3V3, GND, Data->4).
* **ACS712:** Wire in series with the motor's power supply (Pins: 5V, GND, OUT->32).
* **Relay Module:** Wire the motor's positive power wire through the `COM` and `NC` (Normally Closed) terminals (Signal->19).
* **Buzzer:** Connect to Pin 14.

### **2. Flashing the Firmware**
Open `esp32.ino` in the Arduino IDE. Update your WiFi and Firebase credentials at the top of the file. Connect your ESP32 via USB and run:
```bash
# Upload via Arduino IDE or CLI
arduino-cli compile --fqbn esp32:esp32:esp32 esp32.ino
arduino-cli upload -p COM3 --fqbn esp32:esp32:esp32 esp32.ino
```

### **3. Running the Operator Dashboard**
Navigate to the Flutter app directory, install dependencies, and launch the app on an Android/iOS emulator or physical device:
```bash
cd App
flutter pub get
flutter run
```

### **4. Example Serial Monitor Output**
```plaintext
WiFi Connected: 192.168.1.4
Calibrating Current Sensor zero-point... Done!
Buffer is ready! Starting DSP...
Running FFT...
Running ML Inference...
DEBUG -> Freq: 70.31 | Amp: 105.12 | H2: 0.00 | RMS: 950.26
ML Prediction Pushed: Normal (92.5%)
```

---

## Tech Stack

* **Hardware Layer:** 
  * ESP32 Development Board
  * MPU6050 (6-axis Accelerometer/Gyroscope)
  * ACS712 (Hall-Effect Current Sensor)
  * DHT22 (Temperature & Humidity Sensor)
  * 5V Relay Module & Active-HIGH Buzzer
* **Embedded Software & Edge AI:** 
  * C++ / Arduino Core
  * TensorFlow Lite for Microcontrollers (TinyML)
  * arduinoFFT
* **Backend & Cloud:** 
  * Firebase Realtime Database
  * Firebase Authentication
* **Frontend Application:** 
  * Flutter (Dart)
  * Riverpod (State Management)
* **Model Training (Offline):** 
  * Python, TensorFlow, Keras, Pandas, NumPy

---

## Requirements / Installation

### **ESP32 Library Dependencies**
Search for and install the following via the Arduino IDE Library Manager:
* `Arduino_TensorFlowLite` (by TensorFlow)
* `arduinoFFT` (by Enrique Condes)
* `Firebase_ESP_Client` (by Mobizt)
* `DHT sensor library` (by Adafruit)

### **Flutter `pubspec.yaml` Dependencies**
Ensure you have the following installed in your Flutter environment:
```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^3.0.0
  firebase_database: ^11.0.0
  firebase_auth: ^5.0.0
  flutter_riverpod: ^2.5.1
```

---

## License 

This project is fully open-source and released under the **MIT License**. You are free to modify, distribute, and use this software for both personal and commercial industrial applications.

