---
publishDate: 2026-08-25T00:00:00Z
title: "NeuroClip – Wearable Motion Monitoring & Caregiver Alert System"
excerpt: "NeuroClip is a wearable ESP32-based monitoring system that detects abnormal movement and provides local and remote alerts to caregivers through an OLED, buzzer, Firebase, and a real-time web dashboard."
image: neuroclip/neuroclip_fullcircuitnormal.jpeg
tags:
  - wearable
  - healthcare
  - fall-detection
  - esp32
  - iot
---

> **Detect movement. Recognize danger. Alert the right person, before it is too late.**

---

## Acknowledgements

NeuroClip was developed using open-source hardware, software, and development tools, including the ESP32 platform, Arduino framework, MPU6050 motion sensor, SSD1306 OLED display, and Firebase Realtime Database.

We acknowledge the open-source communities and developers whose libraries, documentation, and tools make rapid prototyping of embedded and healthcare-oriented technologies possible.

NeuroClip is a student research and engineering prototype developed for the **MYOSA competition**. It is not a certified medical device and is not intended for clinical diagnosis or treatment.

---

## Overview

It started with a conversation about my closest friend's grandmother.

My friend told me about how his grandmother would sometimes slowly tilt to one side before falling. It wasn't always a sudden fall that someone could immediately notice. Sometimes, it began with something much smaller, a gradual loss of balance, a slow tilt to one side, and then, eventually, a fall.

What stayed with us was the thought that someone could be right there, and still not realize what was happening until it was too late.

That conversation made the problem feel very real to us. We started thinking about elderly care homes and assisted living environments, where a small number of caregivers may be looking after many residents at the same time. Some elderly people may not be able to speak clearly, call for help, or communicate that they are losing their balance. Even a few minutes of delay can matter when someone has fallen.

We kept coming back to one simple question:

What if the person could have something with them that noticed the movement, even when nobody else could?

That question became the idea behind NeuroClip.

A wearable device that continuously monitors movement, recognizes potentially abnormal motion, and alerts someone who can help — before it is too late.

### Our Solution

NeuroClip is a compact wearable motion monitoring prototype designed to recognize abnormal movement patterns and provide immediate awareness to both the wearer and a remote caretaker.

The device uses an **MPU6050 accelerometer and gyroscope** connected to an **ESP32**. The ESP32 processes the motion data and evaluates it against abnormal-motion thresholds.

When an abnormal movement is detected:

1. The **OLED displays an alert**.
2. The **buzzer provides a local audible warning**.
3. The event is sent through **Wi-Fi**.
4. **Firebase Realtime Database** stores the updated device state.
5. The **NeuroClip caretaker dashboard** receives the event in real time.

This creates a complete chain from physical movement to remote caregiver awareness.

### Problem Solved

The primary problem NeuroClip addresses is the **delay between an abnormal movement event and someone becoming aware of it**.

Traditional observation depends heavily on caregivers noticing an event or the individual being able to ask for help. NeuroClip explores an alternative approach where movement itself can trigger an alert.

### Who Is It For?

NeuroClip is designed primarily as a prototype for:

* Elderly-care and assisted-living environments
* Caregivers and nursing staff
* People who may have difficulty communicating an emergency
* Researchers exploring wearable motion monitoring
* Students and developers working on healthcare IoT systems

NeuroClip is currently a prototype and requires further validation before any real-world medical or safety-critical deployment.

---

## Research Foundation

Sensor placement and inertial sensing are important considerations in wearable fall and movement detection.

A systematic review of wearable sensor-based fall detection found that sensor placement has a significant influence on system design, with waist/lumbar placement being common while other locations, including the head, have also been investigated.

Research has also specifically demonstrated the feasibility of **head-mounted inertial sensing** for fall detection. One experimental head-mounted system used inertial measurements and movement/posture thresholds to identify falling movements and reported high sensitivity and specificity in its evaluation.

Other research has investigated inertial sensors integrated into **head-worn devices such as hearing instruments**, demonstrating the potential of unobtrusive head-worn sensing for fall detection.

Based on this research, NeuroClip explores a **side-of-head wearable form factor** as a design choice for capturing changes in head movement and orientation associated with loss of balance.

Importantly, NeuroClip does **not** claim that head placement is universally superior to other sensor locations. Sensor placement is an engineering decision that requires further experimental validation for different users and movement conditions.

The longer-term goal is to investigate whether abnormal movement can be detected early enough to provide useful caregiver awareness, potentially including **near-fall or loss-of-balance events**, rather than only detecting an impact after a fall.

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_wearingposition.jpeg" width="800"><br/>
  <i>NeuroClip worn by the user in its intended wearable position.</i>
</p>

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_fullcircuitnormal.jpeg" width="800"><br/>
  <i>NeuroClip hardware operating in the normal monitoring state.</i>
</p>

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_alertcircuit.jpeg" width="800"><br/>
  <i>NeuroClip hardware during an abnormal movement alert.</i>
</p>

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_normaldashboard.png" width="800"><br/>
  <i>NeuroClip caretaker dashboard during normal operation.</i>
</p>

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_alert.png" width="800"><br/>
  <i>Live caretaker dashboard showing an active abnormal-movement alert.</i>
</p>

<p align="center">
  <img src="/assets/images/neuroclip/neuroclip_alertacknowledged.png" width="800"><br/>
  <i>Caretaker dashboard after the alert has been acknowledged.</i>
</p>

### Videos

#### Full End-to-End Demonstration

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/6DyYhEIEbFo"></iframe>
</div>

*Complete demonstration showing movement detection, local alerting, Firebase communication, caretaker dashboard alert, and alert acknowledgement.*

#### Wearable Demonstration

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/E3g4RrN9o6I"></iframe>
</div>
*NeuroClip operating while worn by the user.*
---

## Features (Detailed)

### 1. Abnormal Movement Detection

The NeuroClip prototype uses an **MPU6050** to measure:

* Three-axis acceleration
* Three-axis angular velocity

The ESP32 continuously processes these measurements and calculates motion characteristics used by the abnormal-movement detection logic.

The current prototype uses configurable acceleration and gyroscope thresholds to identify movements that differ significantly from normal motion.

When the configured threshold is exceeded, the device changes its state to:

`Abnormal movement`

and activates the alert system.

The thresholds are currently experimental and are intended to be refined through further testing and user-specific validation.

---

### 2. Local OLED Alert

NeuroClip includes an SSD1306 OLED display for immediate local feedback.

During normal operation, the display communicates that the device is monitoring movement.

When an abnormal event is detected, the OLED provides a highly visible alert indicating that abnormal movement has been detected and that the user should be checked.

This means the device does not depend entirely on the Internet or caretaker dashboard for immediate local feedback.

---

### 3. Audible Buzzer Alert

A buzzer provides an additional local alert when abnormal movement is detected.

The current implementation uses a repeating beep pattern rather than keeping the buzzer continuously active.

This provides an immediate indication that an abnormal event has been detected.

The local alert is intentionally separated from the cloud connection so that the device can still provide an immediate warning even if network connectivity is temporarily unavailable.

---

### 4. Wi-Fi Connectivity

The ESP32 connects to a configured Wi-Fi network and transmits telemetry to the NeuroClip cloud backend.

The transmitted information includes:

* Acceleration
* Gyroscope
* Motion status
* Alert status
* Battery information
* Device online status
* Timestamp

The Wi-Fi connection allows the physical wearable to communicate with a remote caretaker interface.

---

### 5. Firebase Realtime Database

Firebase Realtime Database acts as the cloud communication layer between the NeuroClip wearable and caretaker dashboard.

The device writes its state under:

```text
devices/
└── NeuroClip-01/
    ├── status/
    │   ├── batteryLevel
    │   ├── isAlertActive
    │   └── isOnline
    │
    └── telemetry/
        ├── acceleration
        ├── gyroscope
        ├── motionStatus
        └── lastUpdated
```

The dashboard listens to these values in real time.

When the ESP32 changes the alert state, the dashboard can reflect the change without requiring the caretaker to manually refresh the page.

---

### 6. Real-Time Caretaker Dashboard

NeuroClip includes a browser-based caretaker dashboard hosted through GitHub Pages.

The dashboard provides:

* Device connection status
* Current motion status
* Live acceleration
* Live gyroscope readings
* Battery information
* Alert status
* Alert history
* Alert acknowledgement
* Device information

The dashboard is designed to prioritize the information a caretaker needs during an event rather than presenting unnecessary technical data.

---

### 7. End-to-End Alert Pipeline

The complete system operates as:

```text
Movement
   ↓
MPU6050
   ↓
ESP32
   ↓
Motion analysis
   ↓
Abnormal movement detected
   ↓
 ┌───────────────┬─────────────────┐
 ↓               ↓                 ↓
OLED           Buzzer            Wi-Fi
ALERT           ALERT               ↓
                                Firebase
                                    ↓
                              Caretaker Dashboard
                                    ↓
                                  ALERT
```

This provides both **local and remote awareness**.

---

### 8. Fail-Safe Local Alerting

The local OLED and buzzer are controlled by the ESP32 itself.

Therefore, the wearable does not have to wait for the cloud dashboard before responding to an abnormal movement event.

This creates two layers of alerting:

**Local:** OLED + buzzer

**Remote:** Wi-Fi + Firebase + caretaker dashboard

---

## Usage Instructions

### 1. Connect the Hardware

The prototype uses an ESP32 with the MPU6050 and SSD1306 OLED connected through I²C.

Typical connections used in the prototype:

```text
MPU6050 / OLED
      │
      ├── SDA → ESP32 GPIO 21
      ├── SCL → ESP32 GPIO 22
      ├── VCC → 3.3V
      └── GND → GND
```

The buzzer is connected to the GPIO configured in the NeuroClip firmware.

### 2. Configure Wi-Fi

Open the NeuroClip Arduino firmware and configure:

```cpp
#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
```

The ESP32 requires a compatible **2.4 GHz Wi-Fi network**.

### 3. Install Arduino IDE

Install Arduino IDE and add ESP32 board support.

Install the required libraries used by the firmware.

### 4. Upload the Firmware

1. Connect the ESP32 through USB.
2. Select the correct ESP32 board.
3. Select the correct COM port.
4. Verify the firmware.
5. Upload it to the ESP32.

### 5. Open Serial Monitor

Open the Serial Monitor at:

```text
115200 baud
```

The ESP32 will report its initialization sequence, sensor detection, Wi-Fi connection, and Firebase communication.

### 6. Start Monitoring

Once connected, NeuroClip begins continuously monitoring motion.

Under normal conditions, the device remains in the normal monitoring state.

When abnormal movement exceeds the configured detection threshold:

* The OLED displays an alert.
* The buzzer sounds.
* Firebase is updated.
* The caretaker dashboard changes to the alert state.

### 7. Open the Caretaker Dashboard

The live NeuroClip dashboard is available at:

https://aksalizabraham.github.io/NeuroClipDashboard/

The dashboard receives telemetry from the NeuroClip Firebase backend.

---

## Tech Stack

### Firmware

* C++
* Arduino Framework
* ESP32
* ESP32 Wi-Fi
* I²C communication
* Firebase Realtime Database

### Hardware

* ESP32 development board
* MPU6050 accelerometer and gyroscope
* SSD1306 OLED display
* Buzzer
* Jumper wires
* USB power/data connection

### Software / Libraries

* Arduino IDE
* FirebaseClient by Mobizt
* Wire / I²C communication
* SSD1306 OLED library
* ESP32 board support

### Cloud

* Firebase Realtime Database

### Web Interface

* HTML5
* CSS3
* JavaScript
* Firebase Web SDK
* GitHub Pages

---

## Requirements / Installation

### Hardware Requirements

* 1× ESP32 development board
* 1× MPU6050
* 1× SSD1306 OLED
* 1× Buzzer
* Jumper wires
* USB cable
* 2.4 GHz Wi-Fi network

### Software Requirements

* Arduino IDE
* ESP32 board support package
* FirebaseClient library
* Required OLED library
* Modern web browser
* Firebase project

### Installation

1. Install Arduino IDE.
2. Install ESP32 board support.
3. Install the required Arduino libraries.
4. Open the NeuroClip firmware.
5. Configure the Wi-Fi credentials.
6. Configure the Firebase project credentials.
7. Connect the hardware.
8. Select the ESP32 board and COM port.
9. Verify and upload the firmware.
10. Open Serial Monitor at 115200 baud.
11. Confirm Wi-Fi and Firebase connectivity.
12. Open the NeuroClip caretaker dashboard.

---

## File Structure

```text
NeuroClip/
│
├── NeuroClip_Firebase_Test.ino
│
├── dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── data-service.js
│   ├── firebase-config.js
│   └── README.md
│
└── assets/
    └── images/
        └── neuroclip/
            ├── neuroclip-cover.jpg
            ├── neuroclip-hardware.jpg
            ├── neuroclip-oled-normal.jpg
            ├── neuroclip-oled-alert.jpg
            └── neuroclip-dashboard.jpg
```

---

## Current Prototype Status

NeuroClip has been implemented and tested as an end-to-end working prototype.

The current demonstrated pipeline is:

```text
MPU6050
   ↓
ESP32
   ↓
Real-time motion detection
   ↓
OLED + Buzzer
   ↓
Wi-Fi
   ↓
Firebase Realtime Database
   ↓
NeuroClip Caretaker Dashboard
```

The prototype has been tested with real MPU6050 motion data, Firebase telemetry updates, OLED alerts, buzzer alerts, and live dashboard updates.

---

## Current Limitations

NeuroClip is currently a first-stage prototype and has several limitations that can be addressed through further development.

* The current buzzer may be uncomfortable or distracting for some elderly or neurodivergent users.
* The prototype currently relies on an external power source, making it less compact for continuous wearable use.
* The current detection system uses threshold-based motion analysis and may produce false positives.
* Long-term movement and fall-history analysis is not yet implemented.
* The current prototype has not undergone clinical or large-scale real-world validation.
* The current caretaker dashboard is a prototype/mock interface, and its online status indicator does not yet fully verify the physical device's real-time connectivity.

---

## Future Scope

NeuroClip is intended as a foundation for further research and development.

Future improvements include:

* Customizable sound, vibration, and caregiver alerts
* Battery-powered and miniaturized hardware
* Long-term storage of movement and fall history in lightweight CSV format
* AI-based analysis of movement patterns and fall history
* Personalized movement thresholds
* Improved detection of near-falls and gradual loss of balance
* Machine-learning-based movement classification
* Reduction of false positives
* Mobile notifications for caregivers
* Multiple NeuroClip devices connected to one caretaker dashboard
* Clinical and real-world validation

A particularly important future direction is using **long-term movement and fall-history data with AI analysis** to identify whether a person's mobility patterns and fall risk are improving, remaining stable, or worsening over time.

---

## License

NeuroClip is a student research and engineering prototype developed for the MYOSA competition.

Individual open-source libraries and components used by the project remain subject to their respective licenses.

---

## Contribution Notes

NeuroClip is currently a prototype developed for the MYOSA competition.

The project can be extended through improvements to:

* Motion-detection algorithms
* Sensor placement studies
* Wearable hardware design
* Caretaker interfaces
* Cloud architecture
* Alert mechanisms
* Data analysis and machine-learning models

Further development should prioritize reliability, privacy, security, user safety, and real-world validation.
