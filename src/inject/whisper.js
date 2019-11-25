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
const sender = require("node-key-sender");
const resource = require("./resource.js").resource;


function hook(event)
{
	if (event.target.className == resource.whisper_btn) {

		if (windowman.set_focus(resource.poe_title)) {
			
			sender.startBatch()
				.batchTypeKey("enter")
				.batchTypeCombination(["control", "v"])
				.batchTypeKey("enter")
				.sendBatch();
		}
	}
};

module.exports.hook = hook;
