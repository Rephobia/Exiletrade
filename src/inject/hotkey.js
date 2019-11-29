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
const resource = require("./resource.js").resource;
const resource_change_key = require("./resource.js").change_key;


var keymap = {};


function register(name, sequence, func)
{
	let result = electron.globalShortcut.register(sequence, func);

	if (result && resource_change_key(name, sequence)) {

		keymap[name] = { sequence: sequence, func: func };
		
	}
	else {
		alert("Cannot register global hotkey " + sequence);
		result = false;
	}
	return result;
};


function change_sequence(name, sequence)
{
	let result = false;
	
	if (name in keymap) {
		
		let oldkey = keymap[name];
		
		if (register(name, sequence, oldkey.func)) {
			electron.globalShortcut.unregister(oldkey.sequence, oldkey.func);
			oldkey.sequence = sequence;
			result = true;
		}
	}
	else {
		alert(name + " doesn't exist in keymap");
	}
	
	return result;
};


function get_sequence(name)
{
	return keymap[name].sequence;
};


function add_msg()
{
	const msg = "add";
	
	return function ()
	{
		return msg;
	};
}


function registered_msg()
{
	const msg = "registered_";
	
	return function (name)
	{
		return msg + name;
	};
};


module.exports.register = register;
module.exports.change_sequence = change_sequence;
module.exports.get_sequence = get_sequence;
module.exports.add_msg = add_msg();
module.exports.registered_msg = registered_msg();

