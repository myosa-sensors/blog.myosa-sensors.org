---
publishDate: 2026-05-24
title: Caregiver 5.0 - A Bedside Ir Based Assistive Communication System
excerpt: An ESP32-based assistive healthcare communication system using hand detection, voice alerts, and emergency GSM communication.
image: caregiver/cover.jpg
tags:
 - healthcare
 - esp32
 - assistive-tech
 - iot
 - embedded-systems
---

> Smart hand detection-based communication system designed for patients and caregivers.

---

<p align="center">
 <img width="1536" height="1024" alt="cover" src="/assets/images/caregiver/cover.jpg" />
  <i>Cover image</i>
</p>   

# ## Acknowledgements

We thank MYOSA for providing the opportunity to develop and present this healthcare assistive technology project.

---

## Overview

Caregiver Pro is an assistive healthcare communication system designed for patients who have difficulty speaking or communicating verbally.

The system uses hand detected through IR obstacle avoidance sensors connected to an ESP32 microcontroller. Each gesture triggers specific voice outputs using a DFPlayer Mini audio module and speaker system.

The project also includes emergency communication using the SIM800L GSM module, which can send SMS alerts and make calls to caregivers during emergencies.

### Key Features

- Gesture-based communication
- Voice output using DFPlayer Mini
- Emergency SMS alert system
- GSM calling support
- Portable embedded healthcare device
- Simple and low-cost solution
- Room temperature measurement

---

## Demo / Examples

### Images

<p align="center">
 <img src="/assets/images/caregiver//gesture-demo.jpg" width="800"><br/>
 <i>Gesture detection demonstration</i>
</p>

<p align="center">
 <img src="/assets/images/caregiver//hardware.jpg" width="800"><br/>
 <i>Complete hardware setup</i>
</p>

<p align="center">
 <img src="/assets/images/caregiver//circuit-diagram.jpg" width="800"><br/>
 <i>System circuit diagram</i>
</p>

---

### Videos

### Demo Video

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/fswLdvMHo6A"></iframe>
</div>


### Presentation Video


<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/SavfumkGRR0"></iframe>
</div>

---

## Features (Detailed)

### 1. Hand Recognition

The system detects hand movements using IR obstacle avoidance sensors connected to the ESP32.

Different sensors trigger different communication commands:

- Left Sensor → Water Needed
- Right Sensor → Hungry
- Down Sensor → Yes
- Up Sensor → No
- All Sensor(3s hold) → Emergency

---

### 2. Voice Output System

The DFPlayer Mini module plays prerecorded voice messages through a speaker.

This allows patients to communicate basic needs without speaking.

---

### 3. Emergency Communication

During emergencies, the SIM800L GSM module:
- Sends SMS alerts
- Makes emergency calls
- Notifies caregivers instantly

---

### 4. Portable Embedded Design

The device is compact, lightweight, and designed for real-world healthcare usage.

---

## Usage Instructions

1. Power on the device
2. Perform hand movement near the sensor
3. ESP32 processes the sensor instruction
4. Corresponding voice message is played
5. Emergency gestures trigger GSM alerts

---

## Tech Stack

- ESP32
- IR Obstacle Avoidance Sensor
- BMP180
- DFPlayer Mini
- SIM800L GSM Module
- Arduino IDE
- Embedded C/C++
- Speaker System

---

## Requirements / Installation

### Hardware Requirements

- ESP32
- IR Obstacle Sensor
- DFPlayer Mini
- SIM800L
- Speaker
- Battery Module
- BMP180

### Software Requirements

```bash
Arduino IDE
ESP32 Board Package
DFPlayer Library
```

---

## File Structure

```plaintext

├── circuit-diagram.jpg
├── cover.jpg
├── demo-video.mp4
├── gesture-demo.jpg
├── hardware.jpg
├── presentation-video.mp4.mp4
├── caregiver.md
```

---

## License

This project is developed for educational and healthcare assistance purposes.

---

## Contribution Notes

Future improvements may include:
- Mobile application integration
- Voice call playback support
- Multi-language support
