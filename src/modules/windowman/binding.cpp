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


#include <napi.h>

extern "C" {
#include "windowman.h"
}


Napi::Boolean wrapper_set_focus(const Napi::CallbackInfo& info)
{
	Napi::Env env = info.Env();
	std::string title {info[0].As<Napi::String>()};
	
	return Napi::Boolean::New(env, ::set_focus(title.c_str()));
}

void wrapper_toggle_show(const Napi::CallbackInfo& info)
{
	Napi::Env env = info.Env();
	std::string title {info[0].As<Napi::String>()};
	
	::toggle_show(title.c_str());
}

Napi::Object init(Napi::Env env, Napi::Object exports)
{
	exports.Set(Napi::String::New(env, "toggle_show"),
	            Napi::Function::New(env, wrapper_toggle_show));
	
	exports.Set(Napi::String::New(env, "set_focus"),
	            Napi::Function::New(env, wrapper_set_focus));
	
	return exports;
}

NODE_API_MODULE(windowman, init);
