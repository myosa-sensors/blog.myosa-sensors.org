---
publishDate: 2026-08-25
title: SurfaceLeak — Non-Invasive Subsurface Pipe Leak Detector
excerpt: A surface-mounted MYOSA sensor node that detects underground pipe leaks using multi-modal physical sensing — no excavation, no pipe access, no expertise required.
image: /assets/images/hydronova/1.png
tags:
  - IoT
  - Sensor Fusion
  - Water Infrastructure
  - ESP32
  - MYOSA
---

> Detecting invisible underground leaks from the surface — before they become sinkholes.[cite: 4]

## Acknowledgements

Built by **Team Parallel Minds** — B.Tech Electronics & Communication Engineering, Kerala, India[cite: 4, 5]. Submitted to **IEEE MYOSA Event 6.0**, MakeSense EduTech[cite: 4, 5]. Special thanks to the MYOSA platform for providing the sensor kit that made this project possible[cite: 4, 5].

---

## Overview

Cities across India lose **40–60% of piped water** to underground leaks before it reaches a tap — an annual loss exceeding ₹20,000 crore[cite: 4, 5]. Current detection methods require expensive professional acoustic correlators (₹2–5 lakh), trained technicians, and often full road excavation[cite: 4, 5]. A cracked pipe two feet under a road gives almost no surface sign until the soil washes out and the surface caves in[cite: 5].

**SurfaceLeak** is a low-cost sensor node (under ₹3,000) built on the MYOSA platform[cite: 4, 5]. It detects subsurface pipe leaks using four independent physical signal channels read entirely from the road surface, with no pipe access or digging required[cite: 4, 5]. 

### Key Features

- **APDS-9960 proximity sensor:** Primary leak indicator that detects soil surface displacement above a saturated zone[cite: 4, 5].
- **MPU-6050 accelerometer:** Secondary indicator that detects ground-coupled pipe vibration from a pressurised leak[cite: 4, 5].
- **BMP180 barometric sensor:** Monitors environmental temperature and pressure to understand baselines in context[cite: 4, 5].
- **Live OLED dashboard (SSD1306):** Shows VIB, TEMP, PRES, PROX, and Leak Probability Score live in the field without the need for an app[cite: 4, 5].
- **Active buzzer alert:** Triggers when the leak score exceeds the threshold for 2 consecutive readings[cite: 4, 5].
- **Weighted sensor fusion:** 55% proximity + 45% vibration[cite: 4, 5].
- **No excavation, no pipe access, no internet, no technical expertise required**[cite: 4, 5].

---

## The Score

SurfaceLeak cross-checks independent physical signatures so environmental factors (like passing trucks) don't trigger false alarms[cite: 5]. Proximity carries the most weight because it is the most direct evidence of surface disturbance, while vibration confirms it[cite: 5]. 

LPS = (0.55 × proximity_dev) + (0.45 × vibration_dev)[cite: 4, 5]

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/hydronova/1.png" width="800"><br/>
  <i>SurfaceLeak node — MYOSA sensor stack with normal OLED reading</i>[cite: 4, 5]
</p>

<p align="center">
  <img src="/assets/images/hydronova/2.png" width="800"><br/>
  <i>Confirmed leak alert — OLED display</i>[cite: 4, 5]
</p>

<p align="center">
  <img src="/assets/images/hydronova/3.jpg" width="800"><br/>
  <i>Prototype demonstration rig — sensor stack above a buried leaking pipe</i>[cite: 4, 5]
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/Vp7s4oE-0JM"></iframe>
</div>

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/Re2y4SnDF70"></iframe>
</div>

### Alert Logic

A single spike isn't enough to sound the buzzer[cite: 5]. The score must hold above threshold for two consecutive readings (roughly 1.6 seconds) before SurfaceLeak commits to an alert[cite: 5].

| Score Range | State | What Happens |
|---|---|---|
| 0 – 39% | 🟢 NORMAL | Baseline readings, no action[cite: 5] |
| 40 – 54% | 🟡 WATCH | Elevated score, display flags it, no buzzer yet[cite: 5] |
| 55%+ for 2 reads | 🔴 ALERT | Buzzer on GPIO26 fires until score drops back down[cite: 5] |

---

## Tech Stack

* **Microcontroller:** ESP32 — MYOSA RJCSILP-0[cite: 5]
* **Sensors:** MPU-6050, BMP180, APDS-9960, SSD1306[cite: 5]
* **Bus:** I2C[cite: 5]
* **Firmware:** Arduino framework (C++)[cite: 5]
* **Libraries:** Adafruit SSD1306 / GFX / BMP085[cite: 5]
* **Alert:** Active buzzer, GPIO26[cite: 5]

---

## Getting It Running

1. Install `Arduino IDE 2.x` and add the ESP32 board package URL in Preferences[cite: 5].
2. Select board `ESP32 Dev Module`, the correct COM port, and Flash Mode `DIO`[cite: 5].
3. Install `Adafruit SSD1306`, `Adafruit GFX`, and `Adafruit BMP085` via Library Manager[cite: 5].
4. Wire the MYOSA sensor modules in a stacking I2C chain, then connect the buzzer module[cite: 5].
5. Upload `SurfaceLeak.ino` and open the Serial Monitor at `115200` baud[cite: 5].
6. Press `EN/RST` to trigger the 1-second, 10-reading baseline calibration, then let it run[cite: 5].
