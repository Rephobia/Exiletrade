/*
 * SPDX-License-Identifier: GPL-3.0-or-later

 * Copyright (C) 2019 Roman Erdyakov (Linhurdos) <teremdev@gmail.com>

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


const injections = [
	".src/inject/whisper.js"
];


const options = {
	name: 'Exiletrade',
	targetUrl: 'https://pathofexile.com/trade',
	out: 'build',
	inject : injections,
};


const dependencies = [
	"node-process-windows",
	"node-key-sender"
];


module.exports.get_options = function ()
{
	return options;
};

module.exports.get_dependencies = function ()
{
	return dependencies;
};

