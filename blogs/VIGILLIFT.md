---
publishDate: 2026-05-22

title: VigilLift

excerpt: AI-powered smart elevator safety monitoring system using MYOSA ESP32 and intelligent sensor fusion.

image: vigillift/setup.jpeg

tags:
- iot
- esp32
- safety
- elevator
- myosa
---

> Smart AI-powered elevator emergency monitoring platform.

---

# Overview

VigilLift is a smart elevator safety monitoring platform developed using the MYOSA ESP32 ecosystem.

The system continuously monitors:
- acceleration
- altitude
- vibrations
- proximity
- emergency conditions

using:
- MPU6050
- BMP180
- APDS9960

The project detects:
- Free Fall
- Sudden Stop
- Door Obstruction
- Irregular Vibrations

A live monitoring dashboard is also developed for real-time analytics and predictive maintenance.

---

# Demo / Examples

## Images

<p align="center">

<img src="/assets/images/vigillift/setup.jpeg" width="700"><br>
<i>Complete hardware setup</i>

</p>

<p align="center">

<img src="/assets/images/vigillift/dashboard.png" width="700"><br>
<i>Live monitoring dashboard</i>

</p>

<p align="center">

<img src="/assets/images/vigillift/eventlog.png" width="700"><br>
<i>Real-time event logging system</i>

</p>

<p align="center">

<img src="/assets/images/vigillift/team.jpeg" width="700"><br>
<i>Project development team</i>

</p>

---

## Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/9OzGMFfDryE"></iframe>
</div>

---

# Features (Detailed)

## Free Fall Detection

Detects dangerous downward acceleration using MPU6050 sensor data.

## Sudden Stop Detection

Identifies abnormal braking or sudden elevator stopping conditions.

## Door Obstruction Monitoring

Uses APDS9960 proximity sensor to detect nearby obstacles.

## Irregular Vibration Analysis

Continuously analyzes vibration patterns for predictive maintenance.

## Real-Time Monitoring Dashboard

Displays:
- acceleration
- altitude
- temperature
- alerts
- analytics
- live system status

in real time.

---

# Usage Instructions

1. Connect sensors to MYOSA ESP32.
2. Upload Arduino code using Arduino IDE.
3. Power using USB Type-C.
4. Open OLED dashboard and live server.
5. Simulate elevator emergency conditions.

---

# Tech Stack

- ESP32
- Arduino IDE
- HTML
- CSS
- JavaScript
- Chart.js
- MPU6050
- BMP180
- APDS9960
- OLED Display

---

# Requirements / Installation

```bash
Install Arduino Libraries:

Adafruit MPU6050
Adafruit BMP280
Adafruit SSD1306
Adafruit GFX
Wire Library
```

---

# File Structure

```text
vigillift/
│
├── README.md
├── vigillift-demo.mp4
├── vigillift.ino
│
└── assets/
    └── images/
        └── vigillift/
```

---

# Contribution Notes

Developed for the MYOSA 5.0 innovation event.
