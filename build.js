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


function copy_dependencies(appPath)
{
	const space_char = " ";
	
	const source = __dirname + "\\node_modules\\*";
	const destination = __dirname +  "\\" + appPath + "\\resources\\app\\node_modules\\";

	const cmd = "xcopy /E /Y"
	      + space_char + source
	      + space_char + destination;

	return cmd;
}

function build_dependencies(appPath)
{
	let process = require('child_process');

	process.execSync("npm install", {stdio:[0,1,2]});
	process.execSync(copy_dependencies(appPath), {stdio:[0,1,2]});
}


function build_nativefier(options)
{
	const nativefier_cb = function(error, appPath)
	{
		if (error) {
			console.error(error);
			return;
		}
		
		build_dependencies(appPath);
	};

	const nativefier = require("nativefier").default;
	nativefier(options, nativefier_cb);
}


function main()
{
	const resources = require("./build_resources.js");
	build_nativefier(resources.get_options());
}


main();
