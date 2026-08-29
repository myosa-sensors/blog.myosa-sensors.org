<h1> Title: AgriSense: Offline Edge-AI Maize Health Monitor </h1>
<h3> Excerpt: AgriSense is a low-cost ESP32 and MYOSA-based system that monitors maize conditions offline, identifies early stress indicators, and provides farmer-friendly alerts through an OLED display, buzzer, and local web dashboard. </h3>
image: agrisense-cover.jpg
tags:
- agriculture
- esp32
- tinyml
- iot
- maize

An offline edge-AI companion that helps maize farmers notice early crop stress, heat exposure, and unusual plant movement.

Acknowledgements
This project was developed for the MYOSA project challenge. It combines MYOSA-compatible hardware, ESP32 embedded programming, real maize-plant testing, and a locally deployed machine-learning model.

Overview
Small-scale maize farmers often identify crop stress only after visible wilting, heat damage, or physical disturbance has already progressed. Internet-dependent agricultural systems can also be difficult to use in locations with unreliable connectivity.

AgriSense is an offline maize-monitoring prototype built around an ESP32 and MYOSA sensor modules. It reads temperature, pressure, ambient light, proximity, and plant-support movement. A 15-tree Random Forest model runs directly on the ESP32 to classify plant condition as healthy, moderately stressed, or highly stressed.

The system creates its own Wi-Fi network, so a farmer can connect a phone directly to the device and view a local dashboard at http://192.168.4.1 without Internet access.

Key features:

Offline ESP32 Wi-Fi dashboard for farmer access

On-device 15-tree Random Forest inference

Maize health status: healthy, moderately stressed, highly stressed, and heat stress

Farmer-friendly likely-cause suggestions

OLED status display for local field visibility

Buzzer alerts for urgent conditions

CSV dataset collection for future model improvement

Real maize-plant field-test design

Demo / Examples
Images
<p align="center">
<img src="agrisense-cover.jpg" width="800">

<i>AgriSense installed beside a maize plant for local condition monitoring.</i>
</p>

<p align="center">
<img src="agrisense-hardware.jpg" width="800">

<i>ESP32/MYOSA hardware, sensors, OLED display, and buzzer integration.</i>
</p>

<p align="center">
<img src="agrisense-dashboard.jpg" width="800">

<i>Offline farmer dashboard showing plant condition, sensor readings, and likely causes.</i>
</p>

Videos
<video controls width="100%">
<source src="agrisense-demo.mp4" type="video/mp4">
</video>

## Demo Video

[▶ View or download the AgriSense field-deployment demo](agrisense-demo.mp4)

The video shows the deployed MYOSA sensor modules, the ESP32 controller, maize field setup, and dashboard output.

Features (Detailed)
1. Offline Farmer Dashboard
The ESP32 creates a private Wi-Fi access point called AgriSense-ESP32. A farmer connects a phone or laptop directly to the device and opens the local dashboard without requiring mobile data or Internet access.

The dashboard presents:

Current crop health classification

AI confidence level

Temperature, light, pressure, and movement values

Heat-stress warnings

Likely causes of unusual readings

OLED and buzzer status

CSV session recording and download tools

2. On-Device TinyML Inference
AgriSense uses a 15-tree Random Forest model embedded in the ESP32 firmware. The model receives four features:

Ambient temperature in °C

Light intensity

Atmospheric pressure in hPa

Acceleration deviation from gravity

The model estimates crop condition as:

Healthy Plant

Moderately Stressed

Highly Stressed

The inference runs directly on the ESP32, allowing low-latency decisions without cloud processing.

3. Heat-Stress Alert
AgriSense displays a dedicated Heat Stress state when temperature reaches 36°C or above. The dashboard shows an orange heat warning and advises the farmer to inspect shade and water availability.

4. Movement and Disturbance Indicator
The MPU6050 measures support-stake or stem movement. The software calculates acceleration deviation from normal gravity rather than using raw acceleration magnitude.

Depending on movement level, the dashboard can suggest possible causes such as:

Light movement: wind or a small insect landing

Moderate movement: wind or small animal activity

Strong movement: rodent, bird, or larger animal disturbance

These messages are early-warning indicators and should be confirmed through farmer inspection.

5. OLED and Buzzer Alerts
The OLED provides a fast local status message:

HEALTHY

STRESSED

HEAT

CRITICAL

The buzzer remains silent during healthy conditions, beeps intermittently during moderate or heat stress, and activates continuously during highly stressed conditions.

6. Dataset Collection
The dashboard includes a controlled data-collection mode. The user can assign a plant ID, day, session time, and condition label, then export recorded sensor readings to CSV for future retraining.

Usage Instructions
Upload the AgriSense firmware to the ESP32 using Arduino IDE.

Keep agrisense_model.h in the same Arduino sketch folder as the .ino file.

Power the ESP32.

Connect a phone or laptop to:

text
Wi-Fi name: AgriSense-ESP32
Password: 123456789
Open the dashboard:

text
http://192.168.4.1
View live crop condition, readings, and likely-cause messages.

For dataset collection, open the Advanced section, create a session, start recording, stop recording, and download the CSV file.

Tech Stack
ESP32 for embedded processing and Wi-Fi access point

MYOSA-compatible modules for modular sensor connection

Arduino IDE / C++ for firmware development

Random Forest TinyML model for on-device crop-condition inference

BMP180 for temperature and pressure measurement

APDS9960 for light and proximity measurement

MPU6050 for motion and vibration measurement

SSD1306 OLED for local status output

HTML, CSS, and JavaScript for the embedded offline dashboard

GitHub for version control and code submission

Requirements / Installation
Install the following libraries in Arduino IDE:

text
Adafruit BMP085 Library
Adafruit GFX Library
Adafruit SSD1306
Use an ESP32 board package in Arduino IDE.

Project files required:

text
agri_sense.ino
agrisense_model.h
File Structure
text
agri_sense/
├── agri_sense.ino
├── agrisense_model.h
├── agrisense_myosa.md
├── agrisense-cover.jpg
├── agrisense-hardware.jpg
├── agrisense-dashboard.jpg
├── agrisense-demo.mp4
├── README.md
└── .gitignore
License
This project is shared for educational and competition demonstration purposes.

Contribution Notes
Future improvements include direct soil-moisture sensing, humidity sensing, solar power, persistent SD-card storage, expanded maize-plant data collection, and model retraining across more farms and growth stages.
