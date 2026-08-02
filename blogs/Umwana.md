---
publishDate: 2026-07-30
title: Smart Baby Monitor
excerpt: A smart baby monitor system designed to provide real-time monitoring and safety alerts for infants.
image: Umwana/cover-image.png

tags:
  - IoT
  - TinyML
  - ESP32
  - HealthTech
  - myOSA DIY kit
---

> A smart DIY baby monitor system providing real-time safety alerts and monitoring for infants.

---

## Acknowledgements

I would love to acknowledge my team members
- Victor Olufemi
- Peter Adeyemo
## Overview

**MyOSA DIY** is a smart baby monitor system designed to provide real-time monitoring and safety alerts for infants. The system integrates an embedded device (ESP32-based), a robust backend API, and a cross-platform mobile application (Flutter).

The primary goal of the system is to detect potential hazards such as falls or high temperatures and instantly notify parents or guardians via the mobile app. It also provides a dashboard for visualizing historical and real-time sensor data.

### System Architecture
The system consists of three main components:
1.  **Device (Firmware)**: An ESP32 microcontroller equipped with sensors (Accelerometer, Gyroscope, Barometer) to collect data and detect events. It communicates via MQTT.
2.  **Backend (Server)**: A Python FastAPI application that processes MQTT messages, manages the database, and exposes a REST API for the mobile app.
3.  **Mobile App (Client)**: A Flutter application that allows users to view sensor data, receive alerts, and configure the device.

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/Umwana/cover-image.png" width="800"><br/>
  <i>Smart Baby Monitoring </i>
</p>



### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/gEWvYKbVrDo"></iframe>
</div>




## Features (Detailed)

### **1. Real-Time Monitoring**
Monitors the infant's live physical state and environment by continuously streaming telemetry data over MQTT. The system actively tracks:
* **Acceleration**: 3-axis acceleration (X, Y, Z) and net G-force.
* **Rotation**: 3-axis gyroscope data (X, Y, Z) and rotational magnitude.
* **Orientation**: 3-axis tilt and fused 3D spatial orientation (Roll, Pitch, Yaw).
* **Temperature**: Live ambient/body temperature compared against a dynamically configurable threshold.

### **2. Advanced Alerting System**
Intelligent algorithm detecting free-fall phases followed by impact, calculating a severity score based on multiple factors. It also triggers automatic alerts when ambient temperature exceeds a user-defined threshold, delivering immediate push notifications.

### **3. Edge AI (TinyML) & Sensor Fusion**
Embedded TensorFlow Lite Micro inference engine for highly accurate activity recognition. Integrates the Madgwick AHRS filter for flawless, drift-free 3D orientation (Roll, Pitch, Yaw), which enables advanced detections like stomach sleeping and crib escape prediction.

---

## Usage Instructions
To use the MyOSA DIY system, ensure the device is securely attached to the infant's clothing (ideally clipped to the chest area). 

**Testing the system before use:**
```plaintext
# 1. Test fall detection by dropping the device onto a soft mattress.
# 2. Test stomach sleeping detection by turning the device face-down for 10+ seconds.
# 3. Test temperature alerts by briefly warming the sensor.
```

---

## Tech Stack
* **ESP32 & C++ (Arduino Framework)**
* **TensorFlow Lite Micro (Edge AI)**
* **Python 3.9+ & FastAPI**
* **PostgreSQL & SQLAlchemy**
* **MQTT (HiveMQ/Mosquitto)**
* **Flutter (Dart)**
* **Docker & Docker Compose**

---

## Requirements / Installation

Ensure you have **Docker Desktop** and the **Flutter SDK** installed.

```bash
# 1. Start the Backend API and Database
cd backend
docker compose up --build

# 2. Install Mobile Dependencies and Run
cd ../mobile
flutter pub get
flutter run
```

### Device Setup & MQTT Configuration
1.  **Set up an MQTT Broker**: 
    - Use a free cloud broker like [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/) or a local Mosquitto instance.
2.  **Configure Wi-Fi & Firmware Variables**: Open `device/device.ino` and update your variables:
    ```cpp
    const char* ssid = "YOUR_WIFI_SSID";
    const char* password = "YOUR_WIFI_PASSWORD";
    const char* mqtt_server = "YOUR_MQTT_BROKER_URL"; 
    const int mqtt_port = 8883;
    const char* mqtt_user = "YOUR_MQTT_USERNAME"; 
    const char* mqtt_pass = "YOUR_MQTT_PASSWORD"; 
    ```
3.  Flash the firmware to your ESP32 board and open the Serial Monitor (115200 baud).

### Hardware Testing & Startup
After flashing, verify the hardware and sensors are working correctly by simulating events:

```plaintext
# 1. Power up the device
Connect your ESP32 to a USB power source or battery.

# 2. Check Serial Output
Open the Serial Monitor at 115200 baud. You should see logs confirming Wi-Fi, MQTT connection, and "System READY".

# 3. Trigger Hardware Alerts
- Fall Detection: Drop the device onto a soft mattress or pillow.
- Stomach Sleep: Place the device face down on a flat surface for >10 seconds.
- Temperature Alert: Pinch the IMU sensor with your fingers to temporarily raise the temperature.
```

## File Structure (Optional)
```text
.
├── README.md
├── backend/               # FastAPI backend and database setup
│   ├── app/               # Main application logic
│   ├── mosquitto/         # MQTT broker configuration
│   ├── docker-compose.yaml
│   └── ...
├── device/                # ESP32 Firmware code
│   ├── device.ino         # Main Arduino sketch
│   ├── model.h            # TensorFlow Lite model
│   └── ...
└── mobile/                # Flutter mobile application
    ├── lib/               # Dart source code
    ├── pubspec.yaml       # App dependencies
    └── ...
```
