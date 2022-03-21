#include "Serial.h"

DCB				dcb = { 0 };
HANDLE			hCom;
BOOL			fsuccess;
POINT			pt;
DWORD			dwEventMask;
DWORD			NoBytesRead;
COMMTIMEOUTS	timeouts;
extern HWND		hWndMain;
uint8_t			chRead;
uint8_t			Interval =35;

DWORD WINAPI SerialThread(LPVOID IpParam)
{
	wchar_t PortNo[20] = { 0 };
	wchar_t pszPortName[10] = { L"com12" };
	swprintf_s(PortNo, 20, TEXT("\\\\.\\%s"), pszPortName);
	
	hCom = CreateFile(PortNo,
		GENERIC_READ | GENERIC_WRITE,
		0,
		NULL,
		OPEN_EXISTING,
		0,
		NULL);
	
	if (hCom == INVALID_HANDLE_VALUE) {
#ifdef DEBUG
		printf("Port Open Fail!\n"); return 1;
#endif
		CloseHandle(hCom);
		exit(1);
	}

	// ---------- 통신 포트에 대한 정보 설정 ---------- //
	SecureZeroMemory(&dcb, sizeof(dcb));
	dcb.DCBlength = sizeof(dcb);

	fsuccess = GetCommState(hCom, &dcb);
#ifdef DEBUG
	if (!fsuccess) {
		printf("Com State Error!\n");
		CloseHandle(hCom);
		exit(1);
	}
#endif

	dcb.BaudRate = CBR_9600;
	dcb.ByteSize = 8;
	dcb.StopBits = ONESTOPBIT;
	dcb.Parity = NOPARITY;

	fsuccess = SetCommState(hCom, &dcb);
#ifdef DEBUG
	if (!fsuccess) {
		printf("DCB Structure Error!\n");
		CloseHandle(hCom);
		exit(1);
	}
#endif

	// ---------- 통신 타임 아웃 설정 ---------- //
	timeouts.ReadIntervalTimeout = 1;
	timeouts.ReadTotalTimeoutConstant = 1;
	timeouts.ReadTotalTimeoutMultiplier = 1;

#ifdef DEBUG
	if (SetCommTimeouts(hCom, &timeouts) == FALSE)
	{
		printf("Time Structure Error!\n");
		CloseHandle(hCom);
		exit(1);
	}
#endif

	// ---------- 통신 이벤트 설정 ---------- //
	fsuccess = SetCommMask(hCom, EV_RXCHAR);
#ifdef DEBUG
	if (!fsuccess) {
		printf("Setting CommMask Error!\n");
		CloseHandle(hCom);
		exit(1);
	}
#endif

	// ---------- 통신 이벤트 발생 시 데이터 전송 ---------- //
	for (;;)
	{
		GetCursorPos(&pt);
		if (WaitCommEvent(hCom, &dwEventMask, NULL)) {
			if (ReadFile(hCom, &chRead, 1, &NoBytesRead, NULL)) {
				// ---------- 클릭 메시지 전송 ---------- //
				int val = chRead * 2;
				if (val == 388) {
					SendMessageTimeout(hWndMain,
						WM_LBUTTONDOWN,
						NULL,
						MAKELPARAM(pt.x, pt.y),
						SMTO_ABORTIFHUNG | SMTO_NORMAL,
						1,
						NULL);
					continue;
				}
				else if (0 < val && val < 360 ) {
					double x = cos(((double)val) * M_PI / 180) * Interval;
					double y = sin(((double)val) * M_PI / 180) * Interval;

					SendMessageTimeout(hWndMain,
						WM_MOUSEMOVE,
						NULL,
						MAKELPARAM(pt.x + x, pt.y - y),
						SMTO_ABORTIFHUNG | SMTO_NORMAL,
						1,
						NULL);
				}
				else if (val == 392) {
					SendMessageTimeout(hWndMain,
						WM_VSCROLL,
						SB_PAGEUP,
						NULL,
						SMTO_ABORTIFHUNG | SMTO_NORMAL,
						1,
						NULL);
				}
				else if (val == 400 ) {
					SendMessageTimeout(hWndMain,
						WM_VSCROLL,
						SB_PAGEDOWN,
						NULL,
						SMTO_ABORTIFHUNG | SMTO_NORMAL,
						1,
						NULL);
				}
				else if (val == 396) {
					SendMessageTimeout(hWndMain,
						WM_USER + 1,
						NULL,
						NULL,
						SMTO_ABORTIFHUNG | SMTO_NORMAL,
						1,
						NULL);
				}
			}
		}
	}
	return 0;
}