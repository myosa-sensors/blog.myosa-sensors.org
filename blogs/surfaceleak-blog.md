# SurfaceLeak — Non-Invasive Subsurface Pipe Leak Detector

*IEEE MYOSA Event 6.0 — MakeSense EduTech Submission*

A surface-mounted sensor node that hears, feels, and sees underground pipe leaks — without a single shovel of dirt moved. Four sensors, one probability score, one buzzer.

**Platform:** MYOSA · ESP32
**Cost:** Under ₹3,000
**Access required:** None — road surface only
**Published:** 25 Aug 2026

---

## By the numbers

| | |
|---|---|
| **40–60%** | of piped water lost to underground leaks in Indian cities before it reaches a tap |
| **₹20,000cr** | estimated annual value of that lost water, across the country, every year |
| **₹2–5L** | cost of a professional acoustic correlator — the current standard tool for finding a leak |

---

## The Problem

### Leaks stay invisible until the road caves in

A cracked pipe two feet under a road gives almost no surface sign — until the soil around it washes out and the surface finally gives way. By then the fix is a full excavation. Finding the leak earlier usually means calling in a technician with an acoustic correlator: effective, but expensive, and out of reach for most municipal budgets and neighbourhood-scale monitoring.

---

## How It Works

### Four sensors, read from the surface

SurfaceLeak doesn't listen for one thing — it cross-checks four independent physical signatures that a pressurised leak leaves behind, so a passing truck or a hot afternoon doesn't trip a false alarm.

**CH.01 — Primary: Proximity** `APDS-9960`
Detects the soil surface shift as ground saturates and settles above a leak — the strongest single indicator.

**CH.02 — Secondary: Vibration** `MPU-6050`
Picks up the faint, continuous ground-coupled hum of water escaping a pressurised main.

**CH.03 — Environment: Temperature & Pressure** `BMP180`
Tracks ambient conditions so the system's baseline can be understood in context, not in isolation.

**CH.04 — Display: Live Dashboard** `SSD1306`
Shows every reading and the combined Leak Probability Score in the field, with no phone or app needed.

---

## The Score

### Two signals, weighted into one number

Proximity carries the most weight because it's the most direct evidence of surface disturbance. Vibration confirms it. Together they produce the Leak Probability Score shown live on the OLED.

```
LPS = (0.55 × proximity_dev)
    + (0.45 × vibration_dev)
```

- **PROX** — 55% weight
- **VIB** — 45% weight

---

## Field Display

### Watch it change state

A live replica of the 0.96" OLED cycles through calibration, a normal reading, and a confirmed leak alert — exactly as it runs in the field. Sample readings across that cycle:

| State | Vib | Temp | Pressure | Prox | Leak Score |
|---|---|---|---|---|---|
| Calibrating | 0.00 g | 28.2 C | 1004 hPa | 3 mm | 0% |
| Normal | 0.02 g | 28.4 C | 1004 hPa | 4 mm | 12% |
| Normal | 0.03 g | 28.5 C | 1003 hPa | 5 mm | 18% |
| Watch | 0.09 g | 28.7 C | 1003 hPa | 11 mm | 47% |
| Alert | 0.14 g | 28.9 C | 1002 hPa | 17 mm | 63% |
| Alert | 0.16 g | 29.0 C | 1002 hPa | 19 mm | 71% |
| Normal | 0.02 g | 28.6 C | 1003 hPa | 4 mm | 15% |

*SSD1306 · 128×64 · I2C · refreshed every 800ms*

---

## Alert Logic

### Two consecutive readings before it trusts itself

A single spike — a footstep, a passing car — isn't enough to sound the buzzer. The score has to hold above threshold for two readings in a row, roughly 1.6 seconds, before SurfaceLeak commits to an alert.

| Score Range | State | What Happens |
|---|---|---|
| 0 – 39% | 🟢 NORMAL | Baseline readings, no action |
| 40 – 54% | 🟡 WATCH | Elevated score, display flags it, no buzzer yet |
| 55%+ for 2 reads | 🔴 ALERT | Buzzer on GPIO26 fires until score drops back down |

---

## Hardware — The Build

The MYOSA sensor stack, mounted above a demo rig: a buried, punctured PVC pipe in a sand-filled container, standing in for a real underground main.

![SurfaceLeak hardware with OLED showing normal operation](images/photo-1.jpeg)
*SurfaceLeak node — MYOSA sensor stack with normal OLED reading*

![SurfaceLeak OLED showing leak alert](images/photo-2.jpeg)
*Confirmed leak alert — OLED display*

![SurfaceLeak underground pipe leak demonstration rig](images/photo-3.jpeg)
*Prototype demonstration rig — sensor stack above a buried leaking pipe*

---

## Video Demo

### SurfaceLeak in operation

Prototype demonstration of the SurfaceLeak sensor setup and leak-detection system.

📹 [Watch the video demo](video/video-1.mp4) *(SurfaceLeak prototype demonstration)*

---

## Tech Stack

| | |
|---|---|
| **Microcontroller** | ESP32 — MYOSA RJCSILP-0 |
| **Sensors** | MPU-6050, BMP180, APDS-9960, SSD1306 |
| **Bus** | I2C |
| **Firmware** | Arduino framework (C++) |
| **Libraries** | Adafruit SSD1306 / GFX / BMP085 |
| **Alert** | Active buzzer, GPIO26 |
| **Power** | USB 5V or Li-ion |
| **Unit Cost** | Under ₹3,000 |

---

## Getting It Running

### Flash it in six steps

1. Install `Arduino IDE 2.x` and add the ESP32 board package URL in Preferences.
2. Select board `ESP32 Dev Module`, the correct COM port, and Flash Mode `DIO`.
3. Install `Adafruit SSD1306`, `Adafruit GFX`, and `Adafruit BMP085` via Library Manager.
4. Wire the MYOSA sensor modules in a stacking I2C chain, then connect the buzzer module.
5. Upload `SurfaceLeak.ino` and open the Serial Monitor at `115200` baud.
6. Press `EN/RST` to trigger the 1-second, 10-reading baseline calibration, then let it run.

---

## Acknowledgements

Built by **Team Parallel Minds**, B.Tech Electronics & Communication Engineering, Kerala, India — for IEEE MYOSA Event 6.0, hosted by MakeSense EduTech. Thanks to the MYOSA platform for the sensor kit that made this build possible.

*SurfaceLeak — Non-Invasive Subsurface Pipe Leak Detector*
*MYOSA · ESP32 · I2C sensor fusion*
