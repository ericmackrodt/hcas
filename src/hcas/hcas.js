(function (hcas) {
	"use strict";

	var _controlRegistry;

	//A Control Registry object so it's easier to test.
	hcas.ControlRegistry = function () {
		var registeredControls = {};

		this.control = function (type, structure) {
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

		this.retrieveControl = function (type) {
			var el = registeredControls[type];
			if (!el)
				throw hcas.formatString("Control ({0}) does not exist", type);

			return el;
		};
	};

	//Keeps a singleton for control registration.
	_controlRegistry = new hcas.ControlRegistry();

	//Exposing registry's methods.
	hcas.control = _controlRegistry.control;
	hcas.retrieveControl = _controlRegistry.retrieveControl;

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);