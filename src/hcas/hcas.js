(function (hcas) {
	"use strict";

	var registeredElements = {};

	hcas.formatString = function() {
		var content = arguments[0];

		for (var i = 0 ; i < arguments.length; i++) {
			content = content.replace("{" + i + "}", arguments[i + 1]);
		}

		return content;
	};

	hcas.element = function (type, structure) {
		var el = structure();
		el.type = type;
		registeredElements[type] = el;
	};

	hcas._retrieveElement = function (type) {
		var el = registeredElements[type];
		if (!el)
			throw hcas.formatString("Element ({0}) doesn't exist.", type);

		return el;
	};

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);