#include <FreeRTOS_AVR.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <SPI.h>

#include "FreeRTOS_AVR.h"
#include "basic_io_avr.h"

#define _USE_MATH_DEFINES
#include <math.h>

#define PIN_BUTTON_A  2
#define PIN_BUTTON_B  3
#define PIN_BUTTON_C  4
#define PIN_BUTTON_D  5
#define PIN_BUTTON_E  6
#define PIN_BUTTON_F  7
#define PIN_ANALOG_X  0
#define PIN_ANALOG_Y  1

#define PINA  200
#define PINB  198
#define PINC  196
#define PIND  194

const uint8_t blueTx = 1;
const uint8_t blueRx = 0;

double valX = 0;
double valY = 0;
uint8_t data;

SoftwareSerial mySerial(blueTx, blueRx);
QueueHandle_t xQueue;
TaskHandle_t xJoyTaskHandle, xBlueTaskHandle;

static void vJoyTask(void *pvParameters);
static void vBlueTask(void * pvParameters);

// ---------------------------------------- SetUP ------------------------------------//
void setup() {
  
  // ----------- JoyStick --------------//
  pinMode(PIN_BUTTON_A, INPUT_PULLUP);
  pinMode(PIN_BUTTON_B, INPUT_PULLUP);
  pinMode(PIN_BUTTON_C, INPUT_PULLUP);
  pinMode(PIN_BUTTON_D, INPUT_PULLUP);
  pinMode(PIN_BUTTON_E, INPUT_PULLUP);
  pinMode(PIN_BUTTON_F, INPUT_PULLUP);
  
  // ----------- BlueTooth -------------//
  Serial.begin(9600);
  mySerial.begin(9600);
  
  // ----------- FreeRTOS -------------//
  xQueue = xQueueCreate(0xF, sizeof(uint8_t));
  if(xQueue != NULL)
  {
    portBASE_TYPE t1 = xTaskCreate((TaskFunction_t)vJoyTask, "vJoyTask", 128, NULL, 3, &xJoyTaskHandle);
    if(t1 != pdPASS){Serial.println("vJoyTask Create Fail");}
  
    portBASE_TYPE t2 = xTaskCreate((TaskFunction_t)vBlueTask, "xBlueTask", 128, NULL, 2, &xBlueTaskHandle);
    if(t2 != pdPASS){Serial.println("xBlueTask Create Fail");}
  }
  vTaskStartScheduler();
}

// ---------------------------------------- Tasks ------------------------------------//
static void vJoyTask(void *pvParameters)
{
    BaseType_t xQueState;
    const TickType_t xTickToWait = pdMS_TO_TICKS(100);

    for(;;)
    {
      delay(150);
      if(digitalRead(PIN_BUTTON_A) == LOW){
        data = PINA;
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }        
      else if(digitalRead(PIN_BUTTON_B) == LOW){
        data = PINB;
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_C) == LOW){
        data = PINC;
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_D) == LOW){
        data = PIND;
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      
      valX = analogRead(PIN_ANALOG_X);
      valY = analogRead(PIN_ANALOG_Y);

      if(500 < valX && valX < 600 && 500 < valY && valY < 600){ 
        data = 202;
      }
      else {
        valX -= 519;
        valY -= 512; 
        data = (uint8_t)((((atan2(valY, valX) + M_PI) * 180 / M_PI)) / 2 );
      }
     
      xQueueSend(xQueue, &data, xTickToWait);
      vTaskPrioritySet(NULL, 1);
    }
}

static void vBlueTask(void * pvParameters)
{
  uint8_t xRchar; 
  const TickType_t xTickToWait = pdMS_TO_TICKS(100);
  for(;;)
  {
    while(xQueueReceive(xQueue, &xRchar, xTickToWait ) != errQUEUE_EMPTY)
    {
       Serial.write(xRchar);
    }
    vTaskPrioritySet(xJoyTaskHandle, 3 );
  }
}

void loop() {
}
