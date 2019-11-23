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


(function () {

	const electron = require("electron").remote;
	
	const hotkey = require("./hotkey.js");
	
	const path = require("path");
	const url = require("url");
	
	let menu;
	
	hotkey.register("settings", "Ctrl+X", toggle_menu);

	function toggle_menu ()
	{
		if (menu != null) {
			menu.close();
			return;
		}

		menu = new electron.BrowserWindow({ width: 250, height: 150, alwaysOnTop: true,
		                           webPreferences: {
			                           nodeIntegration: true
		                           }});

		menu.loadURL(url.format({ pathname: path.join(__dirname, "settings.html"),
		                          protocol: "file:",
		                          slashes:true
		                        }));
		
		menu.on("closed", () => { menu = null; });

		menu.webContents.on("dom-ready", () => {
			menu.send("keyedit:registered_settings", hotkey.sequence_by_name("settings"));
			menu.send("keyedit:registered_toggle_show", hotkey.sequence_by_name("toggle_show"));
		});
	}

	electron.ipcMain.on("keyedit:add",
	                    function(event, sequence)
	                    {
		                    hotkey.change_sequence(sequence.name, sequence.string);
		                    event.sender.send("keyedit:registered_" + sequence.name, sequence.string);
	                    });
}());
