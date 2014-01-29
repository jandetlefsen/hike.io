"use strict";

angular.module("hikeio").
	factory("conversion", function() {

		var CONVERT_UNITS = {
			"meters": "feet",
			"feet": "meters",
			"kilometers": "miles",
			"miles": "kilometers",

			"meter": "feet",
			"foot": "meters",
			"kilometer": "miles",
			"mile": "kilometers",

			"m": "ft",
			"ft": "m",
			"km": "mi",
			"mi": "km"
		};

		var CANONICAL_UNITS = {
			"m": "meters",
			"ft": "feet",
			"km": "kilometers",
			"mi": "miles",

			"meter": "meters",
			"foot": "feet",
			"kilometer": "kilometers",
			"mile": "miles"
		};

		var METRIC_UNITS = {
			"km": true,
			"kilometers": true,
			"kilometer": true,
			"m": true,
			"meters": true,
			"meter": true
		};

		var SINGULAR_UNITS = {
			"feet": "foot",
			"meters": "meter",
			"miles" : "mile",
			"kilometers": "kilometer"
		};

		var ConversionService = function() {
		};

		ConversionService.prototype.getCorrespondingUnits = function(units) {
			return CONVERT_UNITS[units];
		};

		ConversionService.prototype.isMetric = function(units) {
			return METRIC_UNITS[units] === true;
		};

		ConversionService.prototype.getSingularUnits = function(units) {
			var singular = SINGULAR_UNITS[units];
			if (singular) {
				return singular;
			} else {
				return units;
			}
		};

		ConversionService.prototype.convert = function(value, from, to, truncateTo, hideDecimalAt, showTrailingZeroes) {
			// Cleanup input
			if (typeof value !== "number") {
				value = parseFloat(value);
			}
			if (typeof truncateTo !== "number") {
				truncateTo = parseFloat(truncateTo);
			}
			if (typeof hideDecimalAt !== "number") {
				hideDecimalAt = parseFloat(hideDecimalAt);
			}
			from = CANONICAL_UNITS[from] || from;
			to = CANONICAL_UNITS[to] || to;

			var result = value;
			if (from === "meters" && to === "feet") {
				result = value * 3.28083989501;
			} else if (from === "feet" && to === "meters") {
				result = value * 0.30480; // exact
			} else if (from === "kilometers" && to === "miles") {
				result = value * 0.62137119223;
			} else if (from === "miles" && to === "kilometers") {
				result = value * 1.609344; // exact
			}
			var stringResult = null;
			if (hideDecimalAt && result >= hideDecimalAt) {
				stringResult = Math.round(result).toString();
			} else if (truncateTo) {
				stringResult = result.toFixed(truncateTo);
			} else {
				if (result < 10) {
					stringResult = result.toFixed(1);
				} else {
					stringResult = Math.round(result).toString();
				}
			}
			if (!showTrailingZeroes) {
				stringResult = parseFloat(stringResult, 10).toString();
			}
			return stringResult;
		};

		return new ConversionService();
	});