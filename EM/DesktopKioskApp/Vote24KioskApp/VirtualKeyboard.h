#include <Windows.h>
#include <stdlib.h>
#include <Tlhelp32.h>
#include <wchar.h>

DWORD WINAPI VirtualKeyboardOpen(LPVOID IpParam);
DWORD WINAPI VirtualKeyboardClose(LPVOID IpParam);