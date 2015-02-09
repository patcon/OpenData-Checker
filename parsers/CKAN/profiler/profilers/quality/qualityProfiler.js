var profile           = require('../profile');

var completeness      = require('./measures/completeness');
var availability      = require('./measures/availability');
var licensing         = require('./measures/licensing');
var freshness         = require('./measures/freshness');
var correctness       = require('./measures/correctness');
var comprehensibility = require('./measures/comprehensibility');
var provenance        = require('./measures/provenance');

var extend            = require('extend');

function qualityProfiler(parent) {

	extend(this, parent);

	var _               = this.util._;
	var qualityProfiler = this;

	var profileTemplate = new profile(this);

	this.start = function start(dataset, profilerCallback) {

		if (dataset) {

			// There is a valid dataset metadata file (Q1.1)
			profileTemplate.setQualityIndicatorScore("completeness", "QI.1", 1);

			var root   = dataset.result ? dataset.result : dataset;

			qualityProfiler.async.waterfall([

				qualityProfiler.async.apply(new completeness(qualityProfiler, dataset).start, profileTemplate),
				new provenance(qualityProfiler, dataset).start,
				new freshness(qualityProfiler, dataset).start,
				new comprehensibility(qualityProfiler, dataset).start,
				new licensing(qualityProfiler, dataset).start

			], function (err, profileTemplate) {
				profilerCallback(false, profileTemplate);
			});
		} else profilerCallback(false, profileTemplate.getProfile());
	}
};

module.exports = qualityProfiler;