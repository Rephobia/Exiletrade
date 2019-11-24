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


function end_task(done_callback, message)
{
	return function ()
	{
		console.log(message);
		
		done_callback();		
	};

}


function build_nativefier(gulp, resources)
{
	const task = function (done)
	{
		const end = function(error, appPath)
		{
			if (error) {
				console.error(error);
				return;
			}

			resources.set_path(appPath);
			console.log("\nBuild nativefier DONE\n");
			done();
		};
		
		const nativefier = require("nativefier").default;
		nativefier(resources.get_options(), end);
	};
	
	return task;
}


function install_dependencies(gulp)
{
	const task = function (done)
	{				
		const install = require("gulp-install");
		const source = __dirname + "/src/modules/**/*";
		const output = __dirname + "/build/";
		
		gulp.src(source)
			.pipe(gulp.dest(output))
			.pipe(install({args: ["--no-package-lock"]},
			              end_task(done, "Install DONE")));

	};
	
	return task;
}


function copy_dependencies(gulp, resources)
{
	const task = function (done)
	{		
		const source = __dirname + "/build/node_modules/**/*";
		const destination = __dirname + "/" + resources.get_path() +
		      "/resources/app/node_modules/";
		
		gulp.src(source, { follow: true, convertToFile: true})
			.pipe(gulp.dest(destination))
			.on("end", end_task(done, "Copy dependencies DONE"));
	};
	
	return task;
}


function copy_code(gulp, resources)
{
	const task = function (done)
	{		
		const source = "./src/inject/*.*";
		const destination = __dirname + "/" + resources.get_path() +
		      "/resources/app/inject/";

		gulp.src(source, {"ignore":["./src/inject/index.js"], follow: true, convertToFile: true})
			.pipe(gulp.dest(destination))
			.on("end", end_task(done, "Copy html DONE"));
	};
	
	return task;
}


(function main()
{
	const gulp = require("gulp");
	let resources = require("./build_resources.js");

	const runner = gulp.series(build_nativefier(gulp, resources),
	                           install_dependencies(gulp),
	                           copy_dependencies(gulp, resources),
	                           copy_code(gulp, resources));
	runner();
}());

