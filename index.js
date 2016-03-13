"use strict";
const https = require("https");

const inventoryParser = module.exports = {};

inventoryParser.parse = function(data) {
	if(typeof data !== "object") {
		try {
			data = JSON.parse(data);
		} catch(err) {
			throw err;
		}
	}

	return Object.keys(data.rgInventory)
		.map(function(key) {
			return data.rgInventory[key];
		}).sort(function(a, b) {
			if(a.pos >= b.pos) {
				return 1;
			} else {
				return -1;
			}
		}).map(function(a) {
			return data.rgDescriptions[a.classid + "_" + a.instanceid];
		});
};

inventoryParser.getInventory = function(username, callback) {
	https.get({
		host: "steamcommunity.com",
		path: "/id/" + username + "/inventory/json/440/2/"
	}, function(res) {
		let body = "";

		res.on("data", function(data) {
			body += data.toString();
		});

		res.on("end", function() {
			try {
				const data = JSON.parse(body);
				return callback(null, inventoryParser.parse(data));
			} catch(err) {
				return callback(err);
			}
		});
	});
};
