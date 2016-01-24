(function (hcas) {
	"use strict";

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

	
	parser.onattribute = function (attr) {
	  	currentAttributes[attr.name] = attr.value;
	  	
	  	logTree(attr.name);	
	};

	parser.onopentag = function (tag) {
	  	var node = getPreviousNode();

	  	var ct = hcas.retrieveControl(tag.name);
	  	var control = new hcas.Control(el);
	  	levels.push(control);

	  	if (node === tree && !control.isRoot)
	  		throw hcas.formatString("You cannot have an control of type ({0}) as the Root control", tag.name);

	  	if (node instanceof hcas.Control && control.isRoot)
	  		throw hcas.formatString("You cannot have a Root control of type ({0}) as a child", tag.name);

	  	if (node === tree) {
	  		node[tag.name] = control;
	  	} else {
	  		node.addChild(control);
	  	}	  	

	  	if (Object.keys(currentAttributes).length > 0) {
	  		for (var attr in currentAttributes) {
	  			control.addAttribute(attr, currentAttributes[attr]);
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

    hcas.parse = function (document, callback) {
    	finishedCallback = callback;
    	parser.write(document).close();
    };



})(typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);