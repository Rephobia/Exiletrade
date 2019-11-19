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

function concat_init(gulp)
{	
	const task =  function (done)
	{
		const gulp_concat = require("gulp-concat");
		
		const source = "./src/inject/*.js";
		const output = "concatenated.js";
		const destination = "./build/";

		gulp.src(source)
			.pipe(gulp_concat(output))
			.pipe(gulp.dest(destination))
			.on("end", end_task(done, "\nConcat DONE\n"));
	};
	
	return task;
}


function nativefier_init(gulp, resources)
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


function install_init(gulp)
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


function copy_init(gulp, resources)
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


function copy_html_init(gulp, resources)
{
	const task = function (done)
	{		
		const source = "./src/inject/*.html";
		const destination = __dirname + "/" + resources.get_path() +
		      "/resources/app/inject/";

		gulp.src(source, { follow: true, convertToFile: true})
			.pipe(gulp.dest(destination))
			.on("end", end_task(done, "Copy html DONE"));
	};
	
	return task;
}


class Builder
{	
	constructor(gulp)
	{
		this.resources = require("./build_resources.js");
				
		this.concat = concat_init(gulp);
		this.nativefier = nativefier_init(gulp, this.resources);
		this.install = install_init(gulp);
		this.copy = copy_init(gulp, this.resources);
		this.copy_html = copy_html_init(gulp, this.resources);
	}
}


function main()
{
	const gulp = require("gulp");
	
	const builder = new Builder (gulp);
	
	const runner = gulp.series(builder.concat,
	                           builder.nativefier,
	                           builder.install,
	                           builder.copy,
	                           builder.copy_html);
	runner();
}


main();
