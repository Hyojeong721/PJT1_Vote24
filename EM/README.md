# Joystick

* 조이스틱은 Arduino IDE로 열어서 Arduino UNO 보드와 연결해서 실행하면된다.
* 아두이노 UNO 보드와 Arduino Joystick Shield를 연결한다.
* HC-06의 TX,RX와 Arduino UNO 보드의 TX,RX를 반대로 연결한다.
* 위 연결 과정에서 문제가 발생한다. 이유는 Arduino UNO 보드에는 Serial Port가 1개이므로 컴퓨터와 연결하는 것과 HC-06과 연결하는 Serial Port가 충돌이 나기 때문이다.

# DesktopKioskApp
* Vote24KioskApp은 키오스크 앱의 코드가 있는 프로젝트이다.
* Setupvote24KioskApp은 Vote24KioskApp의 배포할수 있는 setup 파일을 만드는 프로젝트이다.
* Visual Studio의 솔루션 탐색기에서 Setupvote24KioskApp을 찾아 마우스 우클릭 후, 빌드를 하면 저장 위치에 설치 파일이 생성된다.
* Visual Studio의 NUGET에서 Microsoft.Web.WebView2, Microsoft.Windows.ImplementationLibrary를 설치해야 한다. 
* Microsoft SDK 설치해야 한다.

# 사용 방법
* 윈도우와 페어링 되어야 한다.
* 루투스 Serial 링크가 포트 12로 맞추어야 한다.

* 설치 방법 (실행 불가 시 다른 방법으로 진행)
1. 프로젝트 2개를 열고 NUGET에서 필요한 내용을 다운 받은뒤, Setupvote24KioskApp 빌드
2. Release 폴더 안에 있는 .msi 파일 실행 설치
3. Visual Studio에서 ctrl + F5 빌드 실행

# 문제점
* HC-06은 9600bps의 속도만 지원한다. 따라서 bluetooth의 속도가 매우 빨라도 9600 이상의 속도를 가질 수 없다.
* 위와 같은 문제점으로 어플리케이션의 마우스 이동 속도나 클릭 속도가 매우 느리다. 

# 배포
* S06P12A205/EM/DesktopKioskApp/SetupVote24KioskApp/Release 에서 .msi 파일을 받아 설치 할 수 있다.
* 설치시 문제점 블루투스 Serial 링크가 포트 12가 아니면 프로그램이 실행되지 않는다.
