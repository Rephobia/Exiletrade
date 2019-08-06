var windowman = require("node-process-windows");
var sender = require("node-key-sender");

document.onclick = function(e)
{
	if (e.target.className == "btn btn-default whisper-btn active") {

		windowman.focusWindow("PathOfExile");

		sender.startBatch()
			.batchTypeKey("enter")
			.batchTypeCombination(["control", "v"])
			.batchTypeKey("enter")
			.sendBatch();
	}
};
