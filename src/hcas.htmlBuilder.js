//Object that represents an instantiated HCAS Control on Server-Side
"use strict";

var utils = require('./hcas.utils.js');
var _ = require('underscore');

var HtmlBuilder = function () {
	var htmlArray = [];

	function buildTag(tag) {
		var result = '<' + tag.$tag;

		if (tag.$attributes && Object.keys(tag.$attributes).length) {
			for (var attrKey in tag.$attributes) {
				result += utils.formatString(' {0}="{1}"', attrKey, tag.$attributes[attrKey]);
			}
		}

		if (tag.$classes && tag.$classes.length) {
			result += utils.formatString(' class="{0}"', tag.$classes.join(' '));
		}

		if (tag.$styles && Object.keys(tag.$styles).length) {
			var styles = [];
			for (var styleKey in tag.$styles) {
				styles.push(utils.formatString('{0}: {1}', styleKey, tag.$styles[styleKey]));
			}
			result += utils.formatString(' style="{0}"', styles.join('; '));
		}

		if (tag.$data && Object.keys(tag.$data).length) {
			for (var dataKey in tag.$data) {
				var value = tag.$data[dataKey];
				result += utils.formatString(' data-{0}="{1}"', dataKey, typeof value === 'object' ? JSON.stringify(value) : value);
			}
		}

		result += tag.selfClosed ? ' />' : '>';
		return result;
	}

	function buildEndTag(tag) {
		return ['</', tag.$endTag, '>'].join('');
	}

	function getHtmlStringPart(item) {
		if (item.$tag)
			return buildTag(item);
		else if (item.$endTag)
			return buildEndTag(item);
		else if (item.$raw)
			return item.$raw;
		else if (item.$childrenPlacement) 
			return item.$childrenPlacement();
	}

	this.write = function(val) {
		htmlArray.push({ '$raw': val });
	};

	this.writeLine = function(val) {
		htmlArray.push({ '$raw': '\n' + (val || '') });
	};

	this.openTag = function(val) {
		if (!val)
			throw new Error('You have to specify a tag name');

		htmlArray.push({ '$tag': val });
	};

	this.closeTag = function(val) {
		if (!val)
			throw new Error('You have to specify a tag name');

		var opened = _.some(htmlArray, function(item) {
			return item.$tag === val;
		});

		if (!opened)
			throw new Error(utils.formatString('You have to open a ({0}) tag before closing it', val));

		var openedTag = _.last(htmlArray);
		if (openedTag.$tag && openedTag.$tag !== val)
			throw new Error(utils.formatString('You have to close ({0}) before closing ({1})', openedTag.$tag, val));

		openedTag = htmlArray[htmlArray.length - 1];

		if (openedTag.$tag === val) {
			openedTag.selfClosed = true;
		} else {
			htmlArray.push({ '$endTag': val });
		}
	};

	this.addAttribute = function(key, value) {
		if (!key)
			throw new Error('You have to specify a key for the attribute');

		if (!value)
			throw new Error('You have to specify a value for the attribte');

		if (typeof key !== 'string')
			throw new Error('Keys for attributes have to be strings');

		var lastHtml = _.last(htmlArray);
		if (!lastHtml || !lastHtml.$tag)
			throw new Error('You have open a tag before specifying an attribute');

		if (typeof value === 'object' || typeof value === 'function')
			throw new Error('The value of an attribute has to be a base type (string, int, char, double, ...)');


		var openedTag = htmlArray[htmlArray.length - 1];
		openedTag.$attributes = openedTag.$attributes || {};
		openedTag.$attributes[key] = value;
	};

	this.addAttributes = function(obj) {
		var openedTag = htmlArray[htmlArray.length - 1];
		openedTag.$attributes = openedTag.$attributes || {};

		for (var key in obj)
			openedTag.$attributes[key] = obj[key];
	};

	this.addClass = function(cl) {
		if (!cl) return;

		var openedTag = _.last(htmlArray);
		openedTag.$classes = openedTag.$classes || [];
		openedTag.$classes.push(cl);		
	};

	this.removeClass = function(cl) {
		var openedTag = _.last(htmlArray);
		openedTag.$classes = openedTag.$classes || [];
		if (openedTag.$classes.indexOf(cl) > -1)
			openedTag.$classes.splice(openedTag.$classes.indexOf(cl), 1);		
	};

	this.addStyle = function(key, value) {
		if (!key)
			throw new Error('You have to specify a key for the styles');

		if (!value)
			throw new Error('You have to specify a value for the style');

		var openedTag = htmlArray[htmlArray.length - 1];
		openedTag.$styles = openedTag.$styles || {};
		openedTag.$styles[key] = value;
	};

	this.addStyles = function(obj) {
		var openedTag = _.last(htmlArray);
		openedTag.$styles = openedTag.$styles || {};
		
		for (var key in obj)
			openedTag.$styles[key] = obj[key];
	};

	this.removeStyle = function(key) {
		var openedTag = _.last(htmlArray);
		openedTag.$styles = openedTag.$styles || {};
		
		openedTag.$styles[key] = null;
		delete openedTag.$styles[key];

		if (Object.keys(openedTag.$styles).length === 0) {
			openedTag.$styles = null;
			delete openedTag.$styles;
		}
	};

	this.childrenPlacement = function() {
		htmlArray.push({ $childrenPlacement: this.onChildrenCall });
	};

	this.addData = function(key, value) {
		if (!key)
			throw new Error('You have to specify a key for data attributes');

		if (!value)
			throw new Error('You have to specify a value for data attributes');

		if (typeof key !== 'string')
			throw new Error('Keys for data attributes have to be strings');

		if (typeof value === 'function')
			throw new Error('The value of a data attribute cannot be a function');

		var openedTag = htmlArray[htmlArray.length - 1];
		openedTag.$data = openedTag.$data || {};
		openedTag.$data[key] = value;
	};

	this.getArray = function() {
		return htmlArray;
	};

	this.build = function() {
		var html = "";
		for (var i in htmlArray)
			html += getHtmlStringPart(htmlArray[i]);

		return html;
	};
};

module.exports = HtmlBuilder;