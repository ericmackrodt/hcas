(function (hcas) {
	"use strict";

	var registeredControls = {};

	hcas.formatString = function() {
		var content = arguments[0];
		var result = content;
		
		for (var i = 1; i < arguments.length; i++) {
			var replacer = "{" + (i - 1) + "}";
			if (content.indexOf(replacer) > -1)
				result = result.replace(replacer, arguments[i]);
			else
				throw new Error('Could not evaluate format for "{0}"'.replace('{0}', content));
		}

		return result;
	};

	hcas.control = function (type, structure) {
		if (!type || typeof type != "string")
			throw new Error("Cannot register a control without a type name");

		if (!structure || typeof structure != "function")
			throw new Error(hcas.formatString('The Control ({0}) does not have an implementation', type));

		if (registeredControls[type])
			throw new Error(hcas.formatString('Cannot add two controls of the same type ({0})', type));

		var el = structure();

		if (!el || typeof el.render != 'function')
			throw new Error(hcas.formatString('Control ({0}) does not have a "render" function', type));

		el.type = type;
		registeredControls[type] = el;
	};

	hcas.retrieveControl = function (type) {
		var el = registeredControls[type];
		if (!el)
			throw hcas.formatString("Control ({0}) does not exist", type);

		return el;
	};

	hcas.cleanup = function () {
		registeredControls = {};
	};

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);