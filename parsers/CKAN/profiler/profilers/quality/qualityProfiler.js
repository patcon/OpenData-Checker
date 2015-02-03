var profile = require('../profile');

var extend  = require('extend');

function qualityProfiler(parent) {

	extend(this, parent);

	var _               = this.util._;
	var qualityProfiler = this;

	this.start = function start(dataset, profilerCallback) {

		var profileTemplate = new profile(this);

		qualityProfiler.CKANUtil.cache.getCache("qualityModel", function(error, qualityModel){
			if (!error) {
				console.log(qualityModel);
				profilerCallback(false, profileTemplate.getProfile());
			}
		}, "/util/");
	}

};

module.exports = qualityProfiler;