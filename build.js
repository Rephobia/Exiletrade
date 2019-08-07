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


function copy_dependencies(dst_dir, dependencies)
{
	let ncp = require("ncp").ncp;
	ncp.limit = 16;

	for (let i = dependencies.length; i--;) {

		const dep_name = dependencies[i];
		const src = __dirname + "/node_modules/" + dep_name;

		const ncp_cb =  function (err)
		{
			if (err) {
				console.error(err);
				return;
			}
			
			console.log(dep_name + " copied!");
		};
		
		ncp(src, dst_dir + dep_name, ncp_cb);
	}
}


function build_native(options, dependencies)
{
	const nativefier_cb = function(error, appPath)
	{
		if (error) {
			console.error(error);
			return;
		}
		
		const dst_dir = __dirname + "/" + appPath +
		      "/resources/app/node_modules/";
		
		copy_dependencies(dst_dir, dependencies);
	};

	const nativefier = require("nativefier").default;
	nativefier(options, nativefier_cb);
}


function main()
{
	const resources = require("./build_resources.js");
	build_native(resources.get_options(), resources.get_dependencies());
}


main();
