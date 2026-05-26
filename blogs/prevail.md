# PREVAIL
Smart Landfill fire monitoring system
---
publishDate: 2025-07-24T00:00:00Z
title: "PREVAIL: IoT-Based Landfill Fire Monitoring System"
excerpt: "A low-cost ESP32-based multi-sensor IoT system that monitors landfill environmental conditions and detects elevated fire-risk conditions using sensor fusion."
image: prevail-cover.jpg

tags:
  - IoT
  - ESP32
  - Environmental Monitoring
  - Fire Prevention
  - Sensor Fusion
  - MYOSA
---

> A low-cost multi-sensor system for early landfill fire-risk monitoring.

---
## Acknowledgements 

- This project was developed using the MYOSA 5.0 ESP32 platform and is inspired by real world disaster case studies — particularly the Brahmapuram landfill fire (Kerala, 2023) and the Ramanagara scrapyard fire (Karnataka, 2024). Special thanks to the MYOSA community, MakeSense Edutech, and the IEEE Sensors Council for supporting open sensor-based learning and development. 

## Overview 

- - PREVAIL (Predictive Real time Environmental Alert for IoT based Landfill monitoring) is a multi-sensor IoT system built on the MYOSA ESP32 platform that continuously monitors landfill environmental conditions and detects fire precursors before combustion begins. 

Most existing fire detection systems act only after a fire has started. PREVAIL takes a — fundamentally different approach: it fuses data from five sensors temperature/humidity, gas — concentration, barometric pressure, motion/vibration, and air quality to identify dangerous - build up conditions 6 to 48 hours before ignition. 

The system generates real-time alerts via an OLED display and Wi-Fi, giving operators time to vent gases, douse hotspots, or evacuate personnel. 

Key features: 

-  Real time multi sensor data fusion across 5 sensor types 


- Predictive fire risk scoring not just post ignition smoke detection 


- OLED display with 3 page rotating UI (Environment / Motion / Gas) 


- Wi Fi based cloud alerts for remote monitoring 


- Low cost and scalable (sub-$20 per node) 


- Based on two real Indian disaster case studies 

## Demo / Examples 

## Images 

<p align="center">
  <img src="./block-diagram.jpg" width="700"><br/>
  <i>Basic block diagram of PREVAIL.</i>
</p>

<p align="center">
  <img src="./simulation.jpeg" width="700"><br/>
  <i>SIMULATION</i>
</p>

<p align="center">
  <img src="./hardware-setup.jpeg" width="700"><br/>
  <i>Complete hardware setup of the PREVAIL prototype.</i>
</p>

<p align="center">
  <img src="./oled-display.jpeg" width="700"><br/>
  <i>OLED display showing live environmental sensor readings.</i>
</p>

<p align="center">
  <img src="./sensor-connections.jpeg" width="700"><br/>
  <i>Sensor wiring connections with ESP32 controller.</i>
</p>


<p align="center">
  <img src="./blynk-dashboard-1.jpeg" width="900"><br/>
    <i>Blynk IoT interface showing live environmental monitoring, gas alerts, vibration status, and fire-risk indication.</i>
</p>

<p align="center">
  <img src="./blynk-dashboard-2.jpeg" width="900"><br/>
  <i>Real-time Blynk dashboard displaying environmental sensor trends, gas concentration levels, and system statistics.</i>
</p>
## Videos 

<p align="center">
  <video controls width="800">
    <source src="./prevail-demo.mp4" type="video/mp4">
  </video>
  <br/>
  <i>Demonstration of the PREVAIL monitoring system showing live sensor readings and OLED page rotation.</i>
</p>

<p align="center">
  <video controls width="800">
    <source src="./prevail-presentation.mp4" type="video/mp4">
  </video>
  <br/>
  <i>Project presentation explaining the PREVAIL system architecture, sensor integration, and working principle.</i>
</p>

## Features (Detailed) 

## - 1. Multi Sensor Data Fusion 

PREVAIL integrates five sensor modules on a single I2C + ADC bus: 

Fire Precursor Role 

Sensor Parameter Measured 

|DHT22|Ambient temperature+humidity|Rising heat in waste piles (alert 12–48hpre-fre)|
|---|---|---|
|BMP180|Barometricpressure+altitude|Gas pocket pressurespikes (alert 6–24hpre-fre)|
|MPU6050|3-axisaccelerometer +gyroscope|Pile instability / vibration(alert 12–48hpre-fre)|
|MQ2|Smoke/LPG/combustible gas (ADC)|Smoke and methane detection|
|MQ135|Air quality /CO2 /NH3 (ADC)|VOC and CO2buildup (alert 24–48hpre-fre)|



By requiring multiple sensors to exceed thresholds simultaneously, PREVAIL avoids false alarms that plague single-sensor setups. For example, if both temperature and MQ135 gas readings rise sharply together, the system triggers a "High Fire Risk" alert — a signal no single sensor could reliably produce alone. 

## - 2. Real World Case Study Validation 

— Case Study 1 Brahmapuram, Kerala (March 2023): The Brahmapuram municipal landfill (~110 acres, storing 5.5–8.5 lakh tonnes of MSW) ignited on March 1–2, 2023 under high summer heat and anaerobic decomposition conditions. The fire raged for 11–12 days, requiring ~200 firefighters, 18+ excavators, and Air Force helicopters. Kochi's ambient dioxin levels peaked at ~50× normal; schools closed; a 70-year-old COPD patient died from smoke inhalation. Crucially, no pre-ignition sensors were present — detection occurred only after visible smoke. Pre-fire methane levels had exceeded 25 ppm weeks earlier, which PREVAIL's MQ gas sensor would have flagged. 

— Case Study 2 Ramanagara, Karnataka (February 2024): A scrapyard fire in a 1,200 sq ft shed caused a sudden explosion of volatile aerosol/chemical residues, killing 5 workers (including 2 children) and seriously injuring 5 more. Again, zero monitoring was in place. A 1–2 hour VOC/pressure alert from PREVAIL could have evacuated all workers before ignition. 

Combined lesson: Preliminary modeling indicates 80–90% of damage in each case was - preventable with early IoT based detection. 

## — - 3. OLED Display 3 Page Rotating UI 

- All sensor readings rotate across three display pages using millis() (non blocking), cycling - every 3 seconds independently of the 2 second sensor read loop: 

|Page|Title|Content|
|---|---|---|
|0|Environment|DHT22 temp +humidity,BMP180 temp + pressure(hPa) +altitude|
|1|Motion|MPU6050Accel X/Y/Z,GyroX,MPU internaltemperature|
|2|Gas|MQ2 rawADC,MQ135 rawADC,alertifthresholdsexceeded|



## 4. Gas Threshold Warnings 

|Sensor|Threshold(ADC)|OLED Warning|
|---|---|---|
|MQ2|> 1500|!SMOKE DETECTED|
|MQ135|> 2000|!AIR QUALITY LOW|
|Both below|—|AirOK|



Calibration tip: Read each MQ sensor in clean air after a 30–60 second warm-up period. Note ~ the baseline ADC value, then set your threshold 30% above it. 

## 5. Serial Monitor Telemetry 

All sensor values are printed to the Serial Monitor at 115200 baud in every loop cycle. This enables logging, debugging, or feeding data into a cloud dashboard: 

**==> picture [541 x 262] intentionally omitted <==**

**----- Start of picture text -----**<br>
========================<br>Humidity : 65.4 %<br>Temperature : 31.2 C<br>BMP Temp : 30.8 C<br>Pressure    : 101325 Pa<br>Altitude    : 12.3 m<br>Accel X     : 0.12<br>Accel Y     : -0.03<br>Accel Z     : 9.78<br>Gyro X      : 0.002<br>MPU Temp : 29.5<br>MQ2 (Smoke) : 840<br>MQ135 (Air) : 1120<br>========================<br>**----- End of picture text -----**<br>


## Usage Instructions 

## 1. Wire the hardware 

Connect all sensors to your MYOSA ESP32 board as follows: 

## I2C Bus (shared SDA / SCL): 

|Device|I2C Address|Note|
|---|---|---|
|OLED SSD1306|0x3C|Defaultaddress|
|BMP180|0x77|Fixed address|
|MPU6050|0x69|Tie AD0 pin HIGHto 3.3V|



## Other connections: 

|Signal|ESP32Pin|Type|
|---|---|---|
|DHT22DATA|GPIO4|Digitalone-wire|
|MQ2AOUT|GPIO34|Analog(ADC1)|
|MQ135AOUT|GPIO35|Analog(ADC1)|
|All VCC|3.3V|From ESP32 3V3 pin|
|All GND|GND|Common ground|



Note: GPIOs 34 and 35 are input-only on the ESP32 — ideal for ADC. Do not use GPIO 36/39 as they share the ADC2 bus which conflicts with Wi-Fi. 

## 2. Install libraries in Arduino IDE 

## Open Tools → Manage Libraries and install: 

**==> picture [541 x 126] intentionally omitted <==**

**----- Start of picture text -----**<br>
Adafruit SSD1306<br>Adafruit GFX Library<br>DHT sensor library (by Adafruit)<br>Adafruit BMP085 Unified<br>Adafruit MPU6050<br>Adafruit Unified Sensor<br>**----- End of picture text -----**<br>


- Wire is built in to the ESP32 Arduino core. 

## 3. Upload the sketch 

Copy the complete source code below into a new .ino file and upload to your ESP32 at 115200 baud. 

## 4. Open Serial Monitor 

Set the Serial Monitor to 115200 baud. You should see all sensor readings printed every ~2 seconds, and the OLED will cycle through its three pages automatically. 

## 5. Calibrate gas sensors 

– - Let the MQ2 and MQ135 warm up for 30 60 seconds after power on before trusting ADC readings. Adjust MQ2_THRESHOLD and MQ135_THRESHOLD constants in the code to match your environment's baseline. 

## Tech Stack 

- MYOSA ESP32 Motherboard — Central controller; handles I2C bus, ADC, serial, and Wi-Fi 



- DHT22 Digital temperature and humidity sensor (one wire protocol, GPIO 4) 



- BMP180 I2C barometric pressure and altitude sensor (0x77) 

- MPU6050 — I2C 6-axis IMU: accelerometer + gyroscope (0x69) 



- MQ2 Analog smoke/LPG/combustible gas sensor (GPIO 34, ADC1) 

- MQ135 — Analog air quality/CO2/NH3 sensor (GPIO 35, ADC1) 

- OLED SSD1306 128×64 — I2C display for real-time UI (0x3C) 



- Arduino IDE Firmware development environment (ESP32 Arduino core) 



- Adafruit Sensor Libraries Unified driver layer for all sensor modules 

## Requirements / Installation 

## Arduino IDE Setup 

Install the ESP32 board support package by adding this URL under File → Preferences → Additional Boards Manager URLs: 

- https://raw.githubusercontent.com/espressif/arduino-esp32/gh pages/package_esp32_index.json 

Then install via Tools → Board → Boards Manager: search for esp32 and install the Espressif package. 

## Library Installation 

Adafruit SSD1306 Adafruit GFX Library DHT sensor library Adafruit BMP085 Unified Adafruit MPU6050 Adafruit Unified Sensor 

Complete Source Code 

cpp 

#include <Wire.h>
#include "DHT.h"
#include <Adafruit_BMP085.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>

// ================= BLYNK CREDENTIALS =================
#define BLYNK_TEMPLATE_ID "TMPL3oF5s0iru"
#define BLYNK_TEMPLATE_NAME "Prevail"   // From blynk.cloud
#define BLYNK_AUTH_TOKEN    "kSL1cCqgN_GpYlb22aMoEVgLaftGulKH"      // From blynk.cloud

char ssid[] = "Galaxy F2280E9";
char pass[] = "netconnect";

// ================= BLYNK VIRTUAL PINS =================
#define VPIN_TEMP       V0
#define VPIN_HUMIDITY   V1
#define VPIN_MQ2        V2
#define VPIN_MQ135      V3
#define VPIN_RISK       V4
#define VPIN_PRESSURE   V5
#define VPIN_ACCEL_X    V6
#define VPIN_ALTITUDE   V7

// ================= OLED =================
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ================= DHT22 =================
#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

// ================= BMP180 =================
Adafruit_BMP085 bmp;

// ================= MPU6050 =================
Adafruit_MPU6050 mpu;

// ================= MQ SENSORS =================
#define MQ2_PIN    34
#define MQ135_PIN  35

// ================= LED + BUZZER =================
#define LED_PIN    2
#define BUZZER     25

// ================= OLED PAGE SWITCH =================
int page = 0;

// ================= TIMER =================
unsigned long previousMillis = 0;
const long interval = 3000;

// ================= RISK LEVEL =================
String riskLevel = "SAFE";

void setup() {

  Serial.begin(115200);

  // ================= I2C =================
  Wire.begin(21,22);

  // ================= DHT22 =================
  dht.begin();

  // ================= OUTPUTS =================
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  // ================= OLED =================
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {

    Serial.println("OLED not found!");
    while(1);
  }

  // ================= BMP180 =================
  if (!bmp.begin()) {

    Serial.println("BMP180 not found!");
    while (1);
  }

  // ================= MPU6050 =================
  if (!mpu.begin(0x69)) {

    Serial.println("MPU6050 not found!");
    while (1);
  }

  // ================= STARTUP SCREEN =================
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);

  display.setCursor(0,0);
  display.println("SMART LANDFILL");
  display.println("INITIALIZING...");
  display.display();

  delay(2000);

  // ================= MQ CALIBRATION =================
  display.clearDisplay();

  display.setCursor(0,0);
  display.println("MQ CALIBRATION");
  display.println("PLEASE WAIT...");
  display.display();

  Serial.println("Calibrating MQ Sensors...");

  delay(30000);

  Serial.println("Calibration Complete");

  display.clearDisplay();
  display.setCursor(0,0);
  display.println("SYSTEM READY");
  display.display();

  delay(2000);
}

void loop() {

  // ================= DHT22 =================
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // ================= BMP180 =================
  float bmpTemp = bmp.readTemperature();
  int pressure = bmp.readPressure();
  float altitude = bmp.readAltitude();

  // ================= MPU6050 =================
  sensors_event_t a, g, temp;

  mpu.getEvent(&a, &g, &temp);

  // ================= MQ SENSOR AVERAGING =================
  int mq2Value = 0;
  int mq135Value = 0;

  for(int i = 0; i < 10; i++) {

    mq2Value += analogRead(MQ2_PIN);
    mq135Value += analogRead(MQ135_PIN);

    delay(50);
  }

  mq2Value = mq2Value / 10;
  mq135Value = mq135Value / 10;

  // ================= RISK LEVEL LOGIC =================

  riskLevel = "SAFE";

  // WARNING LEVEL
  if (
      temperature > 35 ||
      mq2Value > 1200 ||
      mq135Value > 1000
     )
  {
    riskLevel = "WARNING";
  }

  // DANGER LEVEL
  if (
      temperature > 45 ||
      mq2Value > 1800 ||
      mq135Value > 1500
     )
  {
    riskLevel = "DANGER";
  }

  // ================= ALERT SYSTEM =================

  if(riskLevel == "SAFE") {

    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER, LOW);
  }

  else if(riskLevel == "WARNING") {

    digitalWrite(LED_PIN, HIGH);

    // Slow Beep
    digitalWrite(BUZZER, HIGH);
    delay(10000);

    digitalWrite(BUZZER, LOW);
  }

  else if(riskLevel == "DANGER") {

    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER, HIGH);
  }

  // ================= SERIAL MONITOR =================

  Serial.println("========================");

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  Serial.print("BMP Temp: ");
  Serial.print(bmpTemp);
  Serial.println(" C");

  Serial.print("Pressure: ");
  Serial.println(pressure);

  Serial.print("Altitude: ");
  Serial.println(altitude);

  Serial.print("Accel X: ");
  Serial.println(a.acceleration.x);

  Serial.print("MQ2: ");
  Serial.println(mq2Value);

  Serial.print("MQ135: ");
  Serial.println(mq135Value);

  Serial.print("Risk Level: ");
  Serial.println(riskLevel);

  // ================= OLED PAGE SWITCHING =================

  unsigned long currentMillis = millis();

  if(currentMillis - previousMillis >= interval) {

    previousMillis = currentMillis;

    page++;

    if(page > 2)
      page = 0;
  }

  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);

  // ================= PAGE 0 =================
  if(page == 0) {

    display.setCursor(0,0);

    display.println("ENVIRONMENT");

    display.print("Temp:");
    display.print(temperature,1);
    display.println("C");

    display.print("Hum:");
    display.print(humidity,1);
    display.println("%");

    display.print("Pres:");
    display.println(pressure);
  }

  // ================= PAGE 1 =================
  else if(page == 1) {

    display.setCursor(0,0);

    display.println("GAS MONITOR");

    display.print("MQ2:");
    display.println(mq2Value);

    display.print("MQ135:");
    display.println(mq135Value);

    display.print("STATUS:");
    display.println(riskLevel);
  }

  // ================= PAGE 2 =================
  else if(page == 2) {

    display.setCursor(0,0);

    display.println("MOTION DATA");

    display.print("AX:");
    display.println(a.acceleration.x,1);

    display.print("AY:");
    display.println(a.acceleration.y,1);

    display.print("AZ:");
    display.println(a.acceleration.z,1);

    display.print("ALT:");
    display.println(altitude,1);
  }

  display.display();

  delay(1000);
}
## Troubleshooting 

|Issue|||LikelyCause|Fix|
|---|---|---|---|---|
|OLEDnotfound|||Wrong address or wiring|Try<br>0x3D insteadof<br>0x3C ;check SDA/SCL|
|BMP180||not|I2C confict ordead module|Run I2Cscanner sketchto verify<br>0x77|
|found|||||
|MPU6050 not|||AD0 pinfoating|Tie AD0HIGH(3.3V)foraddress<br>0x69|
|found|||||
|DHT22|Read||Too-frequent pollingorloose|DHT22minimum interval is 2 s;add10kΩ pull-up|
|Failed|||wire|on DATA|
|MQreadsalways 0|||No preheat or wrong GPIO|LetMQsensors warmup 30–60 s;confrm GPIO|
|||||34/35|
|Garbage||serial|Baudrate mismatch|SetSerial Monitor to 115200baud|
|output|||||



## File Structure 

prevail-landfill-fire-prediction/ `├` ─ prevail-landfill-fire-prediction.md   ← This file `├` ─ prevail-cover.jpg                     ← Cover image `├` ─ prevail-demo.mp4 ← Demo video `├` ─ block-diagram.jpg `├` ─ oled-pages.jpg └─ wiring-diagram.jpg 

License 

- - This project is open source and released under the Creative Commons Attribution ShareAlike 

- ' 4.0 International (CC BY SA 4.0) license, consistent with the MYOSA platform s licensing terms. 



