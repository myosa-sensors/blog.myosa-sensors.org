---
publishDate: 2026-08-25

title: RespiWave

excerpt: Wearable Respiratory Waveform Mapping Using Micro-Barometric Sensors.

image: respiwave/respiwave_cover_image.jpeg

tags:
  - wearable
  - esp32
  - iot
---

> Wearable Respiratory Waveform Mapping Using Micro-Barometric Sensors[cite: 3].

---

## Acknowledgements

RespiWave is built using open-source hardware and software components[cite: 3]. The project makes use of the ESP32 platform along with libraries from the Adafruit ecosystem for interfacing with the SSD1306 OLED display, BMP180 pressure sensor, MPU6050 motion sensor, and APDS9960 gesture sensor[cite: 3]. 

Special thanks to the open-source hardware and software communities whose libraries, documentation, and development tools make projects such as RespiWave possible[cite: 3].

## Overview

RespiWave is an ESP32-based sensor monitoring system designed to provide a compact, real-time view of environmental, motion, and interaction data[cite: 3]. 

The system combines multiple I²C sensors with a local OLED display and a browser-based web dashboard[cite: 3]. Sensor readings are processed by the ESP32 and made available both locally on the device and remotely through a web interface over Wi-Fi[cite: 3].

The project is designed as a foundation for a patient-monitoring and safety-oriented sensing platform, where sensor data can be observed continuously without requiring a dedicated computer or mobile application[cite: 3].

**Problem Solved:** Traditional sensor-monitoring prototypes often require a computer, serial monitor, or separate application to observe live measurements[cite: 3]. RespiWave provides a self-contained monitoring interface directly from the ESP32[cite: 3].

**Who is it for:** RespiWave is designed for students, makers, developers, and researchers exploring ESP32, IoT, and multi-sensor monitoring systems[cite: 3]. It can also serve as a foundation for healthcare-oriented prototypes and sensor-based applications[cite: 3]. It is currently a prototype and development platform, not a certified medical device[cite: 3].

**Key Features:** RespiWave combines BMP180 pressure monitoring, MPU6050 motion and temperature sensing, APDS9960 touchless gestures, and an SSD1306 OLED display with Wi-Fi connectivity[cite: 3]. It provides a responsive real-time web dashboard, live JSON API, visual system and buzzer status, gesture-based alarm control, and requires no external server or database[cite: 3].

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/respiwave/respiwave_cover_image.jpeg" width="800"><br/>
  <i>The core hardware build for RespiWave, featuring a modular ESP32 setup streaming real-time sensor telemetry to an onboard OLED display[cite: 3].</i>
</p>

<p align="center">
  <img src="/assets/images/respiwave/respiwave_demo_image.jpeg" width="800"><br/>
  <i>Real-time telemetry streaming straight from a modular ESP32 sensor array to a live web dashboard[cite: 3].</i>
</p>

<p align="center">
  <img src="/assets/images/respiwave/respiwave_web_interface.jpeg" width="800"><br/>
  <i>RespiWave's live web dashboard streaming real-time barometric pressure, motion vectors, and device telemetry over the local network[cite: 3].</i>
</p>

### Videos


<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/hszMUrdcxsg"></iframe>
</div>


## Features (Detailed)

RespiWave combines multiple sensors with the ESP32 to provide real-time monitoring through both a local OLED display and a web dashboard[cite: 3].

### Multi-Sensor Monitoring
The system integrates:
*   **BMP180** for pressure and altitude[cite: 3].
*   **MPU6050** for acceleration and temperature[cite: 3].
*   **APDS9960** for touchless gesture detection[cite: 3].
*   **SSD1306 OLED** for local status information[cite: 3].

### Real-Time Monitoring
Sensor readings are continuously processed and displayed through the ESP32[cite: 3]. The web dashboard provides live pressure, temperature, acceleration, system status, and buzzer information[cite: 3].

### Web Dashboard
The ESP32 hosts a responsive web interface directly, requiring no external server or database[cite: 3]. It includes live sensor cards, acceleration visualization, pressure history, connection status, and alarm indicators[cite: 3].

### Gesture & Alarm Control
The APDS9960 enables touchless interaction using **UP** and **DOWN** gestures[cite: 3]. These gestures can be used to snooze an active buzzer while the latest detected gesture is shown on the dashboard[cite: 3].

### Live API
A `/data` JSON endpoint provides the latest sensor readings and system information[cite: 3]. The dashboard automatically polls the endpoint to keep the displayed data updated in real time[cite: 3].

### Wi-Fi Connectivity
The ESP32 connects directly to a configured Wi-Fi network and serves the complete monitoring dashboard over HTTP, allowing the system to be accessed from any device on the same network[cite: 3].

## Usage Instructions

1.  **Connect the Hardware**: Connect the sensors and OLED to the ESP32 using I²C[cite: 3]. The firmware uses SDA: GPIO 21, SCL: GPIO 22, and Buzzer: GPIO 25[cite: 3].
2.  **Configure Wi-Fi**: Enter your Wi-Fi SSID and password in the firmware[cite: 3].
3.  **Install & Upload**: Install the required Adafruit libraries, select your ESP32 board and port in Arduino IDE, then compile and upload the firmware[cite: 3].
4.  **Connect & Access**: Open the Serial Monitor at 115200 baud[cite: 3]. Once connected, the ESP32 will display its IP address[cite: 3].
5.  **Open the Dashboard**: Open the displayed IP address in a browser on the same Wi-Fi network to access the RespiWave dashboard[cite: 3].
6.  **Monitor**: View live pressure, temperature, acceleration, system status, buzzer state, and gestures through the dashboard and OLED display[cite: 3].

## Tech Stack

**Firmware**
*   C++[cite: 3]
*   Arduino Framework[cite: 3]
*   ESP32 Wi-Fi[cite: 3]
*   I²C communication[cite: 3]
*   Embedded HTTP server[cite: 3]

**Libraries**
*   Adafruit GFX Library[cite: 3]
*   Adafruit SSD1306[cite: 3]
*   Adafruit BMP085 Library[cite: 3]
*   Adafruit MPU6050[cite: 3]
*   Adafruit APDS9960[cite: 3]

**Web Interface**
*   HTML5[cite: 3]
*   CSS3[cite: 3]
*   Vanilla JavaScript[cite: 3]
*   Fetch API[cite: 3]
*   JSON[cite: 3]
*   *No external frontend framework or backend server is required*[cite: 3]

## Requirements / Installations

**Hardware Requirements**
*   1× ESP32 development board[cite: 3]
*   1× BMP180 pressure sensor[cite: 3]
*   1× MPU6050 sensor[cite: 3]
*   1× APDS9960 gesture sensor[cite: 3]
*   1× SSD1306 128×64 OLED display[cite: 3]
*   1× Buzzer[cite: 3]
*   Jumper wires[cite: 3]
*   USB cable[cite: 3]
*   Wi-Fi network[cite: 3]

**Software Requirements**
*   Arduino IDE[cite: 3]
*   ESP32 board support package[cite: 3]
*   Required Adafruit libraries[cite: 3]
*   A modern web browser[cite: 3]
*   A Wi-Fi network accessible by both the ESP32 and monitoring device[cite: 3]

**Installation**
1.  Install Arduino IDE[cite: 3].
2.  Add ESP32 board support[cite: 3].
3.  Install the required Adafruit libraries[cite: 3].
4.  Open the `respiwave.ino` project[cite: 3].
5.  Configure the Wi-Fi SSID and password[cite: 3].
6.  Verify the I²C wiring and sensor addresses[cite: 3].
7.  Select the correct ESP32 board and serial port[cite: 3].
8.  Upload the firmware[cite: 3].
9.  Open the Serial Monitor at 115200 baud[cite: 3].
10. Obtain the ESP32 IP address[cite: 3].
11. Open that IP address in a browser on the same network[cite: 3].

## License

RespiWave is released under the MIT License[cite: 3].

## Contribution

Contributions are welcome—feel free to improve the firmware, dashboard, sensor integration, documentation, or add new features while keeping the project lightweight and reliable[cite: 3].