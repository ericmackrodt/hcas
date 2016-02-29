"use strict";

var utils = require('./hcas.utils.js');
var Control = require('./hcas.control.js');
var sax = require('sax');

var controlRepository;
var documentBindings = {};

var tree = {
	name: "HcasDocument",
	render: function() {
		return this.Page.render();
	}
};
var levels = [];
var currentAttributes = {};
var finishedCallback;

var strict = true;
var parser = sax.parser(strict);

//This will probably be removed
function logTree(name) {
	console.log(Array(levels.length).join("-") + name);
}

function getPreviousNode() {
	var nodeObj;
	if (levels.length === 0) {
  		nodeObj = tree;
  		levels.push(nodeObj);
  	} else {
  		nodeObj = levels[levels.length - 1];
  	}

  	return nodeObj;
}

function parseBinding(value) {
    var regex = /^{\s*binding\s+(\w+)\s*}$/g;
    var match = regex.exec(value);
    if (match !== null) {
        var key = match[1];
        return documentBindings[key] || '';
    }

    return value;
}

parser.onattribute = function (attr) {
    currentAttributes[attr.name] = parseBinding(attr.value);
  	
  	logTree(attr.name);	
};

parser.onopentag = function (tag) {
  	var node = getPreviousNode();

  	var ct = controlRepository.retrieveControl(tag.name);
  	var control = new Control(ct);
  	levels.push(control);

  	if (node === tree && !control.isRoot)
  		throw utils.formatString("You cannot have an control of type ({0}) as the Root control", tag.name);

  	if (node instanceof Control && control.isRoot)
  		throw utils.formatString("You cannot have a Root control of type ({0}) as a child", tag.name);

  	if (node === tree) {
  		node[tag.name] = control;
  	} else {
  		node.addChild(control);
  	}	  	

  	if (Object.keys(currentAttributes).length > 0) {
  		for (var attr in currentAttributes) {
  			control.setAttribute(attr, currentAttributes[attr]);
  		}

  		currentAttributes = {};
  	}

  	logTree(tag.name);
};

parser.onclosetag = function (e) {
	levels.splice(levels.length - 1, 1);

	logTree("/" + e);
};

parser.onerror = function (e) {
	throw e;
};

// parser.ontext = function (t) {
//   	var lastNode = getPreviousNode();
//   	lastNode.$content = t;
//   	console.log(Array(levels.length).join("-") + t);
// };

parser.onend = function () {
  	finishedCallback(tree);
};

module.exports = function(repository) {
	controlRepository = repository;
	return {
		parse: function (document, bindings, callback) {
            finishedCallback = callback;
            documentBindings = bindings;
	    	parser.write(document).close();
	    }
	};
};