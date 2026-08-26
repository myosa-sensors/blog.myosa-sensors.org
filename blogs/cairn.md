



**MYOSA 6.0**
CAIRN - AN INNOVATIVE DEVICE

Publish Date: 22 - 08 - 2026

Title: CAIRN - Wearable Safety and Fall Detection System

Excerpt: CAIRN is an ESP32-based wearable safety system for mountain climbers that detects falls using motion sensing, monitors environmental conditions, and provides immediate local and wireless alerts through a buzzer, OLED display, and a browser-based dashboard.

image: cairn-cover.jpg

tags:
  - ESP32
  - IoT
  - Wearable
  - Fall Detection
  - Embedded Systems
---

> CAIRN is a wearable safety system that detects falls, monitors the user's environment, and provides immediate alerts through local and wireless interfaces.

---

## Acknowledgements

We would like to thank the MYOSA organizers and everyone who supported us during the development and testing of CAIRN.

The project was developed as an embedded systems and IoT prototype using commonly available sensors and an ESP32 development board.

---

## Overview

CAIRN is a compact wearable safety system designed to detect potentially dangerous falls and provide immediate feedback to the user.

Falls can be difficult to respond to, especially when the person involved is unable to manually call for help. CAIRN addresses this problem by continuously monitoring motion using an MPU6050 accelerometer and gyroscope, while also monitoring environmental information using a BMP180 pressure sensor and checking device proximity using an APDS9960 sensor.

The ESP32 acts as the central processing unit. Also multiple esp devices can be used to set a swam network so that they can communicate with each other to pass information to ground station. Sensor data is continuously processed to identify a possible fall through a multi-stage detection process involving:

1. Free-fall detection
2. Impact detection
3. Post-impact stillness detection
4. Fall confirmation

When a fall is confirmed, CAIRN activates a buzzer and displays the emergency status on the OLED display.

The ESP32 also creates its own Wi-Fi access point, allowing a smartphone to connect directly to the device without requiring an external router or internet connection. A local web dashboard can then be accessed from the phone to monitor the system status in real time.

### Key Features

* Real-time fall detection
* Multi-stage fall detection algorithm
* Free-fall and impact monitoring
* Post-impact stillness verification
* OLED status display
* Relative altitude monitoring
* Atmospheric pressure monitoring
* Wear/detachment detection using proximity sensing
* Local buzzer emergency alert
* ESP32-based Wi-Fi access point
* Browser-based real-time monitoring dashboard
* No external router required
* No internet connection required for the local dashboard

---
### Current Prototype

<p align="center">
  <img src="/cairn/cairn-complete.jpeg" width="800"><br/>
  <i>ESP32 and web link</i>
</p>

### Hardware Setup

<p align="center">
  <img src="/cairn/cairn-hardware.jpeg" width="800"><br/>
  <i>ESP32 and connected sensor hardware</i>
</p>

### OLED Interface

<p align="center">
  <img src="/cairn/cairn-oled.jpeg" width="800"><br/>
  <i>CAIRN OLED interface showing system status and sensor readings</i>
</p>

### Fall Detection Test

<p align="center">
  <img src="/cairn/cairn-fall-test.jpeg" width="800"><br/>
  <i>Fall detection test demonstrating the emergency alert state</i>
</p>

### Demo Video

https://github.com/user-attachments/assets/22ef629f-2d7f-409a-9a8b-75c9791c8e9f


### Presentation Video

https://github.com/user-attachments/assets/b8cb9970-7740-438c-876b-a349339f5079



## Features (Detailed)

### 1. Multi-Stage Fall Detection
CAIRN uses the MPU6050 to continuously monitor acceleration. Instead of declaring a fall from a single acceleration spike, the system follows multiple stages to reduce false positives.

**Stage 1 - Free Fall**
The system monitors the magnitude of the acceleration vector. When acceleration falls below the configured free-fall threshold, the system identifies a possible free-fall event.
```text
 Acceleration
      |
      v
 [Below free-fall threshold]
      |
      v
  FREE FALL
```

**Stage 2 - Impact Detection**
After a free-fall event, the system looks for a sudden acceleration spike. If the acceleration exceeds the impact threshold, an impact is detected.
```text
  FREE FALL
      |
      v
 [Sudden acceleration spike]
      |
      v
   IMPACT
```

**Stage 3 - Post-Impact Stillness**
A real fall is more likely when the impact is followed by a period of relative stillness. CAIRN checks the motion after the detected impact before confirming.
```text
  FREE FALL
      ↓
   IMPACT
      ↓
  STILLNESS
      ↓
FALL CONFIRMED
```

### 2. MPU6050 Motion Monitoring
The MPU6050 is used as the primary motion sensor. The ESP32 reads the X, Y, and Z acceleration values and calculates the acceleration magnitude. 

The acceleration vector magnitude is calculated as:
$A = \sqrt{X^2 + Y^2 + Z^2}$

The resulting value is used by the fall detection algorithm.

### 3. BMP180 Environmental Monitoring
The BMP180 is used to measure atmospheric pressure and calculate relative altitude. The system establishes a reference pressure during startup and calculates changes in altitude relative to that reference, allowing the system to detect changes in the user's elevation.

The OLED and browser dashboard display:
*   Relative altitude
*   Atmospheric pressure

### 4. APDS9960 Proximity Detection
The APDS9960 is used primarily as a proximity sensor. It helps determine whether the device is still being worn or has been detached. 

The system classifies the state as:
*   `WORN`
*   `DETACHED`

This information can be combined with other sensor readings to improve the overall safety logic.

### 5. OLED Display
A 128 × 64 SSD1306 OLED provides an onboard status interface. The display shows information such as:
*   System status (e.g., `STATUS: OK`, `FREE FALL...`, `IMPACT DETECTED`, `FALL!`)
*   Fall state
*   Relative altitude
*   Atmospheric pressure
*   Device worn/detached state

### 6. Emergency Buzzer
A buzzer connected to `GPIO 25` provides a local audible alert when a fall is confirmed. The buzzer produces a repeating alert pattern rather than remaining continuously active, allowing the user and people nearby to immediately recognize the emergency state.

### 7. ESP32 Wi-Fi Access Point
CAIRN does not depend on an external Wi-Fi router. The ESP32 creates its own Wi-Fi access point, making the system suitable for demonstrations and environments where internet connectivity is unavailable.
*   **Network:** `CAIRN`
*   **Password:** `cairn1234`
*   **Local IP:** `192.168.4.1`

### 8. Browser-Based Monitoring Dashboard
After connecting a smartphone to the CAIRN Wi-Fi network, navigating to `http://192.168.4.1` opens a live CAIRN dashboard hosted on the ESP32's local web server. 

The dashboard provides real-time updates on:
*   Current system status (Changes to `FALL CONFIRMED` during an emergency)
*   Acceleration
*   Relative altitude
*   Atmospheric pressure
*   Device worn/detached status
*   Fall detection state

---

## Usage Instructions

### 1. Hardware Setup
Connect all I2C sensors to the same I2C bus. The I2C devices use different addresses and can safely share the bus.

| Component | ESP32 Pin |
| :--- | :--- |
| **SDA** | GPIO 21 |
| **SCL** | GPIO 22 |
| **MPU6050 VCC** | 3.3V |
| **BMP180 VCC** | 3.3V |
| **APDS9960 VCC**| 3.3V |
| **OLED VCC** | 3.3V |
| **I2C Ground** | GND |
| **Buzzer SIG** | GPIO 25 |
| **Buzzer 5V** | VIN |
| **Buzzer GND** | GND |

**Expected I2C Addresses:**
*   `MPU6050` -> `0x69`
*   `BMP180`  -> `0x77`
*   `APDS9960`-> `0x39`
*   `OLED`    -> `0x3C`

### 2. Install Required Libraries
Install the following libraries through the Arduino IDE Library Manager:
*   `MPU6050` by Electronic Cats
*   `Adafruit BMP085 Library`
*   `SparkFun APDS9960`
*   `Adafruit SSD1306`
*   `Adafruit GFX Library`

*(Note: ESP32 Wi-Fi and web server functionality is provided natively by the ESP32 Arduino core).*

### 3. Upload the Firmware
1. Open the CAIRN Arduino sketch in your IDE.
2. Select the appropriate ESP32 development board.
3. Compile and upload the firmware.
4. After a successful upload, open the Serial Monitor at **115200 baud**.

### 4. Connect to CAIRN Wi-Fi
After startup, connect your smartphone or computer to the ESP32's network:
*   **Wi-Fi Name:** `CAIRN`
*   **Password:** `cairn1234`

### 5. Open the Dashboard
Open a web browser on the connected device and enter: `http://192.168.4.1`

### 6. Test Fall Detection
*For safe testing, simulate a fall using the sensor module in your hand rather than dropping the complete wearable from a dangerous height.*

The system should progress through: `NORMAL` ➔ `FREE FALL` ➔ `IMPACT` ➔ `FALL CONFIRMED`.

After confirmation:
*   OLED displays the emergency state.
*   Buzzer activates.
*   Browser dashboard displays the emergency state.

---

## Tech Stack

### Hardware
*   **ESP32:** Main microcontroller and Wi-Fi access point
*   **MPU6050:** Motion and acceleration sensing
*   **BMP180:** Atmospheric pressure and relative altitude sensing
*   **APDS9960:** Proximity sensing
*   **SSD1306 OLED:** Local visual interface
*   **Buzzer:** Audible emergency alert

### Software
*   Arduino IDE (C/C++)
*   ESP32 Arduino Core & WebServer
*   I2C communication
*   HTML / CSS / JavaScript (Dashboard UI)

---

## Requirements / Installation

### Hardware Requirements
*   ESP32 development board
*   MPU6050 module
*   BMP180 module
*   APDS9960 module
*   SSD1306 128 × 64 OLED
*   3-pin buzzer module
*   Connecting wires & suitable power source
*   Smartphone with Wi-Fi and a web browser

### Software Requirements
*   Arduino IDE
*   ESP32 board package installed
*   Arduino Libraries (Listed in Usage Instructions)
*   *No external server or cloud platform is required.*

---
---

## License
This project is intended for educational, prototyping, and open-source development purposes. A suitable open-source license may be added to the repository depending on the project's requirements.
Contribution Notes
Contributions and improvements are welcome.
Potential future improvements include:
GPS-based location tracking
Emergency SMS or cloud notifications
Improved fall classification
Machine-learning-based activity recognition
Longer battery life
Miniaturized PCB design
Improved wearable enclosure
Automatic emergency contact notification
Cloud-based data logging
Multi-user monitoring
