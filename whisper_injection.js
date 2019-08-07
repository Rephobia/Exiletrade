/*
 * SPDX-License-Identifier: GPL-3.0-or-later

 * Copyright (C) 2019 Roman Erdyakov (Linhurdos) <teremdev@gmail.com>

 * This file is part of Memedar (flashcard system)
 * Memedar is free software: you can redistribute it and/or modify
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


var windowman = require("node-process-windows");
var sender = require("node-key-sender");

document.onclick = function(e)
{
	if (e.target.className == "btn btn-default whisper-btn active") {

		windowman.focusWindow("PathOfExile");

		sender.startBatch()
			.batchTypeKey("enter")
			.batchTypeCombination(["control", "v"])
			.batchTypeKey("enter")
			.sendBatch();
	}
};
