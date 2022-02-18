#include "VirtualKeyboard.h"

DWORD dwSize = 250;
HANDLE hSnapShot;
PROCESSENTRY32 pEntry;
BOOL bCrrent = FALSE;

DWORD WINAPI VirtualKeyboardOpen(LPVOID IpParam)
{
	BOOL* f = (BOOL*)IpParam;
	PVOID pOldValue = NULL;
	Wow64DisableWow64FsRedirection(&pOldValue);

	STARTUPINFO si = { 0 };
	si.cb = sizeof(STARTUPINFO);
	PROCESS_INFORMATION pi = { 0 };
	SHELLEXECUTEINFO m_sInfo;

	ZeroMemory(&m_sInfo, sizeof(SHELLEXECUTEINFO));
	m_sInfo.cbSize = sizeof(SHELLEXECUTEINFO);
	m_sInfo.lpFile = (L"C:\\Windows\\System32\\OSK.EXE");
	m_sInfo.lpParameters = (L""); //전달 인자
	m_sInfo.nShow = SW_SHOWMINIMIZED | SW_SHOWNA; //실행시 최소화
	m_sInfo.lpVerb = (L"runas"); //관리자 권한 실행
	m_sInfo.fMask = SEE_MASK_NOCLOSEPROCESS; //프로세스 핸들값 사용

	ShellExecuteEx(&m_sInfo);
	Wow64RevertWow64FsRedirection(pOldValue);
	*f = 1;
	return 0;
}

DWORD WINAPI VirtualKeyboardClose(LPVOID IpParam)
{
	BOOL* f = (BOOL*)IpParam;
	hSnapShot = CreateToolhelp32Snapshot(TH32CS_SNAPALL, NULL);
	pEntry.dwSize = sizeof(pEntry);
	Process32First(hSnapShot, &pEntry);
	while (1)
	{
		BOOL hRes = Process32Next(hSnapShot, &pEntry);
		if (hRes == FALSE)
			break;
		if (!wcscmp(pEntry.szExeFile, L"OSK.EXE"))
		{
			bCrrent = TRUE;
		}
		if (bCrrent)
		{
			HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pEntry.th32ProcessID);
			if (hProcess)
			{
				if (TerminateProcess(hProcess, 0))
				{
					unsigned long nCode;
					GetExitCodeProcess(hProcess, &nCode);
				}
				CloseHandle(hProcess);
			}
			break;
		}
	}
	*f = 0;
	return 0;
}