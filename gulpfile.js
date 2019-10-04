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


function concat_init(gulp)
{	
	const task =  function (done)
	{
		console.log("\n---Concat---\n");

		const end = function ()
		{
			console.log("---Concat done---");
			done();
		};
		
		const gulp_concat = require("gulp-concat");
		
		const source = "./src/inject/*.js";
		const output = "concatenated.js";
		const destination = "./build/";

		gulp.src(source)
			.pipe(gulp_concat(output))
			.pipe(gulp.dest(destination))
			.on("end", end);
	};
	
	return task;
}


function nativefier_init(gulp, resources)
{
	const task = function (done)
	{
		console.log("\n---Build nativefier---\n");
		const end = function(error, appPath)
		{
			if (error) {
				console.error(error);
				return;
			}

			resources.set_path(appPath);
			console.log("\n---Build nativefier done---\n");
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
		console.log("\n---Install dependencies---\n");
		
		const end = function ()
		{
			console.log("---Install done---");
			done();
		};
		
		const install = require("gulp-install");
		const source = __dirname + "/src/modules/**/*";
		const output = __dirname + "/build/";
		
		gulp.src(source)
			.pipe(gulp.dest(output))
			.pipe(install({args: ["--no-package-lock"]}, end));

	};
	
	return task;
}


function copy_init(gulp, resources)
{
	const task = function (done)
	{
		console.log("\n---Copy dependencies---\n");
		
		const end = function ()
		{
			console.log("---Copy dependencies done---");
			done();
		};
		
		const source = __dirname + "/build/node_modules/**/*";
		const destination = __dirname + "/" + resources.get_path() +
		      "/resources/app/node_modules/";
		
		gulp.src(source, { follow: true, convertToFile: true})
			.pipe(gulp.dest(destination))
			.on("end", end);
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
	}
}


function main()
{
	const gulp = require("gulp");
	
	const builder = new Builder (gulp);
	
	const runner = gulp.series(builder.concat,
	                           builder.nativefier,
	                           builder.install,
	                           builder.copy);
	runner();
}


main();
