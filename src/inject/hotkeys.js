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


(function (et_keys, undefined) {
	
	const electron = require("electron").remote;
	
	var keymap = {};

	et_keys.register = function(name, sequence, func)
	{
		const rc = electron.globalShortcut.register(sequence, func);
		
		if (rc) {
			keymap[name] = { sequence: sequence, func: func };
		}
		else {
			alert("Cannot register global hotkey " + sequence);
		}
	};
	
	et_keys.change_sequence = function(name, sequence)
	{
		if (name in keymap) {
			var item = keymap[name];
			et_keys.register(item.name, sequence, item.func);
			electron.globalShortcut.unregister(item.sequence, item.func);
			item.sequence = sequence;
		}
		else {
			alert(name + " doesn't exist in keymap");
		}
	};
	
	et_keys.sequence_by_name = function(name)
	{
		return keymap[name].sequence;
	};

}(window.et_keys = window.et_keys || {}));
