#include <Windowsx.h>

#include <string>
#include <wrl.h>
#include <wil/com.h>
#include <stdlib.h>
#include <Tlhelp32.h>

#include "WebView2.h"
#include "Serial.h"
#include "VirtualKeyboard.h"

#pragma comment(lib, "Shell32.lib")
#pragma comment(lib, "Kernel32.lib")

#define MAX_THREADS 3
#define BUF_SIZE 255

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
extern DWORD WINAPI SerialThread(LPVOID IpParam); 
extern DWORD WINAPI VirtualKeyboardOpen(LPVOID IpParam);
extern DWORD WINAPI VirtualKeyboardClose(LPVOID IpParam);

// ---------- 웹뷰 설정 ---------- //
using namespace Microsoft::WRL;

static TCHAR szWindowClass[] = _T("DesktopApp");
static TCHAR szTitle[] = _T("Vote24");

static wil::com_ptr<ICoreWebView2Controller> webviewController;
static wil::com_ptr<ICoreWebView2> webviewWindow;

static int x, y;
int flags = 0;

// ---------- 윈도우 화면 구성 위한 전역 변수 ---------- //
HWND	hWndMain;
MSG		Message;
LPCTSTR lpszClass = TEXT("Vote24");

// ---------- 쓰레드 구성 위한 전역 변수 ---------- //
DWORD   dwThreadIdArray[MAX_THREADS];
HANDLE  hThreadArray[MAX_THREADS];

// ---------- Start Window ---------- //
int WINAPI WinMain(
	_In_ HINSTANCE hInstance,
	_In_opt_ HINSTANCE hPrevInstance,
	_In_ LPSTR     lpCmdLine,
	_In_ int       nCmdShow
)
{
	WNDCLASS WndClass;			
	HINSTANCE g_hInst =  hInstance;
	WndClass.cbClsExtra		= 0;									// 클래스 여분 바이트 수
	WndClass.cbWndExtra		= 0;									// 윈도우 여분 바이트 수
	WndClass.hbrBackground	= (HBRUSH)GetStockObject(WHITE_BRUSH);	// 윈도우 배경 색
	WndClass.hCursor		= LoadCursor(NULL, IDC_ARROW);			// 프로그램에서 사용할 커서
	WndClass.hIcon			= LoadIcon(NULL, IDI_APPLICATION);		// 프로그램에서 사용할 아이콘
	WndClass.hInstance		= hInstance;							// 프로그램의 인스턴스 핸들
	WndClass.lpfnWndProc	= (WNDPROC)WndProc;						// 프로시저의 함수명
	WndClass.lpszClassName	= lpszClass;							// 구조체로 만들어질 클래스명
	WndClass.lpszMenuName	= NULL;									// 메뉴 이름
	WndClass.style = CS_HREDRAW | CS_VREDRAW;			// 윈도우 스타일

	RegisterClass(&WndClass);										// 여기서 윈도우 클래스를 등록

	HWND hWnd = CreateWindow(
		lpszClass, 
		lpszClass, 
		WS_OVERLAPPEDWINDOW,
		CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
		NULL, (HMENU)NULL, hInstance, NULL);

	if (!hWnd)
	{
		MessageBox(NULL,
			_T("Call to CreateWindwoEx Failed!"),
			_T("Window Destop Guided Tour"),
			NULL);

		return 1;
	}

	// ---------- 윈도우 화면을 띄운다 ---------- //
	ShowWindow(hWnd, SW_SHOWMAXIMIZED);
	hWndMain = hWnd;

	// ---------- 웹뷰 설정 ---------- //
	CreateCoreWebView2EnvironmentWithOptions(nullptr, nullptr, nullptr,
		Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
			[hWnd](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
		env->CreateCoreWebView2Controller(hWnd, Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
			[hWnd](HRESULT result, ICoreWebView2Controller* controller) -> HRESULT {
			if (controller != nullptr) {
				webviewController = controller;
				webviewController->get_CoreWebView2(&webviewWindow);
			}
			ICoreWebView2Settings* Settings;
			webviewWindow->get_Settings(&Settings);
			Settings->put_IsScriptEnabled(TRUE);
			Settings->put_AreDefaultScriptDialogsEnabled(TRUE);
			Settings->put_IsWebMessageEnabled(TRUE);

			RECT bounds;
			GetWindowRect(hWnd, &bounds);
			x = (bounds.right / 2);
			y = (bounds.bottom / 2);
			SetCursorPos(x, y);

			webviewController->put_Bounds(bounds);
			webviewWindow->Navigate(L"http://i6a205.p.ssafy.io:80/");
			return S_OK;
		}).Get());
		return S_OK;
	}).Get());

	// ---------- 메시지 응답 ---------- //
	while (GetMessage(&Message, 0, 0, 0)) {
		TranslateMessage(&Message);
		DispatchMessage(&Message);
	}

	return Message.wParam;
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT iMessage, WPARAM wParam, LPARAM lParam)
{
	HDC hdc;
	HWND h;
	
	
	switch (iMessage) {
	case WM_CREATE:
		// ---------- 쓰레드 생성 ---------- //
		hThreadArray[0] = CreateThread(
			NULL, 0, SerialThread, NULL, 0, &dwThreadIdArray[0]
		);
		if (hThreadArray[0] == NULL){
			ExitProcess(3);
		}
	case WM_MOUSEMOVE:
		SetCursorPos(LOWORD(lParam), HIWORD(lParam));
		return 0;
	case WM_LBUTTONDOWN:
		mouse_event(MOUSEEVENTF_LEFTDOWN, LOWORD(lParam), HIWORD(lParam), 0, NULL);
		mouse_event(MOUSEEVENTF_LEFTUP, LOWORD(lParam), HIWORD(lParam), 0, NULL);
		return 0;
	case WM_VSCROLL:
		switch (LOWORD(wParam)) {
		case SB_PAGEUP:
			mouse_event(MOUSEEVENTF_WHEEL, LOWORD(lParam), HIWORD(lParam), 100, NULL);
			break;
		case SB_PAGEDOWN:
			mouse_event(MOUSEEVENTF_WHEEL, LOWORD(lParam), HIWORD(lParam), -100, NULL);
			break;
		default:
			break;
		}
		return 0;
	case WM_USER + 1:
		if (flags == 0)
		{
			hThreadArray[1] = CreateThread(
				NULL, 0, VirtualKeyboardOpen, &flags, 0, &dwThreadIdArray[1]
			);
			if (hThreadArray[1] == NULL) {
				ExitProcess(3);
			}
		}
		else if (flags == 1){
			//hThreadArray[2] = CreateThread(
			//	NULL, 0, VirtualKeyboardClose, &flags, 0, &dwThreadIdArray[2]
			//);
			//if (hThreadArray[2] == NULL) {
			//	ExitProcess(3);
			//}
			LPVOID* HEL = NULL;
			VirtualKeyboardClose(HEL);
		}
		return 0;
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;
	}
	return(DefWindowProc(hWnd, iMessage, wParam, lParam));
}