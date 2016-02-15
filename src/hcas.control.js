//Object that represents an instantiated HCAS Control on Server-Side

"use strict";

var utils = require('./hcas.utils.js');
var HtmlBuilder = require('./hcas.htmlBuilder.js');

var Control = function (structure) {
	var children = [];
	var content = null;
	var html = [];
	var attributes = {};

	if (!structure)
		throw new Error('A control needs to be instantiated with its configuration');

	if (!structure.type)
		throw new Error('A control has to have its type defined');

	//TODO: HTMLBUILDER HAS TO ADD THE data-hcastype ATTRIBUTES! 
	var htmlBuilder = new HtmlBuilder();
	
	htmlBuilder.onChildrenCall = function () {
        var childrenHtml = [];
        for (var i in children) {
            var child = children[i];
            childrenHtml.push(child.render());
        }
        return childrenHtml.join('\n'); //don't know if \n will be really necessary
	};

	var defaultAttributes = {
		'name': function (value) {
			
		}
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
			return content || '';
		}
	});

	Object.defineProperty(this, "attributeValues", {
		get: function () {
			return attributes || [];
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
		content = value;
	};

	this.setAttribute = function(name, value) {
		if (!structure.attributes || !structure.attributes[name]) 
			throw utils.formatString("Control of type ({0}) does not contain an attribute named ({1})", structure.type, name);

		var attr = structure.attributes[name];

		if (attr.isContent)
			content = value;
		else 
			attributes[name] = value;
	};

	this.render = function () {
		console.log('Rendering:', structure.type);
		structure.render(htmlBuilder, { content: content });

		return htmlBuilder.build();
	};
};

module.exports = Control;