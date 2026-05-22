---
publishDate: 2026-05-21
title: SteadyGrip – Intelligent Tremor-Cancelling Utensil System
excerpt: SteadyGrip is an ESP32-based smart stabilization system designed to help individuals with Parkinson’s disease reduce hand tremors during daily activities such as eating and writing through intelligent motion stabilization and assistive technology.
image: myosa-steady-grip/cover.png
tags:
  - Healthcare Technology
  - Parkinson’s Disease
  - Embedded Systems
  - ESP32
  - Assistive Devices
  - Smart Stabilization
---
## Acknowledgements
We sincerely thank our faculty mentor and the institution for supporting the development of this assistive healthcare project. Special appreciation goes to the MYOSA Event 5.0 platform for encouraging innovative embedded system solutions focused on real-world problems

---
## Overview
SteadyGrip is a smart tremor-cancelling assistive device developed to help individuals affected by Parkinson’s disease perform daily activities with improved stability and confidence.
The system uses an MPU6050 accelerometer and gyroscope sensor to detect involuntary hand tremors in real time. An ESP32 microcontroller processes the motion data using a complementary filter algorithm and controls dual servo motors that generate opposite corrective movement to stabilize the attached utensil.
Unlike traditional stabilizing spoons, SteadyGrip supports multiple interchangeable attachments such as spoons, and forks making it a flexible assistive platform.

**Key Features**
* Real-time tremor detection using MPU6050  
* Dual-axis servo stabilization system  
* Fast-response ESP32 processing  
* Multipurpose utensil attachment support  
* Complementary filter-based motion correction  
* Portable embedded healthcare solution  

---
## Demo/Examples
### Images
<p align="center">
  <img  src="/assets/images/myosa-steady-grip/block-diagram.png" width="800"><br/>
  <i>SteadyGrip: An Intelligent Tremor-Canceling Utensil System</i>
</p>  

### Videos



<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/g-2HG0lfdFQ"></iframe>
</div>





---
## Features (Detailed)
### 1. Real-Time Tremor Detection
The system continuously detects involuntary hand tremors using the MPU6050 accelerometer and gyroscope sensor.

### 2. Dual-Axis Stabilization
Two servo motors stabilize the utensil across both pitch and roll directions for better balance and control.

### 3. Opposite Motion Compensation
The servos automatically move in the opposite direction of the detected tremor to reduce shaking and maintain stability.

### 4. ESP32-Based Fast Processing
The ESP32 microcontroller processes sensor data in real time, providing quick response and smooth stabilization.

### 5. Complementary Filter Algorithm
The project combines accelerometer and gyroscope data using a complementary filter for accurate motion tracking and reduced sensor noise.

### 6. Multipurpose Attachment Support
The system supports multiple attachments such as:
- Spoon
- Fork
This makes the device useful for different daily activities.

### 7. Lightweight and Portable Design
SteadyGrip is designed to be compact, portable, and easy to use for everyday assistance.

### 8. Healthcare Assistive Application
The project focuses on improving independence and quality of life for individuals affected by Parkinson’s disease.

### 9. Low-Latency Response
The code is optimized for fast real-time operation by removing unnecessary delays and increasing I2C communication speed.

### 10. Affordable Embedded Solution
The project uses cost-effective components, making it suitable for accessible healthcare technology development.

---
## Usage instructions
1. Power ON the SteadyGrip device.
2. Keep the device still during gyro calibration.
3. Attach the required utensil (spoon/fork).
4. Hold the device naturally.
5. MPU6050 continuously detects tremor movement.
6. ESP32 processes motion data in real time.
7. Servo motors generate opposite corrective movement.
8. The utensil remains stabilized during usage.

---
## Tech stack
### Hardware
* Espressif Systems ESP32 Microcontroller
* MPU6050 Accelerometer + Gyroscope
* Dual Servo Motors
* Embedded Power System
* Assistive Utensil Mechanism

### Software
* Arduino IDE
* Embedded C++
* ESP32Servo Library
* Wire Library
* Real-Time Sensor Fusion
* Complementary Filter Algorithm

### Communication
* I2C Sensor Communication
* PWM Servo Control
---

## Requirements / Installation
### Hardware Requirements
* ESP32 Development Board
* MPU6050 Sensor Module
* 2 Servo Motors
* Power Supply/Battery
* Stabilizing Frame
* Spoon/Fork Attachments
 
### Software Requirements
* Arduino IDE
* ESP32 Board Package
* Required Libraries:
  * Wire.h
  * ESP32Servo.h

### Installation
1. Install Arduino IDE.
2. Install ESP32 board support.
3. Install required libraries.
4. Connect MPU6050 using I2C.
5. Connect servo motors to GPIO 4 and GPIO 5.
6. Upload the source code to ESP32.
7. Power ON the system.
8. Allow gyro calibration to complete.
9. Test stabilization performance.


## File Structure
```
├─ cover.png
├─ demo.mp4
├─ block-diagram.jpg
└─ myosa-steadygrip.md
```
  
  
  
## License
MIT License


## Contribution Notes
Contributions and improvements are welcome.
