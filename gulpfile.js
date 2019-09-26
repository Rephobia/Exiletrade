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


function install_dependencies(gulp)
{
	const source = __dirname + "/src/modules/**/*";
	const output = __dirname + "/build/";
	
	const install = require("gulp-install");
	const clean = require('gulp-clean');
	
	return function ()
	{
		return gulp.src(source)
			.pipe(gulp.dest(output))
			// .pipe(gulp.src("package-lock.json", {read: false}).pipe(clean()))
			.pipe(install({args: ["--no-package-lock"]}));
	};
}

function copy_dependencies (gulp, appPath)
{
	const source = __dirname + "/build/node_modules/**/*";
	const destination = __dirname + "/" + appPath + "/resources/app/node_modules/";

	return function ()
	{
		return gulp.src(source, { follow: true, convertToFile: true})
			.pipe(gulp.dest(destination));
	};
}

function build_dependencies(appPath)
{
	const gulp = require("gulp");
	
	const install_task = install_dependencies(gulp);
	const copy_task = copy_dependencies(gulp, appPath);

	const series = gulp.series(install_task, copy_task);
	
	series();
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
