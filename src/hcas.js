"use strict";

var defaultControlsFolder = './Controls/';
var parser = require('./hcas.parser.js');
var utils = require('./hcas.utils.js');

var hcas = module.exports = {};

//A Control Registry object so it's easier to test.
hcas.ControlRegistry = function () {
	var registeredControls = {};

	this.defineControl = function (type, structure) {
		if (!type || typeof type != "string")
			throw new Error("Cannot register a control without a type name");

		if (!structure || typeof structure != "function")
			throw new Error(utils.formatString('The Control ({0}) does not have an implementation', type));

		if (registeredControls[type])
			throw new Error(utils.formatString('Cannot add two controls of the same type ({0})', type));

		var el = structure();

		if (!el || typeof el.render != 'function')
			throw new Error(utils.formatString('Control ({0}) does not have a "render" function', type));

		el.type = type;
		registeredControls[type] = el;
	};

	this.retrieveControl = function (type) {
		var el = registeredControls[type];
		if (!el)
			throw utils.formatString("Control ({0}) does not exist", type);

		return el;
	};
};

//Keeps a singleton for control registration.
var _controlRegistry = new hcas.ControlRegistry();

//Exposing registry's methods.
hcas.defineControl = _controlRegistry.defineControl;
hcas.parse = parser(_controlRegistry).parse;

//This is not definitive
var normalizedPath = require("path").join(__dirname, "Controls");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  	console.log(file);
	require(defaultControlsFolder + file)(hcas);
});