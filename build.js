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

function make_install_command(appPath)
{
	const space_char = " ";
	const destination = __dirname + "/" + appPath + "/resources/app/" + space_char;
	const source = __dirname + "/src" + space_char;
	
	const cmd = "npm --prefix" + space_char + source
	      + "install --prefix" + space_char + destination;
	
	return cmd;
}

function build_dependencies(appPath, dependencies)
{
	let child_process = require('child_process');
	
	const install_cmd = make_install_command(appPath);
	
	for (let i = dependencies.length; i--;) {
		
		const dependence = dependencies[i];
		child_process.execSync(install_cmd + dependence, {stdio:[0,1,2]});
	}
}


function build_nativefier(options, dependencies)
{
	const nativefier_cb = function(error, appPath)
	{
		if (error) {
			console.error(error);
			return;
		}
		
		build_dependencies(appPath, dependencies);
	};

	const nativefier = require("nativefier").default;
	nativefier(options, nativefier_cb);
}


function main()
{
	const resources = require("./build_resources.js");
	build_nativefier(resources.get_options(), resources.get_dependencies());
}


main();
