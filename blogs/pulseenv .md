---
publishDate: 2026-08-25T00:00:00Z
title: PULSEENV - Simultaneous Human Physiological and Environmental Stress Co-Monitoring Using MYOSA Mini IoT Kit
excerpt: We built a real-time stress monitoring system that simultaneously tracks human physiology and environment using only the MYOSA Mini Kit. It detects the exact moment a bad environment starts affecting the human body inside it.
image: pulsenv6/cover-image.jpg
tags:
  - IoT
  - HealthMonitoring
  - ESP32
  - StressDetection
  - MYOSA
---

> The moment a deteriorating environment begins affecting the human body inside it — that's what PULSEENV detects.

---

## Acknowledgements

We thank the IEEE Sensors Council and the MYOSA team for this opportunity and the compact kit that made this project possible. Thanks to CVR College of Engineering for the lab space and our faculty mentor for the guidance. And thanks to the MYOSA community for the excellent wiki documentation that helped us understand sensor behavior during real-world testing.

---

## The Problem We Noticed

Working on occupational health projects, something bothered us. There are plenty of environment monitors — temperature, pressure, air quality sensors everywhere. And there are health monitors — smartwatches, pulse oximeters, fitness trackers. But nobody asks the obvious question: **what happens the moment a bad environment starts causing damage to the human inside it?**

A factory worker in a hot sealed enclosure. A student in a poorly ventilated classroom during exam season. An elderly person alone in a closed room. In each case, the environment degrades first. The body responds second. By the time symptoms are obvious, the stress has already built up.

That gap is what PULSEENV fills.

---

## What We Built

<p align="center">
  <img src="/assets/images/pulseenv6/cover-image.jpg" width="100%" alt="PULSEENV cap-mounted wearable alongside the live stress dashboard">
  <br/>
  <i>PULSEENV field-tested: the sensor-mounted cap and the live dashboard, side by side.</i>
</p>

PULSEENV monitors **6 parameters across 2 domains** — environment and human physiology — simultaneously. Every second, it fuses them into a single **Stress Correlation Index (SCI)** that goes from 0 to 100.

The insight we had: the sensors in the MYOSA kit aren't designed for health monitoring. But with creative repurposing, they can be.

---

## Why This Is Different

Every existing safety wearable we looked at picks **one domain and stops there**:

| System | What it tracks | What it misses |
|---|---|---|
| SmartCap (EEG headband) | Brain-state fatigue | No environmental data at all — can't say *why* |
| Kenzen (armband) | Core temp, HR, exertion | Physiological only — no air/pressure context |
| Canaria (behind-ear) | HR/HRV, temp, movement | Same gap — body signals, no environment |
| Industrial smart helmets | Gas, heat, impact | Environment only — no idea how the *worker* is doing |

Nobody fuses both into one live, personally-calibrated score. That's the actual gap PULSEENV closes — not a better sensor, a missing correlation.

---

## How We Repurposed Each Sensor

**APDS9960** (Light + Gesture sensor)
We placed a finger directly on the IR LED. Blood flow variation as your heart pumps shows up as changes in light absorption. This became our PPG pulse monitor. It's not clinical grade, but it responds to real changes and detects when your pulse rises.

**BMP180** (Barometric altimeter)
We use this to detect pressure changes inside enclosed spaces — a key stress indicator. Plus it has a built-in temperature sensor that catches thermal stress before you consciously notice the heat.

**MPU6050** (Motion sensor)
This tiny accelerometer picks up micro-tremors — the involuntary shaking that happens under stress. Even at rest, stress manifests as sub-1g vibrations that this sensor catches.

Combining all three: when the environment gets hot (BMP180 temperature rises) and pressurized (BMP180 pressure changes), if your pulse starts climbing (APDS9960) and tremors appear (MPU6050), the system knows stress is building.

---

## From Desk to Head: The MYOSA 6.0 Redesign

<p align="center">
  <img src="/assets/images/pulseenv6/working.jpg" width="100%" alt="PULSEENV mounted on a cap, field-tested outdoors">
  <br/>
  <i>PULSEENV moved off the bench and onto a cap — a form factor a factory or site worker would actually wear.</i>
</p>

Our MYOSA 5.0 build proved the core insight on a desk, sensors wired into a heart-shaped layout. For 6.0, we wanted to prove it works on a body, not just a bench. We mounted the full sensor array onto a cap, with the APDS9960's finger-contact PPG lead running down to hand height — closer to how a real deployment would look on a worker or student, not a lab demo.

We field-tested it outdoors, running the same live dashboard over the ESP32's own WiFi hotspot, watched in real time on a laptop screen beside the cap.

---

## The Circuit — A Heart Shape

<p align="center">
  <img src="/assets/images/pulseenv6/circuit.jpg" width="100%" alt="PULSEENV circuit arranged in a heart shape">
  <br/>
  <i>We arranged the circuit in a heart shape intentionally — reflecting the system's focus on human health at its core.</i>
</p>

All sensors connect via I2C on a single data bus. The splitter cable daisy-chains them together. The buzzer gets its own pin (D12 on 5V for maximum volume). Power comes from USB Type-C.

---

## The Algorithm — SCI Formula

After testing dozens of weight combinations, we settled on this:

```
SCI = 0.40 × pulse_deviation
    + 0.25 × temperature_deviation × 5
    + 0.15 × pressure_deviation × 0.1
    + 0.15 × tremor_deviation
    + 0.05 × light_deviation
```

**Why these weights?**

Pulse gets 40% — it's your most direct physiological signal. When something's wrong, your heart responds first.

Temperature gets 25% (with a 5x multiplier) — thermal stress elevates heart rate before you even realize you're hot. We weight it high because it's a leading indicator.

Tremor gets 15% — it's slower to build but very reliable. A tremoring person is a stressed person.

Pressure gets 15% (with a 0.1x dampener) — less common than temperature, but critical in sealed spaces.

Light gets 5% — visual stress matters but less than the others.

**Baseline calibration:** On startup, the system runs 60 seconds where you sit still. It learns YOUR baseline, not a population average. This makes it accurate for each individual — a person with naturally high resting heart rate won't trigger false alarms.

---

## Three Levels of Stress

| Status | SCI | What Happens |
|--------|-----|--------------|
| **SAFE** | 0–30 | Silent. All good. |
| **WARNING** | 30–60 | Buzzer beeps slowly every 3 seconds. System detected deviations. |
| **CRITICAL** | 60–100 | Buzzer beeps rapidly every 400ms. Multiple stressors hitting at once. Act now. |

---

## The OLED Display — Live Feedback

<p align="center">
  <img src="/assets/images/pulseenv6/oled.jpg" width="100%" alt="OLED showing live SCI readings and sensor values">
  <br/>
  <i>OLED showing 5 rows of live data. SCI goes red when stress spikes.</i>
</p>

The 128×64 OLED displays everything in real-time:

Row 1: **SCI score + Status** (SAFE/WARNING/CRITICAL)
Row 2: **BPM** (or "no finger" if hand is not on sensor)
Row 3: **Temperature + Pressure**
Row 4: **Tremor + Light intensity**
Row 5: **Dominant stressor** — which parameter is contributing most

---

## The Dashboard — 3D Visualization

We created an advanced dashboard (not required, but we wanted judges to see the depth). It shows:

- **Animated 3D avatar** that walks faster as stress climbs
- **SCI ring** that color-shifts in real-time (green → yellow → red)
- **Live pulse waveform** on HTML5 Canvas
- **SCI history** over the last 60 points
- **Individual sensor cards** with color-coded alerts
- **Timestamped event log** showing every status change
- **Downloadable CSV** for data analysis

The avatar visualization makes stress **visible**. When someone sees the avatar start walking faster, they immediately understand what's happening.

Access it by connecting phone to WiFi: `PULSEENV` (password: `pulseenv123`)
Then open: `http://192.168.4.1`

---

## Live Demo — What We Show

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/chr9IqD---E">
  </iframe>
</div>

**Baseline phase**
Subject wears PULSEENV and walks normally. System calibrates to their personal resting baseline. Dashboard avatar walks calmly, SCI reads NORMAL, status indicator blue.

**Stress induction phase**
Subject performs physically demanding activity. Pulse, tremor, and motion parameters shift measurably away from baseline. The dashboard shows this in real time — avatar animation changes pace, SCI climbs, deviation is visibly correlated to the activity as it happens.

**Sense → Analyze → Correlate → Indicate**
That's the full pipeline in one line: normal activity establishes the baseline, stressful activity produces a physiological change, PULSEENV correlates the deviation, SCI rises, and the dashboard indicates it visually — closing the loop between what's happening to the body and what the system reports.

---

## Real-World Applications

**Factory floors** — A worker wearing PULSEENV gets an alert the moment the combination of heat + pressure begins affecting their physiology. Supervisor intervenes before an accident.

**Schools** — A device in each classroom shows teachers when CO2 + temperature is causing student stress. Data justifies HVAC improvements to administration.

**Home health** — Elderly person living alone. PULSEENV on their bedside table monitors continuously. If pressure + temperature spike and pulse elevates, family is alerted.

**Sports** — Athlete in a heated environment. Real-time feedback on when environmental stress is hitting physiological limits.

---

## Technical Stack

**Hardware:** ESP32 (WiFi, I2C master), APDS9960 (PPG + light), BMP180 (pressure + temperature), MPU6050 (tremor + motion), SSD1306 OLED, active buzzer (5V), I2C protocol

**Firmware:** Arduino IDE (C++), 2000+ lines, fully commented

**Dashboard:** HTML5 Canvas (waveforms), Three.js (3D avatar), CSS Grid, WebSocket-style polling every 2 seconds

**Data:** SPIFFS (ESP32 flash storage), CSV logging, JSON API at /data endpoint

---

## Notes from Building This

**Challenge 1 — APDS9960 Light Sensor Returns Zero**
The light sensor wouldn't read anything until we added a 500ms delay after `enableLightSensor(true)`. Not documented in the library. Took us 2 hours of debugging to discover 500ms fixed it.

**Challenge 2 — Tremor Baseline Problem**
During the 60-second calibration on a flat table, the MPU6050 baseline tremor came out near zero, spiking any normal movement to maximum. Fixed by clamping raw tremor to a 0.05g–0.5g range.

**Challenge 3 — Buzzer Volume**
The buzzer on 3.3V was barely audible. Switching to 5V via VIN made it loud enough to actually alert someone.

**Challenge 4 — WiFi Stability**
The ESP32 soft AP disconnects internet-connected devices automatically. This is expected — users choose local monitoring or cloud connectivity, not both.

---

## How to Use PULSEENV

**Step 1: Upload Code** — Arduino IDE → Tools → Board → ESP32 Dev Module, upload speed 115200, click Upload

**Step 2: Calibrate** — Power on, OLED shows "CALIBRATING", sit still for 60 seconds, place finger on APDS9960, two beeps = done

**Step 3: Monitor** — Connect phone to WiFi `PULSEENV` (password `pulseenv123`), open `192.168.4.1`

**Step 4: Download Data** — Open `192.168.4.1/log`, save CSV

---

## What's in the Repo

```
pulseenv-myosa/
├── README.md                    Repo overview
├── pulseenv.md                  This blog
├── pulseenv.ino                 2000+ line firmware
├── pulseenv_dashboard_final.html  Dashboard source
├── cover-image.jpg              Cap-mounted PULSEENV + live dashboard
├── circuit.jpg                  Heart-shaped circuit
├── oled.jpg                     Live display reading
├── working.jpg                  System field-tested, in active use
└── demo.mp4                     Full working demo
```

---

## Why This Matters

A person sitting in a hot room doesn't "feel" stressed immediately. But inside their body, it's already happening. Their heart is working harder. Their muscles are tensing. Micro-tremors are building. By the time they feel bad, they're already 20 minutes into stress.

PULSEENV detects this in real-time. Before the person even knows something's wrong.

---

## Team

**Noventra**
CVR College of Engineering, Hyderabad, Telangana

IEEE MYOSA 6.0 — IEEE Sensors 2026 (building on our MYOSA 5.0 foundation, APSCON 2026)

**License:** MIT — Free to use, modify, and redistribute with attribution.
