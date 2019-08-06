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
