---
publishDate: 2026-05-24T00:00:00Z
title: Sanjeevani AI
excerpt: A context-aware predictive emergency intelligence system using MYOSA sensor fusion to detect, explain, and escalate safety risks through live embedded sensing, dashboard intelligence, and Telegram alerts.
image: sanjeevani/cover-dashboard.png
tags:
  - MYOSA
  - IoT
  - Sensor-Fusion
  - Emergency-Intelligence
  - ESP32
---

> Context-Aware Predictive Emergency Intelligence System using MYOSA Sensor Fusion.

---

## Acknowledgements

Sanjeevani AI was developed by Team Sanjeevini AI from Symbiosis Institute of Technology, Hyderabad for MYOSA Event 5.0.

We acknowledge the MYOSA platform for enabling an embedded sensing environment where environmental, motion, posture, pressure, gesture, and response signals can be combined into one intelligent emergency awareness system.

---

## Overview

Sanjeevani AI is a context-aware predictive emergency intelligence system built around the MYOSA Mini IoT Kit.

The idea is simple but powerful: emergencies are rarely understood from one sensor alone. A fall may involve sudden motion, posture change, and reduced movement. Indoor distress may involve temperature, humidity, air-quality stress, pressure variation, or manual gesture input. A normal sensor value may become important only when another signal changes at the same time.

Sanjeevani AI solves this by using MYOSA sensor fusion. It continuously studies multiple sensor streams and converts them into one explainable emergency risk state. Instead of acting like a basic threshold alarm, it behaves like an emergency command center that understands context, confidence, and cause-effect patterns.

The system can display live risk, explain why risk is increasing, show real-time graphs, indicate sensor confidence, provide local hardware feedback through OLED and LED output, and communicate status through a Telegram alert bot.

**Key features:**

* MYOSA-based contextual sensor fusion
* Unified 0–100 emergency risk score
* SAFE, WATCH, WARNING, and EMERGENCY state model
* Fall-signature interpretation using motion, posture, impact, and inactivity context
* Explainable incident story and decision matrix
* Real-time dashboard with live graphs and sensor cards
* OLED display for local embedded status
* LED and buzzer-ready response layer
* Telegram bot for remote emergency awareness
* Simulation-ready presentation flow for reliable evaluation
* Mobile-friendly and large-screen dashboard experience

Sanjeevani AI is an innovation showcase and engineering prototype. It is not a certified medical device and does not replace professional emergency services.

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/sanjeevani/cover-dashboard.jpg" width="800"><br/>
  <i>Predictive Emergency Intelligence Command Center showing live risk, incident story, confidence, Telegram readiness, and response status.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/sensor-fusion-dashboard.png" width="800"><br/>
  <i>Live MYOSA sensor fusion dashboard combining environment, motion, posture, gesture, fall signature, and risk stream.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/architecture.png" width="800"><br/>
  <i>System architecture connecting MYOSA hardware, firmware, Python intelligence layer, dashboard, event storage, and Telegram escalation.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/sensor-fusion-flow.png" width="800"><br/>
  <i>Sensor fusion flow showing how multiple MYOSA signals are processed into explainable emergency intelligence.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/risk-state-model.png" width="800"><br/>
  <i>Risk state model used to classify normal monitoring, watch conditions, warnings, and emergency escalation.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/decision-matrix.png" width="800"><br/>
  <i>Explainable decision matrix showing environment stress, motion/posture signature, manual distress, and fusion confidence.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/environment-graph.png" width="800"><br/>
  <i>Real-time environment stream combining temperature, humidity, and air-quality context.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/motion-physiology-graph.png" width="800"><br/>
  <i>Motion physiology stream tracking movement, tilt, and pressure-related context for emergency interpretation.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/myosa-hardware-stack.jpg" width="800"><br/>
  <i>Physical MYOSA hardware stack with live embedded response indicator.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/myosa-hardware-oled.jpg" width="800"><br/>
  <i>MYOSA device running Sanjeevani AI with OLED monitoring output and local LED status.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/myosa-hardware-angle.jpg" width="800"><br/>
  <i>Compact embedded prototype showing the sensing and response unit during live operation.</i>
</p>

<p align="center">
  <img src="/assets/images/sanjeevani/telegram-escalation.jpg" width="800"><br/>
  <i>Telegram alert bot supporting status checks, latest fused packet review, emergency history, simulation control, and incident resolution.</i>
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/WR_knAqnQyA"></iframe>
</div>

---

## Features (Detailed)

### 1. MYOSA sensor fusion

Sanjeevani AI uses MYOSA sensor channels as a combined emergency-awareness layer. It interprets temperature, humidity, air quality, motion, posture, pressure, gesture, and fall-like behavior together.

This makes the project stronger than a simple sensor logger. The system does not only ask, “Is one value high?” It asks, “What is changing, which sensors agree, and does the situation look unsafe when viewed as a full context?”

### 2. Unified emergency risk score

The dashboard converts the fused sensor stream into a clear 0–100 emergency risk score.

Risk levels are interpreted as:

* **0–24:** SAFE  
* **25–49:** WATCH  
* **50–74:** WARNING  
* **75–100:** EMERGENCY  

This makes the system easy to understand during a live demonstration. Judges can immediately see whether the environment is normal, slightly concerning, warning-level, or emergency-level.

### 3. Explainable intelligence instead of black-box alerts

Sanjeevani AI provides reason codes and incident summaries. The dashboard explains why the risk changed instead of only showing numbers.

Example reasons include:

* normal baseline
* environmental stress
* air-quality rise
* motion/posture signature
* fall candidate
* fall confirmed
* SOS gesture
* multi-sensor risk
* low sensor confidence

This makes the system transparent and useful for real-world decision support.

### 4. Fall-signature detection

A fall is not treated as only one sudden movement. Sanjeevani AI looks at a sequence of signals:

1. motion disturbance  
2. posture or tilt change  
3. pressure or orientation context  
4. reduced activity after the event  
5. recovery or non-recovery behavior  

This improves the quality of fall interpretation and reduces the chance of a random motion spike being treated as a confirmed emergency.

### 5. Incident story

The dashboard includes an incident story panel that turns raw sensor values into human-readable interpretation.

For example, instead of only displaying temperature, motion, pressure, and risk, the dashboard can show whether the current situation is a safe baseline, an early warning, or a combined sensor concern.

This allows a viewer to understand the emergency reasoning quickly.

### 6. Decision matrix

The decision matrix breaks the system’s reasoning into four important categories:

* environment stress
* motion/posture signature
* manual distress
* fusion confidence

This helps demonstrate that Sanjeevani AI is not just reacting to one number. It is weighing multiple signals to decide whether attention is needed.

### 7. Sensor confidence

Real sensor systems may experience missing values, noisy readings, or changing hardware behavior. Sanjeevani AI displays sensor confidence so the user knows how much of the sensor network is contributing to the final decision.

This makes the system more honest and reliable. A lower-confidence condition can be treated differently from a high-confidence emergency.

### 8. Local embedded feedback

The MYOSA device provides local status through OLED and LED output. The OLED shows the current monitoring state, risk level, temperature, pressure, tilt, and normal/emergency status.

A buzzer-ready response path is also included for audible emergency escalation.

### 9. Telegram emergency communication

Sanjeevani AI includes a Telegram alert bot for remote monitoring and emergency communication.

Supported commands include:

```plaintext
/start
/status
/last
/emergencies
/resolve
/simulate normal
/simulate warning
/simulate emergency
/help
```

The bot allows a caregiver, teammate, or evaluator to check system status without opening the dashboard.

### 10. Dashboard experience

The dashboard is designed as a polished emergency intelligence command center. It includes:

* live state badge
* unified risk score
* confidence ring
* incident story
* environment graph
* motion physiology graph
* decision matrix
* sensor cards
* Telegram escalation status
* response readiness
* mobile-friendly layout

The visual design uses a clean off-white, orange, green, and neutral palette so it feels modern, readable, and presentation-ready.

### 11. Why this solution matters

Many existing safety systems are limited:

* panic buttons require the person to be conscious and able to press them
* wearables depend on user compliance and battery life
* air-quality monitors detect only one kind of issue
* basic fall alarms can be noisy or reactive
* generic IoT dashboards show values but do not explain risk

Sanjeevani AI combines embedded sensing, contextual fusion, explainable scoring, local response, dashboard visualization, and Telegram communication into one integrated emergency intelligence system.

---

## Usage Instructions

### Hardware demonstration

1. Power the MYOSA Mini IoT Kit and connected response indicators.
2. Confirm the OLED display shows monitoring status.
3. Start the backend system.
4. Open the dashboard in a browser.
5. Observe live fused readings and risk state.
6. Demonstrate normal baseline behavior.
7. Demonstrate movement, posture, environmental, or gesture-based changes.
8. Watch the dashboard update risk, graph streams, incident story, and decision matrix.
9. Use the Telegram bot to check status, latest packet, emergency history, or resolution state.

### Run command

```bash
python dashboard/backend/server.py
```

### Windows setup example

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements_global.txt
python dashboard/backend/server.py
```

### Hardware serial configuration example

```powershell
$env:SANJEEVANI_PORT="COM11"
$env:SANJEEVANI_BAUD="115200"
python dashboard/backend/server.py
```

### Telegram configuration example

```powershell
$env:TELEGRAM_BOT_TOKEN="your_private_bot_token"
$env:TELEGRAM_CHAT_ID="your_private_chat_id"
python dashboard/backend/server.py
```

Private tokens, chat IDs, Wi-Fi credentials, and environment files should not be uploaded to public repositories.

---

## Tech Stack

* **MYOSA Mini IoT Kit** for embedded sensing and physical response
* **ESP32 Arduino firmware** for sensor reading, filtering, OLED output, LED response, and serial stream
* **Python** for backend logic, simulation, event handling, and Telegram communication
* **Flask** for REST API support
* **Socket.IO** for real-time dashboard updates
* **SQLite** for local reading and emergency event storage
* **HTML, CSS, and JavaScript** for the live dashboard
* **Telegram Bot API** for remote status and emergency communication
* **Synthetic scenario streams** for reliable evaluation and demonstration

---

## Requirements / Installation

Recommended Python setup:

```bash
pip install flask flask-socketio pyserial requests python-dotenv
```

For the complete local project setup:

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements_global.txt
```

For firmware upload, open the Arduino sketch, select the correct ESP32 board and serial port, then upload it to the MYOSA-connected ESP32 device.

---

## File Structure

```plaintext
sanjeevani-ai/
├── sanjeevani-ai.md
├── sanjeevani-ai-final-video.mp4
├── cover-dashboard.png
├── sensor-fusion-dashboard.png
├── architecture.png
├── sensor-fusion-flow.png
├── risk-state-model.png
├── decision-matrix.png
├── environment-graph.png
├── motion-physiology-graph.png
├── myosa-hardware-stack.jpg
├── myosa-hardware-oled.jpg
├── myosa-hardware-angle.jpg
└── telegram-escalation.jpg
```

---

## License

This project is submitted for educational and innovation showcase purposes under the MYOSA Event 5.0 context.

All included dashboard screenshots and hardware photographs are original project materials from Team Sanjeevini AI.

---

## Contribution Notes

Future improvements may include multi-room monitoring, caregiver mobile dashboards, cloud-based incident history, smarter calibration, larger real-world datasets, machine-learning-assisted risk tuning, and structured validation in assisted living, campus safety, and smart building environments.

The core principle should remain the same: explainable MYOSA sensor fusion for predictive emergency intelligence.
