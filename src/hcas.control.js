//Object that represents an instantiated HCAS Control on Server-Side
module.exports = (function () {
	"use strict";

	var utils = require('./hcas.utils.js');

	var Control = function (structure) {
		var children = [];
		var content = null;
		var html = [];
		var attributes = {};
		var defaultAttributes = {
			'name': function (value) {
				
			}
		};

		//Review these variables
		var isRootWritten = false;
		var rootEl;

		//Create an HTMLWRITER object
		var renderApi = {
			startRoot: function(el, shouldRenderAttributes) {
				if (isRootWritten)
					throw "You cannot write the Root control twice";

				var renderAttributes = function() {
					var attrs = Object.keys(attributes);
					for (var i in attrs) {
						var key = attrs[i];
						var attr = structure.attributes[key];
						var value = attributes[key];
						return attr.render(value);
					}
				};
				
				//CHANGE THE WAY ATTRIBUTES ARE Rendering!!
				var root = ['<', el, ' data-hcasType="', structure.type, '"' + (shouldRenderAttributes ? renderAttributes() : '') + '>'].join('');
				rootEl = el;
				html.push(root);
			},
			endRoot: function() {
				if (!rootEl)
					throw utils.formatString("No root control to render in ({0})", structure.type);

				html.push(['</', rootEl, '>'].join(''));
				isRootWritten = true;
			},
			write: function(content) {
				html.push(content);
			},
			renderChildren: function() {
				for (var i in children) {
					var child = children[i];
					html.push(child.render());
				}
			},
			writeContent: function() {
				html.push(content);
			},
			writeAttributes: function() {
				for (var key in Object.keys(attributes)) {
					var attr = structure.attributes[key];
					var value = attributes[key];
					html.push(attr.render(value));
				}
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

		this.addAttribute = function(name, value) {
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

			structure.render(renderApi);

			if (!isRootWritten)
				throw utils.formatString("You have to write a Root control for ({0})", structure.type);

			return html.join('\n');
		};
	};

	return Control;

}) ();