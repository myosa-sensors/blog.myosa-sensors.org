---
publishDate: 2026-08-25T00:00:00Z
title: "SYNCHRO-CPS: Real-Time Cross-Modal Anomaly Isolation Engine"
excerpt: "An intelligent edge computing framework on ESP32 that eliminates false-positive industrial alarms caused by thermal micro-climatic drift using cross-modal sensor discrimination."
image: /assets/images/synchro-cps/cover.jpg
tags:
  - ESP32
  - Edge Logic
  - Digital Twin
  - Predictive Maintenance
---
> Deterministic cross-modal edge anomaly discrimination suppressing 100% of micro-climatic false alarms.
---

## Overview
Industrial Cyber-Physical Systems (CPS) heavily rely on single-sensor edge thresholding for condition monitoring and predictive maintenance. However, localized environmental factors—such as ambient thermal drift—frequently trigger false-positive alarms, causing operational downtime and alarm fatigue.

**SYNCHRO-CPS** solves this challenge by deploying a multi-sensor cross-modal decision engine directly on an ESP32 microcontroller. By combining mechanical vibration sensing (MPU6050) with ambient temperature tracking (BMP180), SYNCHRO-CPS differentiates actual structural faults from isolated micro-climatic drift with microsecond edge latency.

**Key features:**
* **Cross-Modal Fault Discrimination:** Distinguishes mechanical degradation from benign thermal ambient changes.
* **100% False-Alarm Suppression:** Completely suppresses alarm actuation during isolated micro-climatic thermal drift events.
* **Deterministic Edge Latency:** Executes full sensing, classification, display rendering, and serial output loops in ~136 ms.
* **Live Cyber-Physical Digital Twin Dashboard:** Synchronizes hardware telemetry with a real-time web interface for live monitoring.

---

## Demo / Examples

### **Images**

![SYNCHRO-CPS Test Rig](cover.jpg)
*SYNCHRO-CPS Physical Test Rig mounted on MYOSA ESP32 modular platform*

![Dual-Axis Telemetry Plot](synchro_cps_dual_axis_benchmark.png)
*Dual-Axis Telemetry Plot: Real-time sensor deltas mapped against edge state classifications across all test phases*

![Quantitative Performance Benchmark](synchro_cps_benchmark_chart.png)
*Quantitative Performance Benchmark: Achieving 99.78% classification accuracy across continuous telemetry samples*

![Digital Twin Interface](digitaltwin-dashboard.png)
*Live Cyber-Physical Digital Twin Interface: Real-time telemetry streaming over serial*
### **Videos**

[▶ Watch Digital Twin Demo Video](synchro-dashboard-video.mp4)

---

## Features (Detailed)

### **1. Cross-Modal Edge Decision State Machine**
The firmware evaluates physical sensor inputs at ~100 ms intervals against calibrated baseline deltas ($\Delta \text{Vib} = 0.30\text{ m/s}^2$, $\Delta \text{Temp} = 0.40^\circ\text{C}$):
* **State 0 (SYSTEM NORMAL):** Both sensors sit below fault thresholds; local actuator alarm remains silent.
* **State 1 (CRITICAL FAULT):** Vibration exceeds threshold while temperature remains stable; hardware alarm actuates instantly.
* **State 2 (THERMAL DRIFT):** Temperature exceeds threshold while vibration remains stable; alarm remains silent (0% false positives).
* **State 3 (SYSTEM OVERLOAD):** Concurrent vibration and thermal spikes trigger multi-fault warnings.

### **2. Serial Telemetry & Quantitative Benchmarking**
Every execution loop transmits structured CSV lines over UART (`Timestamp_ms, Vib_Delta, Temp_Diff, State_Code`), enabling real-time logging and statistical validation without interrupting local hardware execution.

### **3. Cyber-Physical Web Dashboard (Digital Twin)**
A Streamlit web interface connects to the edge node over serial, displaying live KPI metrics, auto-refreshing time-series graphs, and system state flags with zero buffer latency.

---

## Usage Instructions

### **1. Flashing Firmware to ESP32**
Upload the C++ firmware sketch (`firmware.ino`) to your MYOSA ESP32 board using Arduino IDE.

### **2. Running the Digital Twin Web Dashboard**
Open your terminal inside the project directory and run:

```bash
streamlit run app.py
```


## Tech Stack

-  Microcontroller & Edge Framework: ESP32 (C++ / Arduino Framework)
-  Hardware Sensors: MPU6050 Accelerometer, BMP180 Barometric & Thermal Sensor
-  Visual & Acoustic Output: SSD1306 0.96" I2C OLED, Active Piezo Buzzer
-  Telemetry & Benchmarking: Python 3, Pandas, Matplotlib, PySerial
-  Digital Twin Interface: Streamlit Web Framework

##  Requirements / Installation

Install all required Python dependencies:
```bash
pip install pyserial pandas matplotlib streamlit
```

## File Structure


```
/synchro-cps
  ├─ app.py
  ├─ cover.jpg
  ├─ critical-fault.jpg
  ├─ firmware.ino
  ├─ nominal.jpg
  ├─ synchro_cps_benchmark_chart.png
  ├─ synchro_cps_dual_axis_benchmark.png
  ├─ synchro-cps.md
  ├─ synchro-dashboard-video.mp4
  └─ thermal-drift.jpg
```
##  License

This project is licensed under the MIT License - open-source for educational and industrial adaptation.