---
publishDate: 2026-08-23
title: EduNode GCS - Autonomous Edge AI Telemetry Station
excerpt: A dual-core RTOS edge AI ground control station built on the MYOSA board to protect mini-racks from thermal runaway and physical tampering.
image: edunode/edunode-cover.jpg
tags:
  - MYOSA
  - ESP32
  - FreeRTOS
  - Edge-AI
  - Python
---
> An intelligent thermal and security monitoring watchdog built on the MYOSA board for reliable, real-time edge telemetry.

## Acknowledgements
Developed by Luis Eduardo Arenas Deseano and Lixin Tu. Special thanks to the MYOSA Event 6.0 organization for providing the hardware development kit that made this edge computing architecture possible.

## Overview
The EduNode Ground Control Station (GCS) is a low-cost, scaled prototype designed to monitor and protect critical UAV flight hardware or server mini-racks in changing environments. Built entirely on the **MYOSA development board**, the system processes environmental telemetry, physical security (intrusion/tip-over), and thermal control simultaneously without CPU throttling.

**Key features:**
*   **True Multi-Core RTOS:** Utilizes the ESP32's dual cores via FreeRTOS to separate heavy AI math from Wi-Fi/Bluetooth communications.
*   **Omni-Connectivity:** Streams live data to a Python-based PostgreSQL dashboard via Wi-Fi, USB Serial, or Bluetooth.
*   **Predictive Cooling:** Uses Edge AI to forecast heat spikes before they happen.
*   **Hardware Tamper Alerts:** Real-time physical security using gyroscopic and optical sensors.

## Demo / Examples

### **Images**
<p align="center">
<img src="/assets/images/myosa-edunode/edunode-cover.jpg" width="800"><br/>
<i>The complete EduNode GCS setup: MYOSA board, DC cooling fan, and the Python Analytics Dashboard.</i>
</p>

### **Videos**
<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/fGpy-ooQswk"></iframe>
</div>

## Features (Detailed)

### **1. Edge AI & Thermal Forecasting**
Instead of reacting to heat after it accumulates, EduNode predicts it. We implemented a 2nd-Order Chebyshev Polynomial model running natively on the MYOSA board. The AI calculates thermal velocity and acceleration, predicting the core temperature 15 seconds into the future to engage preemptive cooling.

<p align="center">
<img src="/assets/images/myosa-edunode/edunode-oled.jpg" width="800"><br/>
<i>Real-time OLED display showing AI forecasting, internal CPU Die health, and live mA current estimation.</i>
</p>

### **2. The Power of Multi-Core Edge Computing**
A standard single-core microcontroller would inevitably choke when attempting to evaluate a complex AI polynomial model, poll I2C sensors, drive an OLED screen, and stream data via Wi-Fi and Bluetooth simultaneously. 

By leveraging the ESP32's dual-core architecture through FreeRTOS, we isolated the critical physical operations (Core 0) from the heavy communication protocols (Core 1). This ensures **zero process blocking and zero data bottlenecks**. The system remains highly responsive and capable of operating 24/7.

### **3. Overcoming Physics: The Fan Kickstart**
DC fan motors suffer from "Stall Voltage" (static friction) at low speeds. EduNode solves this using an algorithmic Kickstart. When the AI demands cooling, the system injects a 500ms 100% PWM burst to break the friction, then maps into a progressive lower-power curve (45% - 100%), ensuring physical airflow while saving battery.

### **4. Physical Security & Real-Time Tamper Alerts**
The mini-rack enclosure is strictly monitored for unauthorized physical access. Utilizing an APDS9960 (Optical Intrusion) and an MPU6050 (Tip-Over Alarm), the system generates instant, real-time alerts if the ground station falls, is moved, or if someone attempts to open the enclosure without authorization. To prevent false positives caused by the natural expansion of the cardboard enclosure throughout the day, a **24-hour Long-Term Drift Filter** continuously updates the gyro's "Perfect Zero".

<p align="center">
<img src="/assets/images/myosa-edunode/edunode-tamper-oled.jpg" width="800"><br/>
<i>Hardware OLED immediately displaying an unauthorized physical intrusion alert.</i>
</p>

<p align="center">
<img src="/assets/images/myosa-edunode/edunode-tamper-python.jpg" width="800"><br/>
<i>Python GCS reflecting the real-time physical tamper alert broadcasted by the edge node.</i>
</p>

### **5. Critical Thermal Overload Protocol**
Furthermore, the system guarantees maximum protection against extreme environmental factors. If the internal temperature surpasses the configured critical risk threshold, a thermal overload protocol is engaged natively on the ground station.

<p align="center">
<img src="/assets/images/myosa-edunode/edunode-alert.jpg" width="800"><br/>
<i>Python Dashboard catching a Critical Thermal Overload, triggering a native Windows OS notification.</i>
</p>

### **6. Performance Results & CPU Health**
Our analytics dashboard logs data locally to a PostgreSQL database. Notice that the internal ESP32 CPU Die temperature remains absolutely stable, validating our multi-core approach and proving that the heavy AI and networking workload induces no thermal stress.

<p align="center">
<img src="/assets/images/myosa-edunode/edunode-graph.jpg" width="800"><br/>
<i>Standalone Matplotlib High-Resolution Export displaying timeline metrics, Edge AI predictions, and stable CPU temperatures.</i>
</p>

## Conclusion
This project demonstrates the critical importance of multi-core programming in Edge Computing. By efficiently distributing the workload, we ensure battery savings and guarantee that the system can operate without thermal or process throttling. 

Furthermore, the EduNode GCS successfully proves that the MYOSA development board is a highly competitive, low-cost option in the market. It is fully equipped to handle academic, professional, and industrial-grade environments, providing robust protection and continuous monitoring for mini-racks.

## Usage Instructions
The complete source code, including the FreeRTOS C++ firmware and the Python dashboard, is open-source and hosted in our main development repository: 
**[🔗 Access the EduNode GCS Full Source Code Here](https://github.com/WichoArenas/Myosa-EduNode-Team/)**

To deploy the EduNode GCS:
1. Clone or download the main repository linked above.
2. Flash the C++ firmware to the MYOSA board.
3. Navigate to the Ground Control Station folder in your terminal and start the dashboard:
```plaintext
python EduNode_GCS.py
```

## Tech Stack
* **MYOSA Development Board (ESP32)**
* **C++ (FreeRTOS Framework)**
* **Python (Tkinter & Matplotlib)**
* **PostgreSQL (Database Logging)**

## Requirements / Installation
Ensure you have the required Python libraries installed to run the dashboard interface:
```bash
pip install pyserial psycopg2 pandas matplotlib plyer sv_ttk
```

## File Structure
/myosa-edunode
  myosa-edunode.md
  edunode-cover.jpg
  edunode-oled.jpg
  edunode-tamper-oled.jpg
  edunode-tamper-python.jpg
  edunode-alert.jpg
  edunode-graph.jpg
  edunode-demo.mp4

## License
MIT License

## Contribution Notes
For contributions or forks, please review the RTOS `i2cMutex` implementation before modifying sensor polling routines to prevent I2C bus collisions.
