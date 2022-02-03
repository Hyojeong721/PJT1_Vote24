#include <FreeRTOS_AVR.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <SPI.h>

#include "FreeRTOS_AVR.h"
#include "basic_io_avr.h"

#define PIN_BUTTON_A  2
#define PIN_BUTTON_B  3
#define PIN_BUTTON_C  4
#define PIN_BUTTON_D  5
#define PIN_BUTTON_E  6
#define PIN_BUTTON_F  7
#define PIN_ANALOG_X  0
#define PIN_ANALOG_Y  1

const uint8_t blueTx = 1;
const uint8_t blueRx = 0;

typedef struct xData {
  char ch;
  uint32_t num;
}xData;

int valX = 0;
int valY = 0;

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
  
  xQueue = xQueueCreate(3, sizeof(xData));

  if(xQueue != NULL)
  {
    portBASE_TYPE t1 = xTaskCreate((TaskFunction_t)vJoyTask, "vJoyTask", 128, NULL, 3, &xJoyTaskHandle);
    if(t1 != pdPASS){Serial.println("vJoyTask Create Fail");}
  
    portBASE_TYPE t2 = xTaskCreate((TaskFunction_t)vBlueTask, "xBlueTask", 128, NULL, 2, &xBlueTaskHandle);
    if(t2 != pdPASS){Serial.println("xBlueTask Create Fail");}
  }
  else
  {

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
      delay(100);
      if(digitalRead(PIN_BUTTON_A) == LOW){
        xData data = {'A', 1};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }        
      else if(digitalRead(PIN_BUTTON_B) == LOW){
        xData data = {'B', 2};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_C) == LOW){
        xData data = {'C', 3};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_D) == LOW){
        xData data = {'D', 4};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_E) == LOW){
        xData data = {'E', 5};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        vTaskPrioritySet(NULL, 1);
      }
      else if(digitalRead(PIN_BUTTON_F) == LOW){
        xData data = {'F', 6};
        xQueState = xQueueSend(xQueue, &data, xTickToWait);
        if(xQueState == pdPASS){
          vTaskPrioritySet(NULL, 1);
        }
      }
      
      valX = analogRead(PIN_ANALOG_X);
      xData dataX = {'X', valX};
      xQueueSend(xQueue, &dataX, xTickToWait);
      
      valY = analogRead(PIN_ANALOG_Y);
      xData dataY = {'Y', valY};
      xQueueSend(xQueue, &dataY, xTickToWait);
      
      vTaskPrioritySet(NULL, 1);
    }
}

static void vBlueTask(void * pvParameters)
{
  xData xReceiveStruct; 
  const TickType_t xTickToWait = pdMS_TO_TICKS(100);
  for(;;)
  {
    while(xQueueReceive(xQueue, &xReceiveStruct, xTickToWait ) != errQUEUE_EMPTY)
    {
        Serial.println(xReceiveStruct.ch);
        Delay(5);
    }
    vTaskPrioritySet(xJoyTaskHandle, 3 );
  }
}

void loop() {
}
