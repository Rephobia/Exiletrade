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


const injections = [
	"./src/inject/index.js"	
];


const options = {
	name: 'Exiletrade',
	targetUrl: 'https://pathofexile.com/trade',
	out: 'build',
	inject : injections,
	alwaysOnTop : true,
	tray: "start-in-tray",
	singleInstance: true,
	hideWindowFrame: true,
	browserwindowOptions: {
		backgroundColor: "#000000",
		focusable: false
	}
};


module.exports.get_options = function ()
{
	return options;
};


var app_path = "";

module.exports.set_path = function (path)
{
	app_path = path;
};

module.exports.get_path = function ()
{
	if (app_path === "") {
		console.error("Nativefier didn't set appPath." +
		              " Use resources.set_path(appPath) after build nativefier");
		process.exit(1);
	}
	return app_path;
};
