/*
 * SPDX-License-Identifier: GPL-3.0-or-later

 * Copyright (C) 2019 Roman Erdyakov

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

let settings;

function show()
{
	if (settings != null) {
		settings.close();
		return;
	}

	settings = new electron.BrowserWindow({ width: 250, height: 100, alwaysOnTop: true,
	                                        autoHideMenuBar: true,
	                                        frame: false,
	                                        webPreferences: {
		                                        nodeIntegration: true
	                                        }});

	settings.loadURL(url.format({ pathname: path.join(__dirname, "settings.html"),
	                              protocol: "file:",
	                              slashes:true
	                            }));
	
	settings.on("closed", () => { settings = null; });

	settings.webContents.on("dom-ready", () => {

		settings.send(hotkey.registered_msg(resource.settings.name),
		              hotkey.get_sequence(resource.settings.name));
		
		settings.send(hotkey.registered_msg(resource.toggle.name),
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

function close()
{
	if (settings != null) {
		settings.close();
	}
}

module.exports.show = show;
module.exports.close = close;
