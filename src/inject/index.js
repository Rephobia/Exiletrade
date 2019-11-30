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


const windowman = require("windowman");

const hotkey = require("./hotkey.js");
const settings = require("./settings.js");
const whisper = require("./whisper.js");
const resource = require("./resource.js").resource;

const fs = require("fs");
const path = require("path");


function make_control_panel()
{
	let div = document.createElement("div");
	let cp = fs.readFileSync(path.join(__dirname, "control_panel.html"), "utf8");
	div.innerHTML = cp;
	document.body.prepend(div);
	
	let settings_btn = document.getElementById("et-settings-button");
	settings_btn.addEventListener("click", () => { settings.show(); });	
}

(function main()
 {
	 try {
		 document.title = resource.title;

		 hotkey.register(resource.toggle.name, resource.toggle.sequence, () =>
		                 {
			                 windowman.toggle_show(resource.title);
		                 });
		 
		 hotkey.register(resource.settings.name, resource.settings.sequence, settings.show);

		 document.onclick = whisper.hook;
		 
		 make_control_panel();
	 }
	 catch (err) {
		 console.log(err);
	 }
	 
 }());
