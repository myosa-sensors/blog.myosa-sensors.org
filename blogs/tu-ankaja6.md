---
publishDate: 2026-08-25
title: "TU Ankaja: Electronic Noise Powered and MYOSA-integrated Sensor Based Random Number Generator"
excerpt: "A multi-sensor hardware entropy collector built on the ESP32-based MYOSA Motherboard and MYOSA sensor modules, paired with an external MOSFET noise circuit, feeding a Rust cryptographic engine over MQTT to produce NIST-validated true random numbers."
image: tu-ankaja/cover.jpg
tags:
  - IoT
  - Rust
  - MOSFET
  - MQTT
  - MYOSA-kit
  - TRNG
---

![IoT](https://img.shields.io/badge/IoT-blue) ![Rust](https://img.shields.io/badge/Rust-orange) ![MOSFET](https://img.shields.io/badge/MOSFET-green) ![MQTT](https://img.shields.io/badge/MQTT-purple) ![MYOSA-kit](https://img.shields.io/badge/MYOSA-kit-red) ![NIST](https://img.shields.io/badge/NIST%20SP%20800--22-15%2F15%20PASS-brightgreen)

> Turn raw sensor noise into cryptographically secure random numbers, visualized in real time.

---

## Acknowledgements

Built by **Team TU Ankaja** for the IEEE MYOSA Innovation Challenge, organized by the **IEEE Sensors Council**. We thank the MYOSA organizers and the IEEE Sensors Council for providing the MYOSA development platform and the opportunity to explore true random number generation. We also acknowledge the guidance and support of our mentor **Dr. Rupam Goswami**, Assistant Professor, Department of ECE, Tezpur University, throughout this project.

The name *Ankaja* comes from Assamese — *anka* (number) — reflecting a project built at Tezpur University, Assam, India.

**Team Members:**

| Name | Department |
|------|-----------|
| Yash Sharma | B.Tech 4th Semester, ECE |
| Nautesh Kanojiya | B.Tech 4th Semester, ECE |
| Nabajyoti Das | B.Tech 4th Semester, ECE |
| Hritima Rabha | B.Tech 4th Semester, ECE |

---

## Overview

**TU Ankaja** is a hardware-software system that generates true random numbers by combining naturally stochastic electronic noise with unpredictable physical parameters measured by MYOSA sensor modules.

Software random number generators are *deterministic*. Given the same seed, `rand()` produces the same sequence forever — which is exactly what you do not want when that number becomes a one-time password, a session key, or a nonce. TU Ankaja replaces that seed with physics: thermal and shot noise across a MOSFET channel, air particles tumbling in a sealed chamber, light bouncing off a mirrored wall, and a gyroscope reading a vibrating motor. None of it is reproducible, and none of it can be predicted by an attacker who knows the source code.

**What problem does it solve?**

- Overcomes the predictability of purely algorithmic pseudo-random number generators.
- Provides a **low analog computational cost** path to harvesting random electronic fluctuations — no dedicated TRNG chip, no expensive avalanche-diode board.
- Serves as a customized hardware entropy source, **tailored for low-to-moderate priority security applications**.

**Who is it for?**

- **Students and educators** studying cryptography, embedded systems, or sensor fusion who need a physically visible, inspectable entropy source rather than a black-box `/dev/urandom`.
- **IoT and embedded developers** who need device-local randomness for OTPs, session tokens, or nonces on hardware that has no certified TRNG peripheral.
- **Makers and researchers** experimenting with entropy harvesting, who want a reproducible reference design plus a full statistical-validation pipeline (NIST SP 800-22 and SP 800-90B) already wired up.
- **Anyone deploying two-factor authentication on a budget** — the included dashboard generates hardware-backed 6-digit OTPs end to end.

**System Architecture:**

<p align="center">
  <img src="/assets/images/tu-ankaja/blockdiagram.jpg" width="800"><br/>
  <i>End-to-end block diagram — MOSFET noise circuit and MYOSA sensor modules feed the ESP32, which publishes raw entropy over WiFi/MQTT to the Rust engine, which conditions it and serves the Next.js dashboard</i>
</p>

The pipeline has four stages:

1. **Harvest** — an IRF540N MOSFET generates analog noise; MYOSA I2C/UART sensors report physical chaos inside a mirrored box.
2. **Digitize & mix** — the MYOSA Motherboard (ESP32) samples the 12-bit ADC, runs a bit-picking and BCD-clamping algorithm, and publishes raw entropy bytes over MQTT.
3. **Condition** — a Rust engine accumulates entropy in a SHA-256 pool, runs SP 800-90B health tests, and drives a ChaCha20 DRBG with forward secrecy.
4. **Consume** — a Next.js dashboard visualizes all 21 sensor channels live and generates hardware-backed OTPs.

**Hardware Pinout:**

| Component / Function | MYOSA Mother Board Pin |
|---|---|
| DAC output / MOSFET Gate input | GPIO 25 |
| ADC input / MOSFET Drain output | GPIO 32 |
| Motor Driver ENB | GPIO 23 |
| Motor Driver IN3 | GPIO 26 |
| Motor Driver IN4 | GPIO 27 |
| LED 1 | GPIO 5 |
| LED 2 | GPIO 18 |
| LED 3 | GPIO 19 |
| UART Tx (PMS5003) | GPIO 16 |
| UART Rx (PMS5003) | GPIO 17 |
| I2C SDA | GPIO 21 |
| I2C SCL | GPIO 22 |

**Key Features:**

* **Analog Noise Generation:** Uses an IRF540N n-channel MOSFET as a switch to generate high-frequency noise signals.
* **Multi-Sensor Aggregation:** Captures MOSFET electronic noise, RGB light, ambient light, temperature, 6-axis gyroscope/accelerometer data, and airborne particle counts simultaneously — 21 channels in total.
* **Custom Chaotic Environment:** A physical mirrored box with rotating LEDs, moving discs, and agitated air particles creates a highly dynamic sensory input.
* **Digit-Picking Algorithm:** An array-based BitPicker processes sensor data into true random numbers.
* **Cryptographic Conditioning:** A Rust engine applies SHA-256 whitening, entropy pooling with per-source quality weighting, and a ChaCha20 DRBG with key ratcheting.
* **Continuous Health Monitoring:** SP 800-90B repetition-count and adaptive-proportion tests run on every sample; a stuck sensor is detected and discounted automatically, with hysteresis on recovery.
* **Measured Independence, Not Assumed:** Pairwise Pearson correlation between sources discounts channels that move together, so 21 sensors are never counted as 21 independent sources without evidence.
* **Documented Threat Model:** What the system defends against — and, just as importantly, what it does not — is stated explicitly rather than left implied.
* **NIST Validated:** The generated numbers pass **15/15 NIST SP 800-22** statistical tests, and SP 800-90B conditioning analysis certifies **full entropy** (256/256 bits out).

---

## Demo / Examples

### Images

<p align="center">
  <img src="/assets/images/tu-ankaja/mosfet-circuit-closeup.jpg" width="800"><br/>
  <i>Close-up of the MOSFET noise circuit on perfboard (2k ohm pull-up + 82 ohm gate resistor) mounted on the MYOSA motherboard with 0.96" OLED display</i>
</p>

<p align="center">
  <img src="/assets/images/tu-ankaja/chaotic-box-inside-full.jpg" width="800"><br/>
  <i>Inside the chaotic box — mirror foil walls, PMS5003 particle sensor (blue, top-left), APDS9960 light sensor, MYOSA Motherboard, motor axle with LED disc, motor driver (L298N), MPU6050, and fan for particle agitation</i>
</p>

<p align="center">
  <img src="/assets/images/tu-ankaja/chaotic-box-sensors.jpg" width="800"><br/>
  <i>Close-up of internal wiring — PMS5003 particle sensor (top), MYOSA Motherboard (red PCB), MPU6050 accelerometer/gyroscope, and linear voltage regulator</i>
</p>

<p align="center">
  <img src="/assets/images/tu-ankaja/chaotic-box-motor.jpg" width="800"><br/>
  <i>Motor assembly with rotating disc and RGB LEDs for visual disturbance of the APDS9960 sensor, mirrored interior walls visible</i>
</p>

<p align="center">
  <img src="/assets/images/tu-ankaja/dashboard-raw-data.png" width="800"><br/>
  <i>Raw Data Viewer — live MQTT sensor graphs for MOSFET noise, color (RGB), ambient light, temperature, accelerometer, and gyroscope across 21 channels</i>
</p>

<p align="center">
  <img src="/assets/images/tu-ankaja/dashboard-otp.png" width="800"><br/>
  <i>OTP Generator — hardware-backed one-time passwords generated from MOSFET noise + SHA-256, with generation history</i>
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/aMLzxkUSIB0"></iframe>
</div>

<p align="center"><i>Full demonstration — chaotic box in operation, live MQTT sensor stream, and hardware-backed OTP generation on the dashboard</i></p>

---

## Features (Detailed)

### **1. Analog Noise Generator Circuit**

Electronic noise in MOSFETs is naturally stochastic — thermal (Johnson-Nyquist) noise across the channel resistance, shot noise across the junction, and flicker noise at low frequencies all superimpose on the drain current. None of these are modelable from software.

**Circuit design:** The Drain (D) terminal is connected to +3.3 V through a 2 kΩ pull-up resistor. A random value from 0 to 255 is applied at the Gate (G) from the MYOSA Motherboard DAC pin 25 through an 82 Ω gate resistor:

```plaintext
dacWrite(25, esp_random() & 0xFF);
```

Driving the gate with a varying voltage keeps the MOSFET biased in and out of its transition region, where the drain voltage is most sensitive to noise — a fixed bias would settle into a stable operating point and yield far less variance. The resulting noisy signal is harvested from the Drain terminal and fed directly to the 12-bit ADC pin 32:

```plaintext
uint16_t adc_noise = analogRead(ADC_PIN);
```

**Why these resistor values?** The 2 kΩ pull-up sets the drain load line so that the operating point sits in the high-transconductance region, amplifying small channel-noise fluctuations into millivolt-scale swings that the ESP32 ADC can resolve. The 82 Ω gate resistor damps the gate capacitance and prevents ringing on the DAC edge, which would otherwise inject a deterministic, periodic artifact into the noise.


#### Entropy Source Analysis — where the randomness actually comes from

It is tempting to say "MOSFET thermal noise" and stop there. We ran the numbers instead, because the honest answer shaped the design.

Johnson-Nyquist noise across the 2 kΩ drain resistor has spectral density:

```plaintext
v_n = sqrt(4 * k * T * R)
    = sqrt(4 * 1.380649e-23 J/K * 300 K * 2000 ohm)
    = 5.76 nV/sqrt(Hz)
```

Integrated over a generous 100 kHz bandwidth, that is **1.82 µV RMS**. The ESP32's 12-bit ADC at 3.3 V full scale has an LSB of:

```plaintext
LSB = 3.3 V / 4096 = 0.806 mV
```

Thermal noise is therefore roughly **443× smaller than a single ADC count**. Pure Johnson noise is physically real but *invisible to this ADC* — it cannot be what we are digitizing.

So what is? Three things, in descending order of contribution:

1. **Gate-sweep through the transition region.** Each DAC step is 3.3 V / 256 = **12.89 mV**. In the MOSFET's transition region the drain voltage is a steep, highly non-linear function of gate voltage, so a single DAC step swings the drain by many ADC counts. Because the gate value is redrawn every cycle, the operating point never settles — the drain sits where small perturbations are maximally amplified.
2. **ADC and reference noise at the sampling instant.** The ESP32 SAR ADC has well-documented non-linearity and reference noise on the order of several LSBs, which becomes a genuine physical noise term once the signal is parked in the high-gain region.
3. **Sampling-time jitter.** The sample is taken on a 10 ms software loop (100 Hz), not a hardware timer, so scheduling jitter shifts *when* the steep transition curve is sampled — converting timing uncertainty into amplitude uncertainty.

This is why the design sweeps the gate rather than fixing the bias, and why the output is mixed with `micros()` timing and multi-sensor data before use. It also explains our first prototype's failure (see Design Decisions).

**The crucial point:** we do not *claim* an entropy rate from theory. We **measure** it with NIST SP 800-90B, which credits the raw source with 7.109 bits of min-entropy per byte using the most pessimistic of its estimators. A physical-mechanism argument can be wrong; a measured min-entropy bound over 500,000 samples is much harder to argue with.

### **2. Chaotic Hardware Environment**

To gather unpredictable digital data, a 45 cm × 45 cm box with a rough mirrored inner wall houses multiple independent stimuli:

- **Visual Disturbance:** A motor rotates coloured LEDs and sweeps a disc past the APDS9960 sensor, triggering random RGB and gesture readings. The rough mirror finish means reflections are chaotic rather than a clean periodic sweep.
- **Particle Agitation:** A PC fan continuously blows air inside the box, scattering particles for the PMS5003 sensor to detect. Particle count in turbulent flow is a genuinely non-deterministic quantity.
- **Environmental Metrics:** External BMP180 and CCS811 sensors gather ambient temperature, pressure, humidity, and volatile organic compounds, adding slow-moving environmental entropy that varies with the room.

The design intent is **source independence**: light, motion, particulate, and electronic noise fail in different ways. If the motor stalls, the MOSFET keeps producing noise; if the box is held still, the particle sensor keeps moving. The Rust engine measures this independence explicitly (see Feature 5).

### **3. Digital Processing & BCD Clamping**

- **Data Collection:** Sensors communicate over I2C, and the PMS5003 over UART, sending 8-bit digital data packets.
- **Array Initialization:** The system accumulates two sets of 8-bit data into a 16-bit variable for each sensor.
- **Random Bit Selection:** A software "BitPicker" randomly selects bits from across the sensor arrays, so the output does not depend on the ordering or the least-significant-bit habits of any single sensor.
- **BCD Clamping:** The 16 random bits are grouped, and a modulo operator (`% 10`) limits the decimal equivalent of each chunk to 9 — preventing hex values up to 15 — finalizing the 16-bit random output as clean decimal digits.

The firmware additionally folds in a microsecond timer to break any residual sampling periodicity:

```plaintext
entropy_state ^= (uint32_t)analogRead(ADC_PIN) ^ ((uint32_t)micros() << 16);
```

Entropy bytes are published to the MQTT broker in batches, decoupling the sampling rate from network conditions.

### **4. Wire Protocol & Data Flow**

Entropy travels from silicon to browser across four processes. Keeping the stages decoupled means a slow consumer can never stall the sampler, and a WiFi dropout costs entropy rate rather than correctness.

```plaintext
  MOSFET + MYOSA sensors
        │  analog / I2C / UART
        ▼
  ESP32 (MYOSA Motherboard)          10 ms sample loop (100 Hz)
        │  MQTT publish
        │  topic:    entropy-vault/raw
        │  payload:  raw bytes, 64 B per message
        │  QoS:      1 (at-least-once)
        │  interval: 500 ms
        ▼
  Eclipse Mosquitto broker           username/password auth
        │  MQTT subscribe
        ▼
  Rust entropy-engine                pool -> health -> whiten -> DRBG
        │  HTTP (axum REST API)
        ▼
  Next.js dashboard                  polls every 3 s
```

**Design notes on the wire format:**

- The payload is **raw bytes, not JSON**. Any text encoding would impose structure on the byte distribution — base64 alone would cap the achievable min-entropy at 6 bits/byte and skew the SP 800-90B estimates. The engine ingests exactly what the ADC produced.
- **QoS 1** is deliberate. QoS 0 would silently drop entropy under load; QoS 2 costs a four-way handshake for a guarantee we do not need, since duplicate delivery is harmless — the pool hashes rather than accumulates, so a replayed message cannot inflate the entropy estimate.
- **Batching 64 bytes per publish** amortises the MQTT header (a few bytes of framing per message) and keeps the sampler's 100 Hz loop independent of network round-trip time.
- The engine tags each message with a **source ID**, so the quality module can score channels independently rather than treating the stream as one undifferentiated blob.

### **5. Software Entropy Pipeline (Rust Engine)**

Raw hardware entropy is never handed to an application directly — biased ADC readings and correlated sensor channels have to be conditioned first. The Rust backend implements a four-stage pipeline modelled on NIST SP 800-90B:

**a) Entropy pool.** New samples are folded into a pool by hashing:

```plaintext
new_state = SHA-256(state || input)
```

Because the pool state is always rehashed with the previous state, mixing in low-quality data can never *reduce* the entropy already accumulated. The pool tracks which sources contributed and their weighted entropy estimate, so the system knows whether it holds real entropy or mostly padding. The raw state is never exposed — `derive_seed()` uses domain separation to produce a DRBG seed without revealing internals.

**b) Whitening (conditioning).** Variable-length conditioned output is produced by chained SHA-256:

```plaintext
block_0 = SHA-256(input || counter)
block_n = SHA-256(block_(n-1) || input || counter)
```

The counter is a `u32`, supporting roughly 137 GB of output before wrap. Intermediate digests are zeroized after use.

**c) ChaCha20 DRBG with forward secrecy.** A 256-bit key derived from the pool seeds a ChaCha20 stream generator. A mandatory reseed happens every 1 MiB of output. After each `fill()`, the key is **ratcheted** forward — the next 32 keystream bytes replace the key — so compromising the current state does not reveal any past output.

**d) Continuous health testing and source scoring.** Every sample is screened against SP 800-90B health tests before it is allowed to influence output, and every source is scored for min-entropy and independence. These two stages are what separate a measured entropy source from a hopeful one, so they are covered in detail in Features 6 and 7.

**Why this ordering matters.** Conditioning must come *after* health testing, never before. SHA-256 makes any input look uniform — feed it a stuck sensor reading the same byte forever and the output is still statistically flawless white noise with zero real entropy. Running the health tests on raw samples, before whitening, is the only way the failure is visible at all.

The engine ships with **96 automated tests** covering the pool, whitening, DRBG, health tests, parser, and OTP paths.

### **6. Entropy Accounting & Source Independence**

Twenty-one sensor channels do not equal twenty-one independent entropy sources. Getting this wrong is the single most common way a DIY TRNG overstates its own security, so the engine measures independence rather than assuming it.

**Per-source scoring.** Every source carries a live profile with these thresholds:

| Parameter | Value | Meaning |
|---|---|---|
| `MIN_OBSERVATIONS` | 10 | Samples required before a source's estimate is trusted at all |
| `EWMA_ALPHA` | 0.15 | Smoothing factor — the estimate tracks drift without reacting to one bad sample |
| `DEGRADATION_THRESHOLD` | 4.0 bits/byte | Below this, the source is flagged degraded |
| `FAILURE_THRESHOLD` | 1.0 bits/byte | Below this, the source is treated as stuck/failed |

Estimates are smoothed with an exponentially weighted moving average rather than a simple mean, so a source that slowly degrades — a sensor drifting as the box warms up — is caught, while a single anomalous sample does not knock a healthy source offline.

**Cross-source correlation.** For each *pair* of sources the engine maintains a rolling byte-distribution fingerprint and computes the **Pearson correlation coefficient** between them:

| Pearson \|r\| | Classification | Action |
|---|---|---|
| > 0.7 | High correlation | Heavy discount — the pair is treated as close to a single source |
| > 0.4 | Moderate correlation | Partial discount |
| ≤ 0.4 | Independent | Full contribution counted |

Correlation is only evaluated after `MIN_CORRELATION_SAMPLES` (10) observations per pair, so early noise cannot trigger a spurious discount.

**Why the pool is hash-based, not additive.** The pool updates as:

```plaintext
new_state = SHA-256(state || input)
```

This has a property that a simple XOR or concatenation accumulator does not: mixing in *low-quality or even attacker-chosen data cannot reduce* the entropy already in the pool. An adversary who fully controls one sensor can add nothing, but cannot subtract. The raw pool state is never exposed — `derive_seed()` applies domain separation to emit a DRBG seed without revealing internals.

Together these give an entropy figure that is conservative by construction: sources must earn their contribution by demonstrating both sufficient min-entropy *and* independence from every other source.

### **7. Health Monitoring, Failure Modes & Recovery**

A TRNG that fails silently is worse than no TRNG, because downstream code keeps trusting it. Every sample is screened before it is allowed to influence output.

| Test | Parameter | Trips when | Catches |
|---|---|---|---|
| Repetition Count (§4.4.1) | cutoff = 20 | 20 identical consecutive bytes | Disconnected sensor, shorted ADC pin, crashed firmware |
| Adaptive Proportion (§4.4.2) | window = 4096 B, cutoff = 50% | One byte value exceeds half the window | Source collapsing toward a constant; stuck-at-rail faults |
| Degradation check | ≥ 25% unique values, samples ≥ 64 B | Too few distinct byte values appear | Reduced-range output, e.g. an ADC losing its upper bits |

**Status model.** The monitor reports `Healthy`, `Warning`, or `Failed`. Recovery from `Failed` is deliberately asymmetric: it requires `RECOVERY_THRESHOLD` = **5 consecutive healthy observations**. A flaky source that alternates pass/fail would otherwise oscillate between states and flood consumers with contradictory status — hysteresis is the standard fix and it is what we implemented.

**Bounded memory under attack.** The proportion window caps incoming samples at `MAX_SAMPLE_SIZE` = 65,536 bytes. Without this, a malicious or malfunctioning publisher could push an enormous payload and spike engine memory — a denial-of-service against the entropy service itself.

**Concrete failure walkthrough — the PMS5003 UART cable comes loose:**

1. The sensor's UART reads return a constant value.
2. The Repetition Count Test trips after 20 identical bytes; that source is marked `Failed`.
3. The quality module's min-entropy estimate for the source falls below `FAILURE_THRESHOLD`, so its contribution is discounted to nothing.
4. The pool keeps accumulating from the MOSFET, IMU, and light channels — **output continues, at a lower measured entropy rate.**
5. The dashboard's Entropy Engine page shows the source red.
6. When the cable is reseated, 5 consecutive healthy samples are required before the source is trusted again.

Graceful degradation, not silent failure, and not a hard stop.

### **8. NIST Compliance & Validation**

Statistical validation was performed at two levels: SP 800-22 for output randomness and SP 800-90B for entropy-source quality.

**Summary of results:**

| Standard | What it measures | Result |
|---|---|---|
| NIST SP 800-22 | 15 statistical randomness tests on the output bitstream | **15 / 15 PASS** |
| SP 800-90B (non-IID) | Min-entropy of the raw source | **7.11 bits/byte** (min of H_original and 8 × H_bitstring) |
| SP 800-90B (conditioning) | Entropy of the conditioned output | **256 / 256 bits — full entropy** |

**NIST SP 800-22**

<p align="center">
  <img src="/assets/images/tu-ankaja/nist.png" width="800"><br/>
  <i>NIST SP 800-22 statistical test suite results — all 15 tests passed</i>
</p>

**NIST SP 800-90B — non-IID entropy estimation**

Run over 500,000 raw samples (4,000,000 binary symbols):

```plaintext
./ea_non_iid -i -v clean.bin 8
Opening file: 'clean.bin' (SHA-256 hash 6f6f763f3cf419aebe4138ecd45f902c032e9d886d5b7f92fe613d569d741e88)
Loaded 500000 samples of 256 distinct 8-bit-wide symbols
Number of Binary Symbols: 4000000

*** Warning: data contains less than 1000000 samples ***


Running non-IID tests...

Running Most Common Value Estimate...
Bitstring MCV Estimate: mode = 2000846, p-hat = 0.50021150000000003, p_u = 0.50085545734877057
        Most Common Value Estimate (bit string) = 0.997534 / 1 bit(s)
Literal MCV Estimate: mode = 2103, p-hat = 0.0042059999999999997, p_u = 0.0044417501069705847
        Most Common Value Estimate = 7.814656 / 8 bit(s)

Running Entropic Statistic Estimates (bit strings only)...
Bitstring Collision Estimate: X-bar = 2.5001853262836424, sigma-hat = 0.50000012191585219, p = 0.52040707920565799
        Collision Test Estimate (bit string) = 0.942288 / 1 bit(s)
Bitstring Markov Estimate: P_0 = 0.50021150000000003, P_1 = 0.49978849999999997, P_0,0 = 0.5004090771648978, P_0,1 = 0.4995909228351022, P_1,0 = 0.50001400592450607, P_1,1 = 0.49998599407549393, p_max = 3.2617554867162069e-39
        Markov Test Estimate (bit string) = 0.998825 / 1 bit(s)
Bitstring Compression Estimate: X-bar = 5.2177154580149221, sigma-hat = 1.0146812433751566, p = 0.024829087768112323
        Compression Test Estimate (bit string) = 0.888637 / 1 bit(s)

Running Tuple Estimates...
Bitstring t-Tuple Estimate: t = 18, p-hat_max = 0.5252200659857931316476, p_u = 0.5258632036900274298085
Bitstring LRS Estimate: u = 19, v = 41, p-hat = 0.49998108984273857, p_u = 0.50062504724865993
        T-Tuple Test Estimate (bit string) = 0.927241 / 1 bit(s)
Literal t-Tuple Estimate: t = 1, p-hat_max = 0.004205999999999999999829, p_u = 0.004441750106970585173453
Literal LRS Estimate: u = 2, v = 4, p-hat = 0.003907713861229295, p_u = 0.0041349846806774507
        T-Tuple Test Estimate = 7.814656 / 8 bit(s)
        LRS Test Estimate (bit string) = 0.998198 / 1 bit(s)
        LRS Test Estimate = 7.917902 / 8 bit(s)

Running Predictor Estimates...
Bitstring MultiMCW Prediction Estimate: N = 3999937, Pglobal' = 0.50086034082526742 (C = 2000834) Plocal can't affect result (r = 19)
        Multi Most Common in Window (MultiMCW) Prediction Test Estimate (bit string) = 0.997520 / 1 bit(s)
Literal MultiMCW Prediction Estimate: N = 499937, Pglobal' = 0.0041831345534559658 (C = 1977) Plocal can't affect result (r = 3)
        Multi Most Common in Window (MultiMCW) Prediction Test Estimate = 7.901200 / 8 bit(s)
Bitstring Lag Prediction Estimate: N = 3999999, Pglobal' = 0.50108358234786721 (C = 2001758) Plocal can't affect result (r = 20)
        Lag Prediction Test Estimate (bit string) = 0.996877 / 1 bit(s)
Literal Lag Prediction Estimate: N = 499999, Pglobal' = 0.0041229395067461441 (C = 1948) Plocal can't affect result (r = 3)
        Lag Prediction Test Estimate = 7.922111 / 8 bit(s)
Bitstring MultiMMC Prediction Estimate: N = 3999998, Pglobal' = 0.5007807076116616 (C = 2000546) Plocal can't affect result (r = 19)
        Multi Markov Model with Counting (MultiMMC) Prediction Test Estimate (bit string) = 0.997749 / 1 bit(s)
Literal MultiMMC Prediction Estimate: N = 499998, Pglobal' = 0.004155874273437418 (C = 1964) Plocal can't affect result (r = 3)
        Multi Markov Model with Counting (MultiMMC) Prediction Test Estimate = 7.910632 / 8 bit(s)
Bitstring LZ78Y Prediction Estimate: N = 3999983, Pglobal' = 0.50072708411917954 (C = 2000324) Plocal can't affect result (r = 24)
        LZ78Y Prediction Test Estimate (bit string) = 0.997904 / 1 bit(s)
Literal LZ78Y Prediction Estimate: N = 499983, Pglobal' = 0.0041539410832216817 (C = 1963) Plocal can't affect result (r = 3)
        LZ78Y Prediction Test Estimate = 7.911304 / 8 bit(s)

H_original: 7.814656
H_bitstring: 0.888637
min(H_original, 8 X H_bitstring): 7.109100
```

**Reading the result:** SP 800-90B takes the *most pessimistic* estimator across all tests. Our raw source is credited with **7.109 bits of min-entropy per byte** — meaning even under the most conservative predictor, an attacker guessing the next byte succeeds with probability no better than 2^-7.109.

**NIST SP 800-90B — vetted conditioning**

Feeding 368 input bits carrying 327.02 bits of entropy through the SHA-256 conditioning component to produce 256 output bits:

```plaintext
./ea_conditioning -v 368 256 256 327.0186
n_in = 368
n_out = 256
nw = 256
h_in = 327.0185999999999999776
Attempting to compute entropy with 736 bits of precision.
Output_Entropy(*) = 255.9999999999999996252
(Vetted) h_out = 255.9999999999999996252
epsilon = 2^(-59.23561681352755137891): FIPS 140-3 IG D.K Resolution 19 Full Entropy if the conditioning component security strength is >= 256
```

The output carries 255.99999999999999963 bits of entropy in a 256-bit block — this qualifies as **full entropy** under FIPS 140-3 IG D.K Resolution 19, since SHA-256's conditioning security strength is 256.

### **9. Threat Model & Security Boundaries**

Being explicit about what a system does *not* defend against is part of designing an entropy source. Ours targets low-to-moderate priority security applications, and the boundaries below are why.

**Defended against:**

| Threat | Mitigation |
|---|---|
| Algorithmic prediction (attacker reads the source code) | Output depends on analog measurements, not on any seed derivable from the program |
| Silent source failure | Continuous SP 800-90B health tests + per-source quality scoring (Features 6–7) |
| Over-counting correlated sources | Pairwise Pearson correlation discounting |
| One compromised sensor | Hash-based pool — a controlled source can add nothing but cannot subtract entropy |
| State compromise revealing past output | ChaCha20 key ratcheting after every `fill()` gives forward secrecy |
| Output-stream bias from raw ADC skew | SHA-256 conditioning, certified full entropy under FIPS 140-3 IG D.K |
| Memory exhaustion via oversized payload | 64 KB sample cap in the health monitor |

**Explicitly NOT defended against:**

- **A local network attacker.** MQTT runs over plaintext TCP with username/password auth. Anyone on the LAN can read the raw entropy stream in transit, and raw entropy read by an attacker is entropy that attacker now shares. **Adding TLS/mTLS is the single most important hardening step and is listed first in Contribution Notes.** Until then, treat the broker network as trusted.
- **Physical access to the box.** An attacker who can illuminate the light sensor, hold the IMU still, and clamp the MOSFET gate reduces available entropy. The health tests will *detect* the resulting degradation, but detection is not prevention.
- **A malicious MQTT publisher.** Anyone who can reach the broker can inject bytes. The hash-based pool means injected data cannot lower the pool's entropy, but it can inflate the *apparent* sample rate.
- **Side-channel and EM analysis.** Out of scope; no shielding or constant-time analog path was attempted.
- **Certification.** We ran the NIST SP 800-22 and SP 800-90B *tools* and report their output honestly. That is validation evidence, **not** a NIST or FIPS certification, which requires an accredited laboratory. We make no certification claim.

### **10. OTP Generation**

One-time passwords are generated by combining a hardware random number with a microsecond timestamp:

```plaintext
OTP = SHA-256(random_number_bytes || timestamp_bytes) mod 1,000,000
```

This produces a 6-digit code. The random number comes from TU Ankaja hardware — not from a pseudo-random generator — and the timestamp guarantees uniqueness even in the unlikely case that the same number appears twice.

The modulo introduces a negligible bias: SHA-256's 256-bit output reduced mod 10^6 has a modulo-bias on the order of 2^-236, far below any practical threshold.

### **11. Real-Time Dashboard (Next.js)**

Three pages, each serving a different purpose:

- **OTP Generator** — generate hardware-backed OTPs with one click. Shows the source number, timestamp, and full generation history.
- **Raw Data Viewer** — live sensor graphs for all 21 channels, updating every 3 seconds straight off the MQTT stream.
- **Entropy Engine** — pipeline statistics, per-source quality scores, and the live SP 800-90B health status of the entropy source.

### **12. MYOSA Libraries & Modules Used**

| MYOSA Module | Library / Interface | Purpose |
|---|---|---|
| MYOSA Motherboard (ESP32) | `WiFi.h`, `PubSubClient.h`, DAC (`dacWrite`), ADC (`analogRead`) | WiFi connectivity, MQTT publishing, MOSFET gate drive, noise sampling |
| MYOSA Accelerometer/Gyroscope | `Wire.h` (I2C, address `0x68`) | 6-axis motion data (accel x/y/z, gyro x/y/z) for entropy mixing |
| MYOSA Light/Proximity (APDS9960) | `LightProximityAndGesture.h` (I2C) | RGB colour values and ambient light intensity |
| MYOSA OLED Display | `oled.h` (I2C) | On-device status display |
| PMS5003 Particle Sensor | UART (`Serial2`) | PM1.0, PM2.5, PM10 particle concentration readings |

> **Note:** The PMS5003 is an external sensor not included in the standard MYOSA kit. It was added to increase the number of independent entropy sources.

### **13. Design Decisions & Challenges**

**Why not just use the ESP32's built-in `esp_random()`?** It is a hardware RNG, but it is a single opaque source with no way to inspect or health-check it. We use it only to *drive the MOSFET gate*, never as an entropy source — deliberately, so that the entropy in the output comes from the analog domain rather than from the chip vendor's black box.

**Fixed gate bias produced almost no entropy.** Our first circuit held the gate at a constant voltage. The ADC readings clustered tightly around a single value and the min-entropy estimate collapsed. Sweeping the gate through the transition region was the fix.

**Correlated sensors inflate entropy estimates.** Early on we summed per-sensor entropy estimates and got an implausibly high total. The fan vibration was driving the accelerometer and the gyroscope in lockstep. Adding pairwise Pearson correlation tracking to the quality module (Feature 4) discounted the correlated pair and produced an honest number.

**MQTT decoupling.** Sampling directly over a serial link tied the entropy rate to the host's polling loop. Publishing batched entropy bytes over MQTT lets the ESP32 sample at its own rate and survive transient WiFi loss without stalling the pipeline.

### **14. How TU Ankaja Compares**

| Approach | Entropy source | Inspectable? | Health monitored? | Cost | Trade-off |
|---|---|---|---|---|---|
| `rand()` / Mersenne Twister | None — deterministic | Yes | No | Free | Fully predictable from the seed; never acceptable for keys |
| `/dev/urandom` | OS pool (interrupts, timing) | Partially | By the kernel | Free | Excellent in practice, but unavailable on bare-metal MCUs |
| Intel RDRAND | On-die thermal noise | **No — opaque** | Internal only | Built in | Strong, but you must trust the vendor's unauditable black box |
| ESP32 `esp_random()` | On-die RNG | **No — opaque** | None exposed | Built in | Convenient; no way to detect degradation |
| Avalanche-diode TRNG board | Reverse-biased junction noise | Yes | Varies | ~$50–200 | Excellent entropy density; extra hardware, single source |
| **TU Ankaja** | MOSFET transition-region noise + 21 sensor channels | **Yes — fully open** | **Yes, continuously, per source** | ~$25 in parts | Lower raw rate than a dedicated diode board; auditable end to end and fails loudly |

The design point is not "the fastest entropy" — it is **auditability**. Every stage, from the resistor values to the DRBG ratchet, is open and measurable, and the system reports its own health rather than asking to be trusted.

### **15. Known Limitations & Future Work**

Stated plainly, because a validation report that lists no weaknesses has usually not looked hard enough.

1. **MQTT is unencrypted.** The most significant weakness. Entropy in transit is readable on the LAN. TLS/mTLS is the top priority.
2. **Sample size below the NIST recommendation.** The SP 800-90B run used 500,000 samples; the tool warns that it prefers ≥ 1,000,000. Our estimate is usable but should be re-run on a longer capture.
3. **Modest throughput.** A 100 Hz sample loop with 64-byte publishes every 500 ms is fine for OTPs and nonces, but it is not a high-rate entropy service. A hardware-timer-driven sampler with DMA would raise this substantially.
4. **Environmental dependence is uncharacterised.** Entropy rate almost certainly varies with temperature, ambient light, and how much dust is in the box. We have not measured that curve — it is listed in Contribution Notes.
5. **Sampling uses a software loop, not a hardware timer.** Loop jitter currently *helps* entropy, but it also means the sample rate is not deterministic, which complicates precise rate accounting.
6. **Single-board deployment.** All sources share one ESP32, one power rail, and one clock. A power-supply fault is a common-mode failure across every channel simultaneously — correlation tracking would flag it, but the architecture cannot avoid it.

---

## Usage Instructions

### Starting the Full Wireless Pipeline

1. Flash the ESP32 with the MQTT firmware:

```plaintext
cd firmware/mqtt
# Open entropy_mqtt.ino in Arduino IDE
# Update WIFI_SSID, WIFI_PASS, MQTT_SERVER
# Flash to ESP32
```

2. Start the Mosquitto MQTT broker:

```plaintext
mosquitto -d
```

3. Start the Rust backend:

```plaintext
./scripts/start-wireless.sh
```

Or manually with environment variables:

```plaintext
cd entropy-engine
ENTROPY_MODE=otp \
  MQTT_HOST=<your-broker-ip> \
  MQTT_PORT=1883 \
  MQTT_USER=<your-mqtt-username> \
  MQTT_PASS=<your-mqtt-password> \
  cargo run
```

4. Start the frontend dashboard:

```plaintext
cd frontend
npm install
npm run dev
```

5. Open `http://localhost:3000` in your browser.

### Running Without Hardware (Simulation)

If you do not have the ESP32 or MYOSA board, you can test the whole pipeline with the simulator:

```plaintext
# Terminal 1: Start Mosquitto
mosquitto -d

# Terminal 2: Run the MQTT simulator
python3 scripts/mqtt_simulator.py

# Terminal 3: Start the engine in MQTT mode
cd entropy-engine
ENTROPY_MODE=mqtt cargo run

# Terminal 4: Start the dashboard
cd frontend && npm run dev
```

### Running the Firmware Simulator (No WiFi needed)

```plaintext
cd firmware
make run
```

This compiles and runs the C entropy simulator locally, printing a sample of generated entropy bytes.

### Reproducing the NIST Validation

```plaintext
# Capture raw entropy to a binary file, then run the NIST SP 800-90B tools
./ea_non_iid -i -v clean.bin 8
./ea_conditioning -v 368 256 256 327.0186
```

---

## Tech Stack

* **ESP32 (MYOSA Motherboard)** — microcontroller with built-in WiFi for wireless sensor data transmission
* **MYOSA Sensor Board** — 21-channel multi-sensor board (MOSFET noise, IMU, colour, light, particle sensor)
* **IRF540N MOSFET** — n-channel MOSFET for analog noise generation (primary entropy source)
* **APDS9960** — RGB and ambient light sensor module
* **PMS5003** — particulate matter sensor for air quality readings
* **C** — firmware for ADC noise reading and entropy mixing with avalanche function
* **Arduino (PubSubClient)** — MQTT client library for ESP32 WiFi publishing
* **Rust** — backend with SHA-256 whitening, ChaCha20 DRBG, health monitoring, and HTTP API
* **rumqttc** — Rust MQTT client for subscribing to broker topics
* **axum** — Rust HTTP framework serving the REST API
* **Eclipse Mosquitto** — MQTT broker with username/password authentication
* **Next.js 16** — React framework for the dashboard frontend
* **Recharts** — charting library for real-time sensor data visualization
* **Framer Motion** — animation library for smooth UI transitions
* **Zustand** — lightweight state management for React
* **Tailwind CSS v4** — utility-first CSS framework
* **NIST SP 800-22 / SP 800-90B tools** — statistical validation of the entropy source

---

## Requirements / Installation

### Hardware Requirements

- MYOSA Motherboard (ESP32-based)
- MYOSA OLED Display
- MYOSA Accelerometer/Gyroscope Module
- MYOSA Light/Proximity Module (APDS9960)
- Particle Sensor (PMS5003)
- IRF540N n-channel MOSFET
- 2 kΩ pull-up resistor, 82 Ω gate resistor
- L298N motor driver, DC motor, RGB LEDs, PC fan
- Breadboard/perfboard and jumper wires
- 45 cm × 45 cm enclosure with mirrored inner walls

### Software Requirements

- Rust toolchain (1.70+)
- Node.js (18+)
- Python 3 (for the MQTT simulator)
- Arduino IDE (for flashing the ESP32)
- Eclipse Mosquitto MQTT broker

### Dependencies

Rust engine:

```plaintext
cd entropy-engine
cargo build
```

Frontend:

```plaintext
cd frontend
npm install
```

Python simulator:

```plaintext
pip install paho-mqtt
```

MQTT broker:

```plaintext
brew install mosquitto
```

### Quick Check (All Components)

```plaintext
./scripts/check-all.sh
```

This runs the firmware simulator, the Rust test suite (96 tests), and frontend type checking.

---

## File Structure

```
/tu-ankaja
  ├── tu-ankaja.md                 <- this blog submission
  ├── myosa-demo.mp4               <- demonstration video
  │
  ├── assets/
  │   └── images/
  │       └── tu-ankaja/
  │           ├── cover.jpg
  │           ├── blockdiagram.jpg
  │           ├── mosfet-circuit-closeup.jpg
  │           ├── chaotic-box-inside-full.jpg
  │           ├── chaotic-box-sensors.jpg
  │           ├── chaotic-box-motor.jpg
  │           ├── dashboard-raw-data.png
  │           ├── dashboard-otp.png
  │           └── nist.png
  │
  ├── firmware/
  │   ├── src/
  │   │   ├── main.c
  │   │   ├── adc/adc.c
  │   │   ├── sensors/sensors.c
  │   │   ├── entropy/entropy.c
  │   │   └── uart/uart.c
  │   ├── include/entropy_vault.h
  │   ├── mqtt/entropy_mqtt.ino
  │   └── Makefile
  │
  ├── entropy-engine/
  │   ├── src/
  │   │   ├── main.rs
  │   │   ├── lib.rs
  │   │   ├── api/mod.rs
  │   │   ├── whitening/mod.rs
  │   │   ├── pool/mod.rs
  │   │   ├── drbg/mod.rs
  │   │   ├── health/mod.rs
  │   │   ├── quality/mod.rs
  │   │   ├── security/mod.rs
  │   │   ├── crypto/mod.rs
  │   │   ├── mqtt/mod.rs
  │   │   ├── otp/mod.rs
  │   │   ├── otp_mqtt/mod.rs
  │   │   ├── server/mod.rs
  │   │   ├── parser/mod.rs
  │   │   ├── serial/mod.rs
  │   │   ├── models/mod.rs
  │   │   └── errors/mod.rs
  │   ├── tests/engine.rs
  │   └── Cargo.toml
  │
  ├── frontend/
  │   ├── app/
  │   │   ├── page.tsx
  │   │   ├── otp/page.tsx
  │   │   ├── data/page.tsx
  │   │   ├── entropy/page.tsx
  │   │   └── layout.tsx
  │   ├── components/
  │   ├── services/
  │   ├── store/
  │   ├── types/
  │   └── package.json
  │
  ├── scripts/
  │   ├── start-wireless.sh
  │   ├── mqtt_simulator.py
  │   ├── otp_simulator.py
  │   ├── check-all.sh
  │   ├── flash-esp32.sh
  │   └── start_all.sh
  │
  └── LICENSE
```

---

## License

MIT License. See the LICENSE file for the full text.

---

## Contribution Notes

This project is open source. To contribute:

1. Fork the repository
2. Create a feature branch
3. Run `./scripts/check-all.sh` to make sure everything passes
4. Submit a pull request

Areas where contributions would be useful:

- Adding TLS/mTLS support for encrypted MQTT connections
- Extending the automated health-test suite with the full NIST SP 800-22 battery run in CI
- A mobile app for monitoring the dashboard remotely
- Characterising entropy rate versus temperature to quantify environmental dependence
