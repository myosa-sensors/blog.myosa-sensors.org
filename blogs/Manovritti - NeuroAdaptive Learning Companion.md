---
publishDate: 2026-05-24
title: NeuroAdaptive Learning Companion
excerpt: A calm, adaptive learning companion designed to support focus, regulation, and engagement without using invasive monitoring.
image: manovritti/manovritti-cover.jpeg
tags:
  - NeuroAdaptive Learning
  - Assistive Technology
  - Focus & Regulation
  - Inclusive Education
---

> A calm, adaptive learning companion designed to support focus, regulation, and engagement without using invasive monitoring.  
> **Focus. Regulate. MANOVRITTI**
---

## Acknowledgements

We would like to thank the MYOSA platform for providing the hardware ecosystem and development support. This project is inspired by the need for non-invasive, privacy-safe learning support systems for neurodivergent individuals, especially children with autism and ADHD.

## Overview

This project is a **neuroadaptive learning companion system** that helps users stay focused, regulate behavior, and improve engagement during learning sessions.

Instead of using cameras or microphones, the system relies on:
- motion sensing,
- interaction detection,
- environmental awareness,

to understand behavioral patterns and provide adaptive feedback.

**Problem Statement:**
Many existing learning systems rely on intrusive monitoring (cameras, microphones), do not adapt to individual behavior, fail to support sensory-sensitive users, and lack real-time feedback. This project solves that by creating a **privacy-safe, adaptive, real-time behavioral support system.**

**Key features:**
* real-time behavioral analysis  
* adaptive feedback system  
* sensory-aware interaction  
* engagement and focus tracking  
* non-invasive design (no camera, no mic)  
* personalized learning support  

----
### Dashboard Images

<p align="center">
<img src="/assets/images/manovritti/dashboard-manovritti.jpeg" width="800"><br/>
<i>Main application dashboard providing comprehensive therapy insights and learning engagement.</i>
</p>

<p align="center">
<img src="/assets/images/manovritti/therapy-setup.png" width="800"><br/>
<i>Session management and therapy configuration screen.</i>
</p>

<p align="center">
<img src="/Images/patient-analytics.png" width="800"><br/>
<i>Detailed analytics panel showcasing student interaction response patterns.</i>
</p>

<p align="center">
<img src="/assets/images/manovritti/therapy-timeline.png" width="800"><br/>
<i>Interactive therapy flow and session timeline.</i>
</p>

<p align="center">
<img src="/assets/images/manovritti/history-trends.png" width="800"><br/>
<i>Historical trends and progress reports for continuous tracking.</i>
</p>

---

### Presentation Video

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/49OxcOQzY-c"></iframe>
</div>

---

## Features

The system is designed with multiple hardware and software features that work together to create an interactive and engaging learning experience. Each feature is described in detail below.

---

### **1. Real-time behavioral analysis**

The system continuously analyzes:
- motion patterns (mpu6050),
- interaction frequency (apds9960),
- environmental conditions (bmp180).

It detects focus, restlessness, disengagement, overload indicators, and recovery patterns.

---

### **2. Adaptive feedback system**

Based on detected states, the system responds with oled messages, rgb led signals, and gentle buzzer tones.

Example:
- **focused** → encouragement  
- **restless** → calming suggestion  
- **overload** → recovery guidance  

---

### **3. Sensory-aware interaction**

Designed for neurodivergent users:
- no flashing lights,
- no loud alarms,
- smooth transitions,
- calming visuals.

---

### **4. Engagement tracking**

Tracks focus duration, interaction gaps, behavioral transitions, and session performance.

---

### **5. Companion-like interaction**

The device behaves like a supportive companion:
- gives encouragement,
- suggests breaks,
- rewards progress,
- builds routines.

---

### **6. Backend intelligence engine**

All processing happens on a system backend:
- sensor fusion,
- behavioral state detection,
- engagement scoring,
- adaptive decision-making.

---

## Usage Instructions

This section explains how others can use, rebuild, and operate the system using the files provided in the repository.

---

### 1. Clone or Download the Repository

Download the project files from GitHub using one of the following methods.

```plaintext
git clone <repository-url>

Alternatively, download the repository as a ZIP file and extract it on your computer.
```

---

### Firmware Upload / Programming

To upload or update the firmware, connect the ESP32 to a computer using a USB cable and follow the steps below.

```plaintext
Open Arduino IDE
Select Board: ESP32-WROOM-DA
Select Port: COMx
Click Upload
```

---

### Hardware & Backend Setup

1. Power on the MYOSA device  
2. Connect to WiFi  

#### Start MQTT broker
```bash
sudo mosquitto
```

#### Run backend server
```bash
python main.py
```

#### Begin learning session
1. Open dashboard
2. Begin learning session

---

## Tech Stack

### Hardware Stack
* **ESP32 (MYOSA platform)** – Main microcontroller  

### Software & Backend Stack
* **C/C++** – Firmware  
* **Python** – Backend  
* **FastAPI** – Web API  
* **MQTT (mosquitto)** – Messaging  
* **React** – Dashboard UI  
* **ArduinoJson** – JSON parsing  
* **NumPy / Pandas** – Data analysis  

---

## Requirements / Installation

To set up or rebuild the project, install the required software and libraries listed below.

### Software Requirements
- Arduino IDE  
- ESP32 Board Package (via Arduino Board Manager)

### Required Python Libraries

Install the following Python dependencies:

```bash
pip install fastapi paho-mqtt numpy pandas uvicorn
```

### Required System Packages

Install the MQTT broker:

```bash
sudo apt install mosquitto
```

---

## File Structure

```plaintext
/neuroadaptive-learning-companion
├── firmware/
│   ├── main.ino
│   ├── sensors.cpp
│   └── mqtt.cpp
│
├── backend/
│   ├── main.py
│   ├── analysis.py
│   ├── mqtt_handler.py
│   └── database.py
│
├── dashboard/
│   ├── src/
│   └── components/
│
├── assets/
│   └── images/
│
└── README.md
```

---

## License

This project is open-source and available under the BSD-3 License.

---

## Contribution Notes

Contributions are welcome and encouraged. You can:

- improve behavioral models,
- enhance dashboard UI,
- optimize firmware,
- add personalization features.

### How to Contribute

1. Fork the repository on GitHub.
2. Clone the forked repository to your local system.
3. Make the required changes and test them where applicable.
4. Commit and push the changes to your fork.
5. Submit a Pull Request with a clear description of the updates.

For minor suggestions or discussions, contributors are encouraged to open an issue before making major changes.
