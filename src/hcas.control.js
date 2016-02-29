//Object that represents an instantiated HCAS Control on Server-Side

"use strict";

var _ = require('underscore');
var utils = require('./hcas.utils.js');
var HtmlBuilder = require('./hcas.htmlBuilder.js');
var TemplateCompiler = require('./hcas.templateCompiler.js');
var fs = require('fs');

var Control = function (structure) {
    var self = this;
    
    var children = [];
    
    var controlData = {
        content: null,
        attributes: {},
        stylesheets: structure.stylesheets    
    };
    
	if (!structure)
		throw new Error('A control needs to be instantiated with its configuration');

	if (!structure.type)
		throw new Error('A control has to have its type defined');
    
    function loadTemplate() {
        if (structure.template)
            return structure.template;
            
        if (!structure.templateFile)
            throw new Error(utils.formatString('({0}) has no template specified', structure.type));
        
        return fs.readFileSync(structure.templateFile, 'utf8');
    };

	Object.defineProperty(this, "type", {
		get: function () {
			return structure.type;
		}
	});

	Object.defineProperty(this, "isRoot", {
		get: function () {
			return structure.isRoot || false;
		}
	});

	Object.defineProperty(this, "content", {
		get: function () {
			return controlData.content || '';
		}
	});

	Object.defineProperty(this, "attributeValues", {
		get: function () {
			return controlData.attributes || [];
		}
	});
	
	Object.defineProperty(this, "children", {
		get: function () {
			return children;
		}
	});

	this.addChild = function(control) {
		children.push(control);
	};

	this.setContent = function(value) {
		controlData.content = value;
	};

	this.setAttribute = function(name, value) {
		if (!structure.attributes || !structure.attributes[name]) 
			throw utils.formatString("Control of type ({0}) does not contain an attribute named ({1})", structure.type, name);

		var attr = structure.attributes[name];

		if (attr.isContent)
			controlData.content = value;
		else {
            //Argh, this could probably be better
            var obj = {};
            for(var key in attr) {
                var val = attr[key];
                if (key === 'value')
                    val = val(value);
                obj[key] = val;   
            };         
            controlData.attributes[name] = obj;
        }
	};

	this.render = function () {
        console.log('Rendering:', structure.type);
        
        var template = loadTemplate();
        
		var compiler = new TemplateCompiler(structure.type, template, controlData, children);
		return compiler.compile();
	};
};

module.exports = Control;