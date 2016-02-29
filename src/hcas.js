"use strict";

var defaultControlsFolder = './Controls/';
var parser = require('./hcas.parser.js');
var utils = require('./hcas.utils.js');
var ControlApi = require('./hcas.controlApi.js');

var hcas = module.exports = {};

hcas.ControlRegistry = function () {
    var registeredControls = {};
    
    this.defineControl = function (type, structure) {
        if (!type || typeof type != "string")
            throw new Error("Cannot register a control without a type name");
        
        if (registeredControls[type])
            throw new Error(utils.formatString('Cannot add two controls of the same type ({0})', type));
        
        var definition;
        
        if (typeof structure === 'object' || !structure) {
            definition = structure || {};
        } else if (typeof structure === 'function') {
            definition = structure();
        }
        
        var el = new ControlApi(type, definition);

        registeredControls[type] = el;

        return el;
    };
    
    this.retrieveControl = function (type) {
        var el = registeredControls[type];
        if (!el)
            throw utils.formatString("Control ({0}) does not exist", type);
        
        return el.getStructure();
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
    if (!file.endsWith('.js')) return;
    console.log(file);
	require(defaultControlsFolder + file)(hcas);
});