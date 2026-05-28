---
publishDate: 2026-05-17

title: "kineguard: Real-Time Kinematic Constraint Enforcement System"

excerpt: "A predictive edge-AI wearable rehabilitation system that prevents unsafe joint movement using real-time sensor fusion, DSP, and adaptive biomechanical intelligence."

image: kineguard-real-time-kinematic-constraint-enforcement-system/kineguard-cover-image.png


tags:
  - edgeai
  - rehabilitation
  - wearabletech
  - esp32
  - healthcare
  - biomechanics
  - dsp
---

> Predictive biomechanical safety powered directly at the hardware edge.

---

# kineguard

## Acknowledgements

Special thanks to:
- MYOSA Innovation Platform
- Jawaharlal College of Engineering and Technology (JCET)
- Faculty Mentor: Prof. Dr Ansal K A
- Open-source embedded systems community
- Healthcare and rehabilitation researchers

---

## Overview

kineguard is a real-time wearable biomechanical safety system designed to prevent unsafe joint movement during rehabilitation exercises.

Unlike traditional rehabilitation systems that only monitor movement, kineguard actively predicts dangerous motion trajectories before injury occurs.

The system combines:
- Real-time IMU sensor fusion
- Digital Signal Processing (DSP)
- Velocity-dependent dynamic thresholding
- Fatigue detection
- Edge AI computation
- Multi-modal sensor fusion

All processing is performed locally on the ESP32-based MYOSA platform without relying on cloud servers.

This enables:
- Zero-latency response
- Offline operation
- Deterministic biomechanical intervention
- Enhanced patient privacy

---

### What Problem Does It Solve?

Outpatient rehabilitation patients often perform recovery exercises without supervision, increasing the risk of:
- Hyperextension injuries
- Muscle strain
- Delayed recovery
- Improper movement patterns

kineguard acts as an intelligent wearable rehabilitation assistant capable of predicting and preventing unsafe movement before injury occurs.

---

### Who Is It For?

- Physiotherapy patients
- Sports rehabilitation users
- Orthopedic recovery patients
- Elderly mobility rehabilitation
- Physiotherapists and rehabilitation clinics

---

### Why kineguard Is Different

| Traditional Systems | kineguard |
|---|---|
| Passive monitoring | Predictive intervention |
| Static thresholds | Dynamic adaptive thresholds |
| Cloud dependency | Fully offline edge AI |
| Delayed warnings | Real-time prevention |
| Generic rehabilitation | Personalized calibration |

---

### Key Features

- Real-time joint tracking
- Velocity-aware predictive intervention
- Fatigue detection through micro-tremor analysis
- Gesture-based touchless calibration
- OLED and buzzer-based warning system
- Edge AI processing on ESP32
- Multi-modal sensor fusion

---

## Demo / Examples

### Images

<!-- Replace placeholder image paths with your actual images -->

<p align="center">
  <img src="assets/images/kineguard-real-time-kinematic-constraint-enforcement-system/kineguard-cover-image.png" width="800"><br/>
  <i>kineguard wearable rehabilitation system</i>
</p>

---

<p align="center">
  <img src="assets/images/kineguard-real-time-kinematic-constraint-enforcement-system/system-architecture.png" width="800"><br/>
  <i>kineguard system architecture diagram</i>
</p>

---

<p align="center">
  <img src="assets/images/kineguard-real-time-kinematic-constraint-enforcement-system/oled-interface.png" width="800"><br/>
  <i>OLED interface displaying real-time rehabilitation feedback</i>
</p>

---

## Features (Detailed)

### 1. Real-Time Joint Tracking

kineguard continuously tracks:
- Joint angle
- Angular velocity
- Movement acceleration
- Motion trajectory

The MPU6050 IMU sensor provides raw accelerometer and gyroscope data which is processed using sensor fusion algorithms to generate stable kinematic measurements.

---
### **Videos**

**Presentation**
<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/2QzGK2m_mMw"></iframe>
</div>

**Live Demo**
<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/8WubJlyVPpY"></iframe>
</div>
---

### Velocity-Dependent Dynamic Thresholding Engine

kineguard dynamically tightens rehabilitation safety limits based on real-time angular velocity and biomechanical momentum.

```cpp
// Normalize velocity
float normalizedVelocity =
    constrain(velocity / 250.0, 0.0, 1.0);

// Nonlinear threshold reduction
float adaptiveReduction =
    pow(normalizedVelocity, 1.8) * 25.0;

// Smooth threshold transition
dynamicThreshold =
    0.85 * dynamicThreshold
    +
    0.15 * (targetROM - adaptiveReduction);

// Safety constraints
dynamicThreshold =
    constrain(dynamicThreshold,
              targetROM * 0.55,
              targetROM);
```

This predictive protection engine progressively tightens safe joint limits during rapid movement, allowing kineguard to intervene before dangerous momentum causes hyperextension.

The nonlinear scaling model improves:
- Stability
- Motion smoothness
- Predictive responsiveness
- Biomechanical realism
- False trigger reduction

---

### 3. Fatigue Detection Engine

The system analyzes high-frequency IMU jitter using DSP-based filtering techniques.

This allows kineguard to detect:
- Muscle tremors
- Physical exhaustion
- Unsafe continuation risk

When fatigue is detected:
- Safety thresholds automatically tighten
- Alerts become more sensitive
- Injury risk is reduced

---

### 4. Touchless Gesture Calibration

Using the APDS9960 gesture sensor, patients can:
- Calibrate the device
- Start monitoring
- Reset baseline states

without physically touching the hardware.

This improves:
- Hygiene
- User experience
- Clinical usability

---

### 5. Environmental Context Awareness (BMP180)

The BMP180 atmospheric sensor enables:
- Pressure sensing
- Altitude estimation
- Ambient temperature monitoring

This improves contextual rehabilitation awareness during:
- Stair climbing
- Inclined motion therapy
- Mobility exercises
- Balance training

The BMP180 transforms kineguard from a basic motion tracker into a context-aware rehabilitation intelligence platform.

---

### 6. Real-Time Alert System

kineguard provides immediate rehabilitation feedback using:
- OLED visual alerts
- LED warning indicators
- Piezo buzzer escalation

This closed-loop warning architecture ensures users receive real-time biomechanical intervention when unsafe movement is detected.

---

### 7. Edge AI Processing

Instead of forwarding raw sensor data to cloud servers, kineguard processes all biomechanical intelligence directly on the ESP32 edge processor.

This architecture enables:
- Deterministic low-latency response
- Offline functionality
- Faster intervention
- Complete privacy
- Real-time DSP execution

---

## Usage Instructions

### 1. Hardware Setup

Connect all MYOSA kit components using the I2C interface.

| Component | Purpose |
|---|---|
| ESP32 MYOSA Board | Edge processing and control |
| MPU6050 | Joint motion sensing |
| APDS9960 | Gesture-based calibration |
| BMP180 | Environmental sensing |
| OLED Display | Real-time monitoring |
| Buzzer | Warning alerts |

---

### 2. Power On the System

Power the MYOSA ESP32 board using:
- USB connection
- External battery pack

Once powered:
- The OLED display initializes
- Sensors begin startup checks
- kineguard enters initialization mode

---

### 3. Upload Firmware

Flash the firmware to the ESP32 using PlatformIO.

```bash
pio run --target upload
```

---

### 4. Autonomous ROM Calibration

kineguard supports autonomous calibration without requiring manual parameter tuning.

### Calibration Procedure

1. Wear the device securely on the target joint
2. Perform an upward gesture using the APDS9960 sensor
3. Slowly execute one controlled rehabilitation movement
4. The system automatically:
   - Captures the maximum safe joint angle
   - Maps personalized Range of Motion (ROM)
   - Generates adaptive biomechanical thresholds

The OLED display confirms successful calibration.

This eliminates the need for:
- Hardcoded movement limits
- Manual threshold configuration
- External calibration software

---

### 5. Begin Rehabilitation Monitoring

After calibration:
- kineguard enters active monitoring mode
- Real-time joint tracking begins
- Motion data is processed locally on the ESP32 edge processor

The system continuously analyzes:
- Joint angle
- Angular velocity
- Movement trajectory
- Tremor frequency
- Biomechanical risk level

---

### 6. Real-Time Predictive Protection

kineguard dynamically adjusts safety thresholds based on movement velocity and biomechanical risk.

If unsafe movement is predicted:
- OLED warning messages activate
- Buzzer alerts escalate
- Dynamic thresholds tighten automatically

### Warning Levels

| Mode | Description |
|---|---|
| SAFE | Normal rehabilitation movement |
| WARNING | Elevated biomechanical risk |
| ALERT | Dangerous movement detected |

---

### 7. Fatigue Detection

kineguard continuously analyzes high-frequency IMU oscillations to detect muscle fatigue.

When fatigue is identified:
- Safety thresholds become more sensitive
- Risk tolerance decreases
- Injury prevention becomes more aggressive

This adaptive protection mechanism helps reduce strain-related rehabilitation injuries.

---

### 8. Environmental Context Monitoring

The BMP180 sensor continuously measures:
- Atmospheric pressure
- Ambient temperature
- Relative altitude

This enables contextual rehabilitation intelligence during:
- Stair climbing
- Inclined movement therapy
- Mobility exercises
- Balance rehabilitation

---

### 9. Recalibration

The system can be recalibrated at any time using gesture control.

1. Trigger calibration gesture
2. Perform one controlled motion cycle
3. kineguard automatically updates the ROM baseline
4. Monitoring resumes with recalculated thresholds

---

### 10. Demonstration Workflow

### Phase 1 — Autonomous Calibration
Gesture-triggered personalized ROM mapping.

### Phase 2 — Baseline Monitoring
Safe rehabilitation movement tracking.

### Phase 3 — Predictive Intervention
Velocity-aware dynamic threshold activation before hyperextension.

### Phase 4 — Fatigue Detection
Micro-tremor analysis and adaptive biomechanical protection.

---

## Tech Stack

### Hardware
- ESP32 (MYOSA Platform)
- MPU6050 IMU
- APDS9960 Gesture Sensor
- BMP180 Pressure Sensor
- OLED Display
- Piezo Buzzer
- LEDs

---

### Software
- Embedded C/C++
- Digital Signal Processing (DSP)
- Complementary Filter Algorithms
- Sensor Fusion Logic
- Edge Processing Architecture

---

### Development Tools
- Arduino IDE
- PlatformIO
- VS Code
- GitHub

---

## Requirements / Installation

### Hardware Requirements

- MYOSA ESP32 Board
- MPU6050 Sensor
- APDS9960 Sensor
- BMP180 Sensor
- OLED Display
- Piezo Buzzer
- LEDs
- Battery Pack

---

### Software Requirements

- Arduino IDE
- PlatformIO
- ESP32 Board Support Package

---

### Install Required Libraries

```bash
pio lib install
```

---



## File Structure (Optional)

```text
kinematicspro/
│
├── kineguard-real-time-kinematic-constraint-enforcement-system/
│   │
│   ├── kineguard-real-time-kinematic-constraint-enforcement-system.md
│   │
│   ├── videos/
│   │   │
│   │   ├── kineguard-demonstration-video.mp4
│   │   └── kineguard-presentation-video.mp4
│   │
│   └── assets/
│       │
│       └── images/
│           │
│           └── kineguard-real-time-kinematic-constraint-enforcement-system/
│               │
│               ├── kineguard-cover.png
│               ├── system-architecture.png
│               ├── oled-interface.png
│               ├── wearable-demo.png
│               ├── live-demo.png
│               ├── threshold-warning.png
│               ├── gesture-calibration.png

```

---

## Example Embedded Code

### 1. Complementary Filter Sensor Fusion

kineguard uses a complementary filter to combine accelerometer stability with gyroscope responsiveness for real-time joint angle estimation.

```cpp
filteredAngle =
    alpha * (filteredAngle + g.gyro.x * dt * 180 / PI)
    +
    (1 - alpha) * accAngle;
```

This enables stable and low-latency biomechanical tracking directly on the ESP32 edge processor.

---

### 2. Velocity-Dependent Dynamic Thresholding

Instead of using static rehabilitation limits, kineguard dynamically adjusts safety thresholds based on movement velocity.

```cpp
dynamicThreshold =
    targetROM - (velocity * 0.15);

dynamicThreshold =
    constrain(dynamicThreshold,
              30,
              targetROM);
```

This predictive protection mechanism tightens safety boundaries during rapid movement to prevent hyperextension before injury occurs.

---

### 3. Biomechanical Risk Scoring Engine

kineguard continuously evaluates rehabilitation safety using a weighted biomechanical risk model.

```cpp
riskScore =
    0.7 * (abs(filteredAngle) / dynamicThreshold)
    +
    0.3 * (constrain(velocity / 300.0, 0, 1));
```

The system combines:
- Joint angle
- Angular velocity
- Dynamic thresholds

to generate a real-time biomechanical risk estimate.

---

### 4. Fatigue Detection Through Tremor Analysis

The fatigue detection engine analyzes high-frequency oscillations in gyroscopic motion data.

```cpp
if(tremorFrequency >= 2.0 &&
   tremorFrequency <= 15.0) {

    fatigueDetected = true;

} else {

    fatigueDetected = false;
}
```

This allows kineguard to identify muscle fatigue and automatically tighten rehabilitation safety thresholds in real time.

---

### 5. Gesture-Based Touchless Calibration

The APDS9960 gesture sensor enables sterile and touchless rehabilitation control.

```cpp
switch(gesture){

  case APDS9960_UP:
    currentMode = CALIBRATION;
    calibrateROM();
    break;

  case APDS9960_DOWN:
    currentMode = MONITORING;
    break;
}
```

This improves usability in rehabilitation and clinical environments.

---

### 6. Real-Time Embedded Warning System

kineguard provides immediate intervention using OLED feedback and buzzer escalation.

```cpp
if(riskScore < 0.35) {

    currentMode = MONITORING;
    noTone(BUZZER_PIN);

} else if(riskScore >= 0.35 &&
          riskScore < 0.6) {

    currentMode = WARNING;
    tone(BUZZER_PIN, 1200);

} else {

    currentMode = ALERT;
    tone(BUZZER_PIN, 2500);
}
```

This closed-loop embedded safety architecture enables deterministic real-time biomechanical intervention directly at the hardware edge.

---

## Performance Goals

| Parameter | Target |
|---|---|
| Sensor Polling Rate | 100Hz |
| Alert Latency | <50ms |
| Offline Operation | Yes |
| Gesture Calibration | Supported |
| Dynamic Thresholding | Enabled |
| Fatigue Detection | Real-Time |

---

## Real-World Applications

- Physiotherapy rehabilitation
- Sports injury prevention
- Elderly mobility assistance
- Orthopedic recovery monitoring
- Smart wearable healthcare systems
- Edge-AI rehabilitation devices

---

## Future Improvements

- TinyML-based personalized rehabilitation
- BLE mobile application
- Cloud physiotherapist dashboard
- AI movement classification
- Multi-joint monitoring
- Rehabilitation analytics engine

---

## License (Optional)

MIT License

Copyright (c) 2026 Circuit Mavericks

---

## Contribution Notes (Optional)

Contributions are welcome.

Future contributors may help improve:
- DSP optimization
- Sensor calibration
- AI-based movement classification
- Embedded firmware efficiency
- Wearable hardware design
