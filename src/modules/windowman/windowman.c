/*
 * SPDX-License-Identifier: GPL-3.0-or-later

 * Copyright (C) 2019 Roman Erdyakov <teremdev@gmail.com>

 * This file is part of Exiletrade.
 * Exiletrade is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


#include <windows.h>

#include "windowman.h"


struct param
{
	const char* title;
	void (*action) (struct param* param, HWND window);
	int rc;
};


void winapi_switch(struct param* param, HWND window)
{
	SwitchToThisWindow(window, TRUE);
	Sleep(100);
	if (SetForegroundWindow(window) == TRUE) {
		param->rc = 1;
	}
	
}

void winapi_toggle(struct param* param, HWND window)
{
	IsIconic(window) == TRUE
		? ShowWindow(window, SW_RESTORE)
		: ShowWindow(window, SW_MINIMIZE);
}

BOOL CALLBACK enum_windows_cb(HWND window, const LPARAM lParam)
{
	struct param* param = (struct param*) lParam;
	
	char title[255];
	if (GetWindowText(window, title, sizeof(title))) {
		
		if (strcmpi(title, param->title) == 0) {

			param->action(param, window);
			return FALSE; // stop enumeration
		}
	}
	
	return TRUE;	
}


int set_focus(const char* title)
{
	struct param param = {.title = title,
	                      .action = winapi_switch,
	                      .rc = 0};

	EnumWindows(&enum_windows_cb, (LPARAM) &param);
	return param.rc;
}

void toggle_show(const char* title)
{
	struct param param = {.title = title,
	                      .action = winapi_toggle,
	                      .rc = 0};
	
	EnumWindows(&enum_windows_cb, (LPARAM) &param);
}
