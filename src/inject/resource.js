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


const fs = require("fs");
const path = require("path");


var resource = {
	title: "Exiletrade",
	poe_title: "Path of Exile",
	whisper_btn: "btn btn-default whisper-btn active",
	menu_name: "menu",
	toggle_name: "toggle",
	toggle_key: "Alt+F",
	menu_key: "Alt+S"
};


const file_name = "exiletrade.json";

function find_missing(object)
{
	for (var key in resource) {

		if (!object.hasOwnProperty(key)) {
			object[key] = resource[key];
		}
	}

	return object;
};


(function () {
	
	try {
		let file = fs.readFileSync(path.join(__dirname, file_name), "utf8");
		
		let json = JSON.parse(file);

		resource = find_missing(json);
	}
	catch (err) {
		if (err.code === "ENOENT") {
			
			console.log("not an error: exiletrade.json doesn't exist");
			// if file doesn't exist, default resource is used
		}
		else {
			throw err;
		}
	}
	
}());


module.exports = resource;
