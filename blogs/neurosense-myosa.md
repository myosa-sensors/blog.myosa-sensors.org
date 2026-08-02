---
publishDate: 2026-08-01T00:00:00Z
title: NeuroSense MYOSA - Neuromorphic Light-Guided Edge Controller (ESP32)
excerpt: NeuroSense MYOSA runs a full spiking neural network with on-device STDP on ESP32, turning a 2x2 LDR grid into autonomous motor decisions for MYOSA sensor demos.
image: neurosense/neurosense-training-demo.png
tags:
  - neuromorphic-computing
  - esp32
  - myosa
  - spiking-neural-network
  - edge-ai
---

> NeuroSense: sense light, learn on-device, act in real time.

---

## Acknowledgements

Submitted for the **IEEE Sensors Council MYOSA** student competition and **IEEE YESIST12** innovation tracks. Thanks to the MYOSA plug-and-play sensor ecosystem for motivating accessible edge-AI demos.

---

## Two NeuroSense Variants

NeuroSense ships as **two implementations** of the same 4-32-4 VTEAM crossbar SNN:

| Variant | Platform | Best for |
|---------|----------|----------|
| **NeuroSense MYOSA** (this document) | ESP32 only | MYOSA kit, single-board demos, WiFi telemetry |
| **NeuroSense FPGA** | DE10-Lite + Arduino Mega | Hardware crossbar in Verilog, research and synthesis |

Shared assets: training plots, Streamlit dashboard, STDP protocol, demo video, and images in this folder. FPGA RTL and Quartus scripts live in [`fpga/`](../fpga/) in the repository. See [`neurosense-fpga.md`](neurosense-fpga.md) for the FPGA submission write-up.

**About the demo video:** [`neurosense-demo.mp4`](./neurosense-demo.mp4) was filmed on the **NeuroSense FPGA** setup (DE10-Lite, Arduino Mega, level shifter, and PC dashboard). The learning protocol, 2x2 LDR grid, TRAIN + direction buttons, and STDP behavior are the same on **NeuroSense MYOSA**, which runs the full SNN on a **single ESP32 / MYOSA board** with no FPGA in the loop. Use the MYOSA firmware in [`../src/`](../src/) for the one-board variant.

---

## Overview

**NeuroSense MYOSA** is a single-board neuromorphic edge controller. An **ESP32** reads four light-dependent resistors (LDRs) in a 2x2 grid, encodes light changes as stochastic spikes, and runs a fixed **4-32-4** spiking neural network with **256 synapses** modeled after VTEAM memristors. The network learns light-to-direction associations using **STDP (spike-timing-dependent plasticity)** plus supervised teacher buttons, then drives motors forward, back, left, or right with **no cloud and no separate PC** required during demo.

**Problem solved:** Low-cost autonomous systems need inference and on-device learning at the edge. NeuroSense MYOSA shows that the full neuromorphic pipeline (sense, spike, crossbar, LIF, actuate, learn) fits on a commodity MCU while staying compatible with MYOSA sensor blocks.

**Who it is for:** Students, makers, and researchers demonstrating sensor-driven AI at IEEE Sensors and YESIST12 events.

**Key features:**

* Full SNN on ESP32 (~500 bytes RAM state, sub-millisecond inference per frame)
* On-device STDP learning with weights persisted in flash (NVS)
* 100 Hz LDR sampling with baseline subtraction and rate coding
* WiFi dashboard on ESP32 AP (`NeuroSense` / `neurosense`) plus NeuroSense Streamlit PC UI
* L298N / MYOSA micromotor outputs for four directions

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/neurosense/neurosense-dashboard-live.png" width="800"><br/>
  <i>Live demo: flashlight on the right LDR drives the NeuroSense UI (heatmap, direction arrow, spikes, membrane traces).</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-training-demo.png" width="800"><br/>
  <i>Left: STDP training with light on the sensor array and TRAIN + FORWARD. Right: robot moves forward after learning.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-crossbar.png" width="800"><br/>
  <i>Memristor crossbar: row wordlines, column bitlines, Kirchhoff column-sum MAC, VTEAM cell rules.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-lif-fsm.png" width="800"><br/>
  <i>Leaky integrate-and-fire (LIF) neuron state machine.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-vteam-conductance.png" width="800"><br/>
  <i>VTEAM conductance G(w): potentiation lowers w (raises G); depression raises w (lowers G).</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-membrane-sensors.png" width="800"><br/>
  <i>Sensor s2 and output membrane potentials across baseline, train, and test phases (~100 Hz).</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-accuracy-results.png" width="800"><br/>
  <i>Direction classification: 96.5% (193/200 trials) and learning curve vs training frames.</i>
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/UU8zN7-UeP8"></iframe>
</div>
---

## Features (Detailed)

### 1. Neuromorphic inference pipeline

Light levels are baseline-subtracted, rate-coded into stochastic spikes (LFSR), and passed through two memristor crossbars (**XBAR_IH** 4x32, **XBAR_HO** 32x4). Hidden and output neurons use LIF dynamics with refractory periods. Winner-take-all selects the motor direction.

<p align="center">
  <img src="/assets/images/neurosense/neurosense-crossbar.png" width="700"><br/>
  <i>Crossbar MAC and memristor cell model in NeuroSense firmware.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-lif-fsm.png" width="700"><br/>
  <i>LIF state machine: integrate, threshold, spike, refractory reset.</i>
</p>

### 2. On-chip STDP learning

Hold **TRAIN** plus a direction button while illuminating the matching LDR. STDP updates all 256 synaptic states. Weights auto-save to ESP32 NVS during training.

<p align="center">
  <img src="/assets/images/neurosense/neurosense-vteam-conductance.png" width="700"><br/>
  <i>Digital VTEAM synapse and STDP update directions.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-training-demo.png" width="700"><br/>
  <i>Training and execution on the MYOSA robot platform.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-membrane-sensors.png" width="700"><br/>
  <i>Sensor and membrane telemetry during training and test.</i>
</p>

<p align="center">
  <img src="/assets/images/neurosense/neurosense-accuracy-results.png" width="700"><br/>
  <i>96.5% direction accuracy after sufficient STDP training.</i>
</p>

### 3. NeuroSense Streamlit dashboard

Connect over USB serial (115200) or WiFi (`http://192.168.4.1/api/status`). Shows sensor grid, direction, spikes, latency, and CSV export.

<p align="center">
  <img src="/assets/images/neurosense/neurosense-dashboard-live.png" width="800"><br/>
  <i>Real-time UI with hardware: right sensor light produces Right output.</i>
</p>

### 4. MYOSA integration

LDR blocks map to ESP32 ADC GPIO 32-35. Micromotor modules use GPIO 16-19. ESP32 WiFi AP replaces the kit ESP8266 block for live graphs.

---

## Usage Instructions

### Flash MYOSA firmware (ESP32)

```plaintext
cd neurosense
pio run -t upload
pio device monitor
```

### Train

1. Ambient light for baseline (~10 ms).
2. Light on **Left** LDR + **TRAIN + Left** (~0.5 s).
3. Light on **Right** LDR + **TRAIN + Right** (~0.5 s).
4. Test: trained sensor activates the matching motor direction.

### Streamlit UI

```plaintext
pip install -r requirements.txt
streamlit run streamlit/app.py
```

### WiFi dashboard

Join WiFi **NeuroSense** (password `neurosense`), open **http://192.168.4.1**.

---

## Tech Stack

* **ESP32** (PlatformIO): inference, STDP, NVS, WiFi AP
* **C/C++**: SNN core (`src/snn_core.cpp`)
* **Python / Streamlit**: NeuroSense dashboard
* **MYOSA** LDR blocks and micromotor modules
* **L298N** motor driver (optional)

---

## Requirements / Installation

```bash
pip install platformio
cd neurosense
pio run -t upload

pip install -r requirements.txt
streamlit run streamlit/app.py
```

---

## File Structure (Optional)

```plaintext
neurosense/
├── fpga/                    # NeuroSense FPGA variant (Verilog + Quartus)
├── src/                     # ESP32 MYOSA firmware
├── streamlit/               # Shared dashboard
├── submission/
│   ├── neurosense-myosa.md  # This file (MYOSA / ESP32)
│   ├── neurosense-fpga.md   # FPGA variant write-up
│   └── *.png                # Figures (same folder as markdown)
└── LICENSE                  # MIT License
```

---

## License

Released under the **MIT License**. See [`LICENSE`](../LICENSE) in the repository root.

---

## Contribution Notes (Optional)

Contributions welcome. Open issues with `[NeuroSense]` prefix. For MYOSA org PRs, follow the official submission checklist (local MP4 video, relative or assets-path images, no YouTube links).
