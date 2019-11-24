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


const windowman = require("windowman");

const hotkey = require("./hotkey.js");
const menu = require("./menu.js");
const whisper = require("./whisper.js");
const resource = require("./resource.js");





(function main()
{
	document.title = resource.title;

	hotkey.register(resource.toggle_name, resource.toggle_key, () =>
	                {
		                windowman.toggle_show(resource.title);
	                });
	
	hotkey.register(resource.menu_name, resource.menu_key, menu.show);


	document.onclick = whisper.hook;
}());


