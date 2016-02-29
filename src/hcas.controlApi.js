//Object that represents an instantiated HCAS Control on Server-Side

"use strict";

var utils = require('./hcas.utils.js');

var ControlApi = function (type, structure) {
    var self = this;
    
    if (!type || typeof type !== 'string')
        throw new Error('A ControlApi instance has to have a type');
    
    structure = structure || {};
    structure.type = type;

    this.defineType = function (type) {
        structure.type = type;
    };

    this.defineAttribute = function (name, attrDefinition) {
        structure.attributes = structure.attributes || {};
        
        if (!name || typeof name !== 'string')
            throw new Error(utils.formatString('You have to define a name for an attribute in ({0})', structure.type));
        
        if (typeof attrDefinition === 'object') {
            attrDefinition.name = name;
            structure.attributes[name] = attrDefinition;
        }
        
        return self;
    };
    
    this.defineTagAttribute = function (name, attribute) {
        structure.tagAttributes = structure.tagAttributes || {};

        if (!name || typeof name !== 'string')
            throw new Error(utils.formatString('You have to define a name for a Tag Attribute in ({0})', structure.type));

        if (!attribute || typeof attribute !== 'string')
            throw new Error(utils.formatString('You have to associate the ({0}) Tag Attribute to an attribute in ({1})', name, structure.type));

        structure.tagAttributes[name] = attribute;
    };

    this.defineTemplate = function (template) {
        if (!template) return;
        structure.template = template;
    };

    this.getStructure = function () {
        return structure;
    };
};

module.exports = ControlApi;