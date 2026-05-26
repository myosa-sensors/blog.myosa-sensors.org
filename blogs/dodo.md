---
publishDate: 2026-05-24
title: DODO – Speech Assistant Toy for Speech Disabled Kids
excerpt: DODO is an interactive speech therapy toy designed to assist children with speech disabilities through real-time speech recognition, multisensory feedback, and engaging therapy activities.
image:   dodo/coverimage.jpg
tags:
  - Speech Therapy
  - Embedded AI
  - ESP32
  - MYOSA Sensors
  - Assistive Technology
---

Making speech therapy interactive, engaging, and accessible for children through AI-enabled assistive technology.

##Acknowledgements

We sincerely thank Team MYOSA Sensors for providing the MYOSA development platform, sensor modules, and technical guidance throughout the project development process.

We also express our gratitude to our mentor, faculty members, and teammates for their continuous support and valuable suggestions during the implementation of this project.

##Overview

Traditional speech therapy sessions for children can become repetitive and difficult to sustain for long durations. To improve engagement and participation, we developed DODO, an AI-powered interactive speech assistant toy designed specifically for speech-disabled children.

The system integrates an ESP32-based MYOSA board, speech recognition using Edge Impulse, sensor-based interaction, and multisensory feedback mechanisms to create an enjoyable therapy experience.

DODO listens to the child’s pronunciation, analyzes speech patterns in real time, and responds with visual, audio, and physical feedback when words are pronounced correctly. The toy includes vocabulary and phonics practice modes, helping children improve speech clarity, confidence, and communication skills.

##Key Features  
1. Oral Motor Training  
​Gamified blowing exercises help children strengthen their cheek and oral muscles for clearer speech.
 
​2. Focus & Stability Tracking  
​Interactive balance challenges prompt children to keep the toy steady, building physical concentration.

​3. Smart Speech Recognition  
​An offline AI companion listens to the child's voice to provide instant pronunciation feedback. 

​4. Touchless Hand Gestures  
​Simple hand waves allow children to easily switch practice words or express basic needs.  

​5. Multi-Sensory Rewards  
​Correct words instantly trigger a playful buzzer, screen celebrations, and happy physical movements. 

​6. Parent-to-Child Autonomy  
​The design transitions easily from parent-guided learning to independent child self-practice.  

##Demo/Examples

<p align="center">
  <img src="/assets/images/dodo/spectrogram.jpg" width="800"><br/>
  <i>Spectrogram Created Using Samples The first stage of the pipeline involves feature extraction. Raw audio samples are processed into a spectrogram, which represents the frequency content of the sound over time. This visual representation helps the model identify unique "audio signatures" associated with different speech patterns.</i>
</p>

<p align="center">
  <img src="/assets/images/dodo/umap.jpg" width="800"><br/>
  <i>The U-Map visualization provides a graphical representation of the entire dataset. It clusters similar data points together, allowing the team to verify that the collected samples are distinct and that there is a clear separation between different classes (e.g., specific words vs. background noise).</i>
</p>

<p align="center">
  <img src="/assets/images/dodo/arduino_library.jpg"width="800"><br/>
  <i>Arduino library created using trained model.
</i>
</p>

##Features Detailed

1. Multi-Sensory Oral Motor Training  
​The toy utilizes a high-precision BMP180 pressure sensor to create gamified breathing exercises (like blowing out a digital candle). This physical interaction directly helps children strengthen their cheek and oral muscles, which are foundational for clear speech articulation.  

​2. Physical Stability & Focus Tracking  
​Using the MPU6050 inertial measurement unit (IMU), the toy monitors physical movement and tilt. It turns concentration into a game by challenging children—especially those with short attention spans or hyperactivity—to keep the toy steady and calm before moving to the next task.  

​3. Edge AI Speech Recognition  
​Powered by an ESP32-WROOM processor and a custom-trained Edge Impulse Machine Learning model, the toy processes voice commands locally in real-time via the INMP441 digital microphone. It accurately checks the child's pronunciation of target words (like "Cat") without requiring an active internet connection.  

​4. Interactive, Touchless Navigation  
​Integrating the APDS-9960 gesture sensor allows children to interact with the device using touchless hand movements. Kids can wave their hands left or right to switch between practice words, or trigger communication shortcuts, making the interface highly accessible and engaging.  

​5. Instant Multi-Tiered Reward System  
​To reinforce correct pronunciation and boost confidence, the toy provides instant, joyful feedback. When a child says a word correctly, the system simultaneously sounds a playful buzzer, displays a success message on the OLED screen, and activates a Servo motor to make the toy physically wave or move.  

​6. Progressive Autonomy (Parent-to-Child Hand-Off)  
​The toy's workflow is thoughtfully designed to adapt to a child’s comfort level. It begins as a collaborative tool for parents and children to use together, but features intuitive visual prompts and simple sensor triggers that allow the child to eventually transition to completely independent self-practice.  

##Usage  Instructions
1.Power ON the Speech Assistant device.
​2.Keep the device still during gyro calibration.
​3.Observe the OLED display for the "Ready" and candle prompt.
​4.Blow into the breath port to complete the oral motor exercise.
​5.Hold the device steadily to practice concentration focus.
​6.Speak the target vocabulary word into the microphone.
​7.ESP32 processes the audio data using the local AI library.
​8.The buzzer sounds and servo motors activate to reward correct speech.

##Techstack

Hardware  
Espressif Systems ESP32-WROOM Microcontroller  
​BMP180 Barometric Pressure Sensor  
​MPU6050 Accelerometer + Gyroscope  
​APDS-9960 Gesture + Proximity Sensor  
​INMP441 Digital I2S Microphone  
​OLED Display (I2C)  
​Servo Motor Mechanism  
​Active Buzzer Indicator  
​Embedded Power System  

 Software  
Arduino IDE  
​Embedded C++  
​Edge Impulse Studio (TinyML Deployment)  
​Edge Impulse SDK Library (Speech Recognition)  
​ESP32Servo Library  
​Adafruit BMP085/BMP180 Library  
​Adafruit MPU6050 Library  
​Adafruit APDS9960 Library  
​I2S Audio Library  
​Wire Library (I2C Communication)  

##Requirements/Installation  

Hardware Requirements  

​ESP32 Development Board (ESP32-WROOM)  
​BMP180 Barometric Pressure Sensor  
​MPU6050 Accelerometer + Gyroscope Module  
​APDS-9960 Gesture + Proximity Sensor  
​INMP441 Digital I2S Microphone  
​OLED Display (I2C)  
​Servo Motor Module  
​Active Buzzer Indicator  
​Power Supply / Battery Pack  
​Custom Toy Chassis / Enclosure  

Software Requirements  

​Arduino IDE  
​ESP32 Board Package  
​Required Libraries:  
​1.Wire.h (Built-in I2C)  
​2.I2S.h (Built-in Audio)  
​3.ESP32Servo.h  
​4.Adafruit_BMP085.h (or similar BMP180 library)  
​5.Adafruit_MPU6050.h  
​6.Adafruit_APDS9960.h  
​7.Adafruit_SSD1306.h (and Adafruit_GFX.h for OLED)  
​8.Custom Edge Impulse Studio Library (Exported ZIP format)  

Installation  

​1.Install Arduino IDE.  
​2.Install ESP32 board support via the Arduino Boards Manager.  
​3.Install all required sensor and display libraries via the Library Manager.  
​4.Import the trained Edge Impulse speech recognition ZIP library into Arduino IDE.  
​5.Connect the I2C peripheral devices (BMP180, MPU6050, APDS-9960, and OLED Display) using the shared I2C bus pins (SDA and SCL).  
​6.Connect the INMP441 Microphone to the assigned digital I2S pins on the ESP32.  
​7.Connect the servo motor and buzzer to their designated GPIO pins.  
​8.Upload the source code to the ESP32 using Arduino IDE.  
​9.Power ON the system and verify the setup using the initialization cues on the OLED display. 
##Videos
<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/9w8IEtaUTNw"></iframe>
</div>

<div class="youtube-embed">
  <iframe src="https://www.youtube.com/embed/fY1quYNjsrQ"></iframe>
</div>
