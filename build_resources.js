const injections = [
	"./whisper_injection.js"
];


const options = {
	name: 'Exiletrade',
	targetUrl: 'https://pathofexile.com/trade',
	out: 'build',
	inject : injections,
};


const dependencies = [
	"node-process-windows",
	"node-key-sender"
];


module.exports.get_options = function ()
{
	return options;
};

module.exports.get_dependencies = function ()
{
	return dependencies;
};

