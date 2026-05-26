---
publishDate: 2026-05-24
title: SafeStride
excerpt: A wearable ESP32 belt and Android app that checks walking pattern and sends a fall alert.
image: SafeStride/safestride-cover.jpg
tags:
  - wearable
  - healthcare
  - esp32
  - machine-learning
  - android
  - bluetooth
---

> SafeStride is a smart belt that can check gait in real time and warn the user when a fall is detected.

---

## Acknowledgements

This project was made for the MYOSA 5.0 competition. We used the MYOSA ESP32 kit, motion sensors, a phone app, and a machine learning model. We also used the public Felius lower-back IMU gait dataset to help train the gait model. We also collected over 40 minutes of our own walking data from multiple people to make the model fit our real MYOSA hardware better.

---

## Overview

SafeStride is a wearable belt for people who need help monitoring their walking safety. The main idea is simple: the belt reads body movement, the ESP32 checks the walking pattern, and the phone app shows the result.

The system can show if the walking looks healthy, stroke-like, or still being checked. It can also detect a fall and show a warning on the phone. The phone does not run the machine learning model. The ESP32 does the main work, then sends live data to the app using Bluetooth Low Energy.

This can be useful for elderly people, stroke recovery patients, caregivers, or students who want to study how sensor data can be used in health projects. It is not a medical device yet, but it is a working prototype that shows the idea clearly.

### Why this fits MYOSA

MYOSA is about making working sensor-based prototypes and showing them live. SafeStride fits this aim because it uses the MYOSA kit, reads live sensor data, sends it by Bluetooth, and shows the result in an Android app. It is not only an idea on paper. It is a real prototype that can be worn and tested.

**Source code:** <https://github.com/SSx1t/SafeStride>

---

## Demo / Examples

### Images

#### Real Prototype Photos

<p align="center">
  <img src="/assets/images/SafeStride/project-table-photo.jpg" width="800"><br/>
  <i>SafeStride belt prototype with the sensor box and power bank.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/project-worn-side.jpg" width="800"><br/>
  <i>The belt worn on the lower back, where lower-back motion can be measured.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/project-worn-closeup.jpg" width="800"><br/>
  <i>Close view of the 3D printed box while the belt is being worn.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/project-mounted-closeup.jpg" width="800"><br/>
  <i>The sensor box mounted on the belt during testing.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/project-case-window.jpg" width="800"><br/>
  <i>Case window showing the internal sensor board.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/project-electronics-open.jpg" width="800"><br/>
  <i>Inside the project box, with the boards, wiring, and power connection.</i>
</p>

#### Android App Screenshots

<p align="center">
  <img src="/assets/images/SafeStride/app-live-session.jpg" width="800"><br/>
  <i>Live session screen showing the current gait result, confidence bar, steps, cadence, and accelerometer graph.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/app-fall-detected.jpg" width="800"><br/>
  <i>Fall alert popup. The phone shows the impact, drop, and rotation values.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/app-trends.jpg" width="800"><br/>
  <i>Trends screen showing healthy percentage, cadence, steps, and session history summary.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/app-history.jpg" width="800"><br/>
  <i>History screen showing previous walking test sessions.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/app-session-detail.jpg" width="800"><br/>
  <i>Session detail screen showing score, duration, steps, cadence, and gait timeline.</i>
</p>

#### Visual Diagrams and Results

<p align="center">
  <img src="/assets/images/SafeStride/system-flow-diagram.png" width="800"><br/>
  <i>Simple view of how the belt, ESP32, Bluetooth, phone app, and user alerts connect together.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/model-results-chart.png" width="800"><br/>
  <i>Model test results from leave-one-subject-out cross validation.</i>
</p>

<p align="center">
  <img src="/assets/images/SafeStride/feature-importance.png" width="800"><br/>
  <i>Feature importance graph showing which gait features helped the model most.</i>
</p>

### Videos

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/EJhXexc7Oi4"></iframe>
</div>


In the demo, there may be a short moment where the app still shows healthy during a stroke-like part. This can happen around a U-turn because the person was turning while still walking normally. The model is also looking at the last 10 seconds of movement, not only the current step. This is expected for a stable gait window and does not mean the model is broken.

---

## Features (Detailed)

### 1. Wearable Sensor Belt

**What it does:**  
The user wears the belt around the lower back. The box on the belt holds the electronics and reads body movement while the person walks.

**How it works:**  
The belt uses motion sensors to measure acceleration and rotation. It also uses a barometer to help notice height changes, which is useful for fall detection. The ESP32 reads this data many times per second.

**Why it is useful:**  
The lower back is a good place to measure walking movement because it is near the center of the body. This makes the data useful for checking gait and possible fall events.

### 2. Real-Time Gait Checking on ESP32

**What it does:**  
SafeStride checks if the walking pattern looks healthy or stroke-like. The result is sent to the phone while the person is walking.

**How it works:**  
The ESP32 collects a 10 second window of movement data. It makes a new check about every 500 ms, but each check still uses the latest 10 seconds of walking data. It then calculates gait features like step count, cadence, side movement, rotation, and jerk. These features go into a Random Forest machine learning model with 20 trees.

**Why it is useful:**  
The phone does not need to do heavy processing. This makes the system faster and more independent. It also shows that a small microcontroller can do useful health-related analysis.

The 10 second window is a design choice. It makes the result more stable because the model sees several steps instead of only one small movement. The tradeoff is that when the walking style changes from healthy to stroke-like, or from stroke-like back to healthy, the app may take a short time before the label fully changes. This is normal for a window-based gait model, not a bug.

The window size is also a hyperparameter. This means it is a setting we can choose and test. In a future version, a smaller window could make the app react faster, but it must be tested carefully so the result does not become too noisy or jumpy.

### 3. Fall Detection and Alert

**What it does:**  
The belt can detect a fall-like event and send an alert to the Android app.

**How it works:**  
The ESP32 looks for a strong impact, a small height drop, and either fast body rotation or a short free-fall moment. If these happen together, it sends a fall event to the phone.

**Why it is useful:**  
Falls are dangerous for elderly people and people recovering from health problems. A quick phone alert can help the user or nearby person react faster.

### 4. Android Companion App

**What it does:**  
The app shows the live gait result, confidence bar, steps, cadence, trends, history, and fall popup.

**How it works:**  
The app connects to the belt using Bluetooth Low Energy. It receives sensor packets, machine learning results, and fall events. It then shows the information in simple screens.

**Why it is useful:**  
The user can see the result without needing a computer. The app also makes the prototype easier to demo because the judges can see live values and the fall warning clearly.

### 5. Model Training and Testing

**What it does:**  
The project includes a training pipeline so the model can be tested and rebuilt.

**How it works:**  
The model was trained using the public Felius gait dataset and over 40 minutes of new data we collected ourselves from multiple people using our MYOSA hardware. We used CORAL domain adaptation to reduce the difference between public dataset data and our real hardware data. The final v3.5 model was tested using leave-one-subject-out cross validation.

**Why it is useful:**  
This makes the project more than just a demo app. It also shows how the model was made, tested, and exported to the ESP32 firmware.

**Main model results:**

* Accuracy: 84.7%
* AUC: 88.1%
* Healthy recall: 71.9%
* Stroke recall: 87.0%

### 6. Complete Project Package

**What it does:**  
The project folder includes the firmware, Android source code, APK, model scripts, model files, training inputs, and fall test recordings.

**How it works:**  
The firmware runs on the ESP32. The Android project builds the app. The Python scripts retrain and test the model. The fall detection script replays recorded fall data.

**Why it is useful:**  
This makes the project easier to review and improve later. Another person can see how the prototype was built instead of only seeing the final app.

---

## Key Code Snippets

These snippets are shortened for the blog. The full source code is inside `final_submission/`.

### 1. Data Logging and BLE Streaming

**Source:** `final_submission/firmware/Version3.ino`

```cpp
unsigned long t = millis() - recordStart;

char buf[128];
int n = snprintf(buf, sizeof(buf),
                 "%lu,%.2f,%.2f,%.2f,%.2f,%.2f,%.2f,%.3f",
                 t, out_ax, out_ay, out_az, out_gx, out_gy, out_gz, cachedAlt);

if (n > 0 && deviceConnected) {
  logChar->setValue(std::string(buf));
  logChar->notify();
}
```

**What this code does:**

This sends one sensor row to the phone. The row has time, accelerometer values, gyroscope values, and altitude.

**Why it matters:**

This is the live data stream used by the app for charts and for collecting new training data from our own hardware.

### 2. On-Device Gait Inference

**Source:** `final_submission/firmware/Version3.ino`

```cpp
void runGaitInferenceIfReady() {
  if (gaitCount < GAIT_WINDOW_SAMPLES) return;
  if (samplesSincePrediction < GAIT_PREDICTION_STEP) return;
  samplesSincePrediction = 0;

  copyGaitWindow();

  float features[18];
  if (!extractGaitFeatures(gaitWin, features)) return;

  MlLabel rawLabel = LABEL_NO_GAIT;
  if (isValidGaitWindow(features)) {
    int pred = gaitClassifier.predict(features);
    rawLabel = (pred == 0) ? LABEL_HEALTHY_GAIT : LABEL_STROKE_GAIT;
  }

  MlLabel stableLabel = mlSmoother.update(rawLabel);
  publishMlLabel(rawLabel, stableLabel, features);
}
```

**What this code does:**

This is where the ESP32 makes the gait decision. It waits until the 10 second window is ready, calculates 18 features, runs the Random Forest model, smooths the result, and sends it to the app.

**Why it matters:**

The phone does not run the machine learning model. The belt can make the decision by itself and only send the final result.

### 3. Fall Detection Rule

**Source:** `final_submission/firmware/Version3.ino`

```cpp
bool impactOk = impactMax >= FALL_IMPACT_G;
bool altOk    = altDrop   >= FALL_ALT_DROP_M;
bool gyroOk   = gyroMax   >= FALL_GYRO_DPS;
bool ffOk     = longestFf >= FALL_FF_MIN;

return impactOk && altOk && (gyroOk || ffOk);
```

**What this code does:**

This checks for a fall-like pattern. The belt looks for a strong impact, a small height drop, and either fast rotation or a short free-fall moment.

**Why it matters:**

Using more than one signal helps reduce false alerts. The app only shows the fall popup when the pattern looks more serious.

### 4. Android BLE Packet Parsing

**Source:** `final_submission/app_source/StrideSafe/app/src/main/java/com/example/stridesafe/ble/PacketCodec.kt`

```kotlin
fun decodeMl(bytes: ByteArray): MlPacket? {
    val text = bytes.toString(Charsets.US_ASCII).trim()
    val parts = text.split(',')
    if (parts.size < 9) return null

    return runCatching {
        MlPacket(
            timestampMs  = parts[0].trim().toLong(),
            raw          = parseLabel(parts[1].trim()),
            stable       = parseLabel(parts[2].trim()),
            stepCount    = parts[3].trim().toFloat().toInt(),
            cadenceSpm   = parts[4].trim().toFloat(),
            stepAc       = parts[5].trim().toFloat(),
            healthyCount = parts[6].trim().toInt(),
            strokeCount  = parts[7].trim().toInt(),
            validCount   = parts[8].trim().toInt()
        )
    }.getOrNull()
}
```

**What this code does:**

This converts the ESP32 CSV message into an Android `MlPacket`. The app can then use normal Kotlin data instead of raw text.

**Why it matters:**

This keeps the app simple. The firmware sends small text packets, and the phone turns them into live screen values.

### 5. Android Live Session Logic

**Source:** `final_submission/app_source/StrideSafe/app/src/main/java/com/example/stridesafe/data/StrideSafeRepository.kt`

```kotlin
mlProcessingJob = scope.launch {
    mgr.ml.collect { packet ->
        if (!_sessionActive.value) return@collect
        _bleMetrics.value = aggregator.ingest(packet)
    }
}

fallProcessingJob = scope.launch {
    mgr.falls.collect { fall ->
        _bleFalls.tryEmit(fall)
    }
}
```

**What this code does:**

This listens to machine learning packets and fall packets from BLE. ML packets update the live session screen. Fall packets go straight to the fall alert flow.

**Why it matters:**

The app reacts while the user is walking. It can update the score, timeline, steps, and fall popup without waiting until the end.

### 6. Model Training and Export

**Source:** `final_submission/model/retrain_v3_5.py`

```python
A, mu_s, mu_t = fit_coral(X_felius_H, X_ours_H)
X_felius_H_a = apply_coral(X_felius_H, A, mu_s, mu_t)
X_felius_S_a = apply_coral(X_felius_S, A, mu_s, mu_t)

clf_final = RandomForestClassifier(
    n_estimators=20,
    max_depth=9,
    min_samples_leaf=10,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1
)
clf_final.fit(X, y)

from micromlgen import port
c_code = port(clf_final, classname='GaitClassifier')
```

**What this code does:**

This trains the model and exports it so Arduino can run it. CORAL helps align the public Felius data with our own hardware data.

**Why it matters:**

The same training script can rebuild the model, save the results, and generate the C++ model file used by the ESP32.

SafeStride is still a student prototype and not a medical device. These snippets show how the main parts work, but more testing is needed before real health use.

---

## Usage Instructions

### 1. Flash the Firmware

Open `firmware/Version3.ino` in Arduino IDE 2.x. Install the ESP32 board package and the `NimBLE-Arduino` library. Keep `gait_model.h` in the same folder as the sketch, then upload the sketch to the ESP32.

### 2. Install the Android App

Install the APK on an Android 7+ phone:

```plaintext
adb install -r apk/StrideSafe-V3-debug.apk
```

### 3. Connect the Belt

Power the ESP32 belt. Open the app. Tap the Bluetooth icon and choose `SafeStride-Logger`.

### 4. Start a Walking Test

Tap start session and walk for around 15 to 30 seconds. The first result appears after the first 10 second movement window is ready.

### 5. Rebuild the Model

From the final project package:

```plaintext
cd model
python retrain_v3_5.py
python eval_v3_5.py
```

### 6. Recheck Fall Detection

```plaintext
cd fall_detection
python analyze_falls.py
```

This script replays the recorded fall files and checks if the firmware rule detects them.

---

## Tech Stack

* **Hardware:** MYOSA ESP32 wearable, MPU6050 IMU, BMP180 barometer, Android phone.
* **Firmware:** Arduino C/C++, NimBLE-Arduino, on-device feature extraction, Random Forest model, fall detection rule.
* **Android app:** Kotlin, Jetpack Compose, Material 3, MVVM, Kotlin Flow, Nordic BLE Library.
* **Machine learning:** Python, NumPy, pandas, SciPy, scikit-learn, joblib, matplotlib, micromlgen.
* **Connection:** Bluetooth Low Energy.

---

## Requirements / Installation

**Firmware requirements:**

* Arduino IDE 2.x.
* ESP32 board package.
* NimBLE-Arduino library.
* MYOSA ESP32 wearable hardware.

**Android requirements:**

* Android 7.0 or newer.
* Bluetooth turned on.
* Bluetooth permissions accepted.
* Real Android phone for live BLE testing.

**Model requirements:**

```plaintext
pip install numpy pandas scipy scikit-learn joblib matplotlib micromlgen
```

---

## File Structure

This is the main repo layout. The Markdown file and video are at the repo root. The images are in `assets/images/SafeStride/` because MYOSA asks for image paths like `/assets/images/SafeStride/image-name.jpg`. The full code and data are kept in `final_submission/`.

```plaintext
SafeStride/                                      # Main GitHub repository folder
├── safestride.md                               # Main MYOSA Markdown submission file
├── safestride-demo.mp4                         # Local demo video used in the Markdown
├── assets/                                     # Public media folder for the MYOSA page
│   └── images/
│       └── SafeStride/                         # Project image folder, named after the project
│           ├── safestride-cover.jpg            # Cover image used in the front matter
│           ├── project-table-photo.jpg         # Real prototype photo
│           ├── project-worn-side.jpg           # Belt worn on the lower back
│           ├── project-worn-closeup.jpg        # Close view of the worn belt box
│           ├── project-mounted-closeup.jpg     # Sensor box mounted on the belt
│           ├── project-case-window.jpg         # Case window showing the sensor board
│           ├── project-electronics-open.jpg    # Inside view of wiring and boards
│           ├── app-live-session.jpg            # Android live session screen
│           ├── app-fall-detected.jpg           # Android fall alert screen
│           ├── app-trends.jpg                  # Android trends screen
│           ├── app-history.jpg                 # Android history screen
│           ├── app-session-detail.jpg          # Android session detail screen
│           ├── system-flow-diagram.png         # Simple system flow diagram
│           ├── model-results-chart.png         # Model result chart
│           └── feature-importance.png          # Model feature importance graph
├── final_submission/                           # Full project code, app, data, and scripts
│   ├── README.md                               # Full engineering documentation
│   ├── apk/                                    # Ready Android APK
│   │   └── StrideSafe-V3-debug.apk             # Installable Android app
│   ├── firmware/                               # ESP32 firmware for the wearable belt
│   │   ├── Version3.ino                        # Main microcontroller code
│   │   └── gait_model.h                        # Exported ML model for ESP32
│   ├── app_source/                             # Android source code
│   │   └── StrideSafe/                         # Kotlin / Jetpack Compose app project
│   ├── model/                                  # Model training and testing files
│   │   ├── retrain_v3_5.py                     # Main training script
│   │   ├── eval_v3_5.py                        # Model evaluation script
│   │   ├── rf_coral_F_v3_5.pkl                 # Trained Random Forest model
│   │   ├── coral_transform_v3_5.npz            # Data alignment transform
│   │   ├── feature_importance_v3_5.png         # Training feature importance graph
│   │   ├── cv_report_v3_5.txt                  # Cross-validation report
│   │   ├── eval_v3_5.txt                       # Final evaluation report
│   │   └── inputs/                             # Public and team-collected training data
│   ├── fall_detection/                         # Fall detection testing files
│   │   ├── analyze_falls.py                    # Fall replay/check script
│   │   └── fall_*.csv                          # Recorded fall test files
│   ├── screenshots_of_the_app/                 # Original app screenshots
│   └── screenshots_of_the_project/             # Original real-life project photos
└── .gitignore                                  # Keeps old local work out of the clean repo view
```

---

## License 

This is original student work made for MYOSA 5.0. The app screenshots, prototype photos, firmware, Android code, and training scripts are from our own project. The public Felius gait dataset was used only to help train and test the gait model.

---

## Contribution Notes 

This project can be improved later by:

* Testing with more real users.
* Adding more slow walking data.
* Testing with real stroke patients with proper approval.
* Testing smaller gait window sizes to make healthy and stroke-like transitions faster while keeping the result stable.
* Measuring false alarms during normal daily actions.
* Making the fall alert work even when the app is in the background.
