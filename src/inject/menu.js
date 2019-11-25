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



const electron = require("electron").remote;

const hotkey = require("./hotkey.js");
const resource = require("./resource.js").resource;

const path = require("path");
const url = require("url");


let menu;

function show()
{
	if (menu != null) {
		menu.close();
		return;
	}

	menu = new electron.BrowserWindow({ width: 250, height: 150, alwaysOnTop: true,
	                                    webPreferences: {
		                                    nodeIntegration: true
	                                    }});

	menu.loadURL(url.format({ pathname: path.join(__dirname, "menu.html"),
	                          protocol: "file:",
	                          slashes:true
	                        }));
	
	menu.on("closed", () => { menu = null; });

	menu.webContents.on("dom-ready", () => {

		menu.send(hotkey.registered_msg(resource.menu.name),
		          hotkey.get_sequence(resource.menu.name));
		
		menu.send(hotkey.registered_msg(resource.toggle.name),
		          hotkey.get_sequence(resource.toggle.name));
	});
}

electron.ipcMain.on(hotkey.add_msg(),
                    function(event, name, sequence)
                    {
	                    if (hotkey.change_sequence(name, sequence)) {

		                    event.sender.send(hotkey.registered_msg(name), sequence);
	                    }
                    });

module.exports.show = show;
