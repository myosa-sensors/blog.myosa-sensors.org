
---
publishDate: 2025-05-23T00:00:00Z
title: EcoFlame – Smart LPG Optimization and Safety System
excerpt: A non-invasive IoT module built on the Myosa 5.0 platform that monitors flame health, knob position, and vessel presence on any gas stove to prevent LPG wastage and ensure kitchen safety.
image: ecoflame/ecoflame-cover.jpg
tags:
  - IoT
  - Energy Conservation
  - Smart Home
  - ESP32
  - Myosa
---

> EcoFlame turns your existing gas stove into a smart, efficient, and safety-aware cooking station — no plumbing, no gas-line modifications, just clip it on and cook smarter.

---

## Acknowledgements

We express our sincere gratitude to our Faculty Mentor, Prof. Sreeram M, for his guidance and support throughout this project. We thank our department and institution for providing the necessary resources and encouragement.
We also appreciate the IEEE MYOSA Event 5.0 organizers for offering this valuable platform to promote innovation and practical learning.
Finally, we thank our team members for their dedication and teamwork, which contributed greatly to the successful completion of this project.


## Overview

With the ongoing global energy crisis and severe disruptions to LPG supply chains, conserving cooking gas is no longer just an environmental choice — it is an economic necessity. A significant amount of LPG is wasted daily in households due to three main factors:

* **Inefficient Combustion** — dirty burners produce yellow or orange flames, wasting gas and delivering less heat than a clean blue flame
* **Idle Burning** — stoves left running when no cooking vessel is present
* **Over-firing** — cooking on HIGH flame when SIMMER would suffice, causing heat to escape around the sides of the vessel

EcoFlame is an adaptable, **non-invasive IoT module** that retrofits onto existing gas stoves without any modifications to gas pipes or cylinders. It monitors flame health, knob position, and vessel presence in real time, then delivers feedback through a local OLED display and a cloud-connected Blynk IoT dashboard on your phone.

**Key Features:**

* Real-time flame color analysis — classifies combustion quality as BLUE, YELLOW, ORANGE, RED, or ERRATIC
* 3-point startup calibration — learns your specific stove's knob angles automatically
* Vessel detection using ambient light sensing — detects whether a pot is present
* Gas Efficiency Score (0–100) updated live on the Blynk dashboard
* Cooking session timer with session summary pushed to the app at end of each cook
* Five safety alerts — gas waste, flame-out, flame quality, long idle, and overheat
* 60-second snooze system — dismiss alerts from the app with auto-reinstatement
* WiFi reconnection watchdog — system remains functional during connectivity drops

---

## Demo / Examples

### **Images**

<p align="center">
  <img src="assets/images/ecoflame/ecoflame-cover.jpg" width="500"><br/>
  <i>EcoFlame module mounted on a gas stove — OLED display showing live flame status</i>
</p>

<p align="center">
  <img src="assets/images/ecoflame/ecoflame-oled-screens-1.jpg" width="500">
</p>
<p align="center">
  <img src="assets/images/ecoflame/ecoflame-oled-screens-2.jpg" width="500">
</p>  
<p align="center">
  <img src="assets/images/ecoflame/ecoflame-oled-screens-3.jpg" width="500"><br/>
  <i>OLED display states — Standby, Cooking in Progress, Flame Alert, and Gas Waste Alert</i>
</p>  

<p align="center">
  <img src="assets/images/ecoflame/ecoflame-blynk-dashboard.jpg" width="500"><br/>
  <i>Blynk IoT mobile dashboard showing knob state, flame health, efficiency gauge, and cook timer</i>
</p>

<p align="center">
  <img src="assets/images/ecoflame/ecoflame-calibration-1.jpg" width="500"><br/>
</p>
<p align="center">
  <img src="assets/images/ecoflame/ecoflame-calibration-2.jpg" width="500"><br/>
</p>
<p align="center">
  <img src="assets/images/ecoflame/ecoflame-calibration-3.jpg" width="500"><br/>
  <i>3-point startup calibration sequence guiding the user through OFF, HIGH, and SIMMER positions</i>
</p>

### **Videos** 

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/3kzqVvxB8lA"></iframe>
</div>

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/YVw4A-0kMGU"></iframe>
</div>


## Features (Detailed)

### **1. Flame Color Analysis**

The APDS9960 RGB color sensor is positioned near the burner base and reads the spectral composition of the flame in real time. Raw R, G, B values are **normalised by the clearLight channel** to eliminate the effect of ambient brightness and flame intensity variation, ensuring consistent readings regardless of kitchen lighting conditions.

```
rNorm = R / clearLight
gNorm = G / clearLight
bNorm = B / clearLight
greenToRedRatio = gNorm / rNorm
```

| Flame Classification | Condition | Meaning |
|---|---|---|
| BLUE (OPTIMAL) | bNorm dominant | Complete, efficient combustion |
| YELLOW (SOOT/WASTE) | rNorm dominant, ratio > 0.65 | Carbon soot — clean burner |
| ORANGE (INEFFICIENT) | rNorm dominant, ratio 0.30–0.65 | Partial combustion |
| RED (IMPURITY/DANGER) | rNorm dominant, ratio < 0.30 | Gas impurity or blockage |
| ERRATIC COLOR | No channel dominant | Unstable or disturbed flame |
| NO FLAME | clearLight ≤ 10 | No combustion detected |

The sensor operates in **time-multiplexed mode** — color and proximity functions alternate each loop cycle to prevent IR LED bleed-through corrupting RGB readings. LED drive current is held at 25mA during color mode to further reduce interference.

---

### **2. Knob Position Tracking — 3-Point Startup Calibration**

The MPU6050 accelerometer is mounted flat on the stove knob. It uses `atan2(Y, X)` to compute the knob's rotational angle in the horizontal plane. Because every gas stove model has different physical angle ranges, EcoFlame runs a **3-point calibration at every boot** that learns the exact angles for that specific stove.

**Calibration Sequence (guided on OLED):**

```
Boot → Hold at OFF position  → 20 readings averaged → baseAngle stored
     → Turn to HIGH position → 20 readings averaged → angleHigh stored
     → Turn to SIMMER        → 20 readings averaged → angleSimmer stored
```

At runtime, a **rolling average of 5 samples** smooths MPU6050 noise from ±30° down to approximately ±6°. A **closest-wins algorithm** then compares the smoothed angle against all three calibrated targets — whichever is nearest determines the current knob state. This eliminates dead zones and requires no manual threshold tuning.

<p align="center">
  <img src="assets/images/ecoflame/ecoflame-knob-calibration-serial.jpg" width="800"><br/>
  <i>Serial Monitor showing calibration output — OFF, HIGH, and SIMMER angles recorded at startup</i>
</p>

---

### **3. Vessel Detection**

Instead of the standard APDS9960 proximity engine (which proved unreliable at the low LED currents required for color accuracy), EcoFlame detects cooking vessels using the **clearLight ambient light channel**. A pot placed over the sensor physically blocks ambient kitchen light, causing clearLight to drop sharply.

| Condition | clearLight Reading |
|---|---|
| No vessel — open kitchen | 300 – 800 |
| Pot placed over sensor | 0 – 20 |

A **3-second debounce timeout** prevents false negatives from brief interruptions such as steam or a hand passing over the sensor. The threshold can be tuned per kitchen environment.

---

### **4. Gas Efficiency Score**

EcoFlame calculates a **real-time efficiency score from 0 to 100** by combining flame quality, knob state, and ambient temperature. The score drives a Blynk gauge widget and is stored at the end of each cooking session.

| Penalty Condition | Deduction |
|---|---|
| YELLOW flame | –25 points |
| ORANGE flame | –15 points |
| RED flame | –35 points |
| ERRATIC flame | –30 points |
| HIGH knob with pot | –10 points (over-firing) |
| HIGH knob without pot | –40 points (maximum waste) |
| Ambient temp above 45°C | –10 points |
| Stove OFF | Always 100 — no penalty |

Maximum worst-case penalty: RED + HIGH no-pot + overheating = 85 points deducted → minimum possible score is **15**. Score is never negative.

---

### **5. Cooking Session Tracking**

EcoFlame tracks each continuous cooking session from knob-on to knob-off. The **live cook timer** is displayed on the OLED during active cooking. When the stove is turned off, a session summary is immediately pushed to Blynk:

* **V8** — Last session efficiency score (0–100)
* **V9** — Last session duration in minutes

The OLED standby screen displays the last session score alongside system uptime, giving the user immediate post-cooking feedback without opening the phone app.

---

### **6. Safety Alert System**

EcoFlame has five independently debounced alert conditions. Each uses a dedicated boolean flag ensuring `logEvent` is called only once per incident and not on every loop iteration. All alerts send push notifications to the Blynk mobile app.

| Alert | Level | Trigger Condition |
|---|---|---|
| `overheat_alert` | Critical | BMP180 reads above 60°C — hysteresis resets below 52°C |
| `gas_waste` | Warning | Knob ON, no vessel detected |
| `long_idle` | Warning | Knob HIGH, no vessel, over 45 minutes |
| `flame_out` | Critical | Knob ON, pot present, flame = NO FLAME (gas without combustion) |
| `flame_quality` | Warning | Flame classified as YELLOW, ORANGE, RED, or ERRATIC |

**Flame-out detection** is the most critical safety feature — it catches the scenario where the flame extinguishes mid-cook while the knob is still on, meaning raw gas is escaping into the kitchen.

---

### **7. Snooze & Acknowledge System**

The user can dismiss any active alert from the Blynk app using the V4 button widget:

1. User taps **Dismiss Alert** button in Blynk app
2. OLED switches from `ALERT!` to `MUTED`
3. Blynk V3 status label updates to `MUTED BY USER`
4. A **60-second snooze timer** starts automatically
5. After 60 seconds, the alert automatically reinstates — V4 button resets to OFF remotely via `Blynk.virtualWrite(V4, 0)`

The V4 button must be set to **Switch mode** (not Push mode) in the Blynk app for the remote visual reset to work correctly.

---

### **8. OLED Display Screens**

| Screen State | Content |
|---|---|
| Calibration (boot) | 3-point guide with countdown: OFF → HIGH → SIMMER |
| Standby (stove OFF) | STOVE OFF, EcoFlame Active, Uptime, Last Score, System Nominal |
| Cooking — healthy flame | Knob state, Cooking in progress, Flame: HEALTHY BLUE, session time |
| Cooking — flame alert | Knob state, FLAME ALERT, flame type detected, Clean Burner Ports! |
| Waste alert — active | ALERT!, Stove is ON!, NO POT DETECTED, WASTING GAS |
| Waste alert — muted | MUTED, Alert Acknowledged |
| Overheat | OVERHEAT!, current temperature in °C, TURN OFF STOVE NOW |
| WiFi lost | WiFi Lost, Reconnecting... |

---

### **9. Blynk IoT Cloud Dashboard**

All virtual writes are throttled to one update every 3 seconds to stay within Blynk Free tier rate limits. The overheat block has its own separate throttled write to ensure the dashboard never freezes during a critical event.

| Virtual Pin | Widget | Description |
|---|---|---|
| V1 | Label | Live knob state — OFF / HIGH / SIMMER |
| V2 | Label | Live flame status |
| V3 | Label | System alert status |
| V4 | Button (Switch) | Dismiss alert — auto-resets after 60 seconds |
| V5 | Gauge (0–100) | Live efficiency score |
| V6 | Label | Active session cooking time in minutes |
| V8 | Label | Last session efficiency score |
| V9 | Label | Last session duration in minutes |

---

## Usage Instructions

### **Step 1 — Hardware Assembly**

Mount the components on your gas stove:

```plaintext
1. Attach MPU6050 flat on top of the gas stove knob (parallel to surface)
2. Position APDS9960 near the burner base, facing the flame
3. Mount OLED display on the kitchen wall or stove backsplash
4. Place BMP180 near the stove at ambient air height (not near direct heat)
5. Connect all sensors to the Myosa 5.0 motherboard via I2C (SDA/SCL)
```

### **Step 2 — Configure WiFi and Blynk Credentials**

Open `ecoflame.ino` and update the following lines at the top:

```cpp
#define BLYNK_TEMPLATE_ID   "YOUR_TEMPLATE_ID"
#define BLYNK_TEMPLATE_NAME "EcoFlame"
#define BLYNK_AUTH_TOKEN    "YOUR_AUTH_TOKEN"

char ssid[] = "YOUR_WIFI_SSID";
char pass[] = "YOUR_WIFI_PASSWORD";
```

### **Step 3 — Set Up Blynk Console**

Create a new template in the Blynk Console and add the following datastreams:

```plaintext
V1  — String   — Knob State
V2  — String   — Flame Status
V3  — String   — Alert Status
V4  — Integer  — Dismiss Button
V5  — Double   — Efficiency Score  (min: 0, max: 100)
V6  — Integer  — Cook Time         (min: 0, max: 300)
V8  — Double   — Last Session Score
V9  — Integer  — Last Session Mins
```

Add the following events in **Blynk Console → Template → Events** with Push Notification enabled:

```plaintext
overheat_alert  → Critical → Push ON  → Limit: 1/hour
gas_waste       → Warning  → Push ON  → Limit: 1/hour
long_idle       → Warning  → Push ON  → Limit: 1/hour
flame_out       → Critical → Push ON  → Limit: 1/hour
flame_quality   → Warning  → Push ON  → Limit: 1/hour
```

### **Step 4 — Upload Firmware**

```plaintext
1. Open Arduino IDE
2. Install board: ESP32 by Espressif Systems (Board Manager)
3. Install required libraries (see Requirements section below)
4. Select board: ESP32 Dev Module
5. Select correct COM port
6. Upload ecoflame.ino
```

### **Step 5 — Startup Calibration**

Every time the device powers on, it runs the 3-point knob calibration. Follow the OLED prompts:

```plaintext
1. "Hold knob at OFF — Recording in 3s..."
   → Hold the knob firmly at the OFF position and wait

2. "Turn knob to HIGH — Recording in 4s..."
   → Turn the knob fully to the HIGH flame position and hold

3. "Turn to SIMMER/LOW — Recording in 4s..."
   → Turn the knob to the minimum (SIMMER) position and hold

4. "Calibration done! System Ready."
   → System is now live
```

### **Step 6 — Tune Vessel Detection Threshold**

Uncomment the debug line in the code and open Serial Monitor at 115200 baud:

```cpp
// Uncomment this line temporarily:
Serial.print("clearLight: "); Serial.println(clearLight);
```

Note the `clearLight` value with no pot and with a pot placed over the sensor. Set the threshold to roughly halfway between the two values:

```cpp
if (clearLight < YOUR_THRESHOLD) {  // default is 20 — adjust here
  isPotPresent = true;
}
```

Re-comment the debug line after tuning.

---

## Tech Stack

* **Microcontroller** — ESP32 Dev Module
* **Firmware Framework** — Arduino (C++)
* **Cloud Platform** — Blynk IoT (Free Tier)
* **Sensor Platform** — Myosa 5.0 Mini-Kit
* **Sensors** — APDS9960 (RGB + Proximity), MPU6050 (Accelerometer/Gyro), BMP180 (Temperature/Pressure)
* **Display** — SSD1306 OLED 128×64 via I2C
* **Connectivity** — WiFi (WPA2) via BlynkSimpleEsp32

---

## Requirements / Installation

### Arduino IDE Library Installation

Install all required libraries via **Arduino IDE → Sketch → Include Library → Manage Libraries**:

```plaintext
Blynk                   by Volodymyr Shymanskyy
Adafruit APDS9960       by Adafruit
Adafruit MPU6050        by Adafruit
Adafruit BMP085 Unified by Adafruit
Adafruit SSD1306        by Adafruit
Adafruit GFX Library    by Adafruit
Adafruit Unified Sensor by Adafruit
```

### Board Manager

Install ESP32 support in Arduino IDE:

```plaintext
File → Preferences → Additional Board Manager URLs →
Add: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json

Tools → Board → Boards Manager → Search "ESP32" → Install "ESP32 by Espressif Systems"
```

### Board Settings

```plaintext
Board:            ESP32 Dev Module
Upload Speed:     921600
CPU Frequency:    240MHz
Flash Frequency:  80MHz
Flash Mode:       QIO
Partition Scheme: Default 4MB with spiffs
```

---


## Contribution Notes

Contributions, suggestions, and improvements are welcome.

**To contribute:**

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: description of change"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

**Areas open for contribution:**

* Flame classification model using TensorFlow Lite Micro for improved accuracy under varying kitchen lighting
* Telegram Bot integration as an alternative to Blynk notifications (unlimited free messages)
* Gas consumption estimation model using knob position + flame quality + session duration
* Support for multi-burner stoves with multiple MPU6050 instances on different I2C addresses

**Issues and bug reports** can be raised via the GitHub Issues tab. Please include your Serial Monitor output and a description of your stove model and kitchen setup.
