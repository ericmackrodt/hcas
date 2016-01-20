(function (hcas) {
	"use strict"

	hcas.Document = function (doc) {
		
	};

})(typeof exports === 'undefined' ? this.hcas = {} : exports);

(function (hcas) {
	"use strict"

	var elements = {};

	var strict = true;
	var parser = sax.parser(strict);

	parser.onerror = function (e) {
		console.log(e);
	  	// an error happened.
	};
	parser.ontext = function (t) {
	  	// got some text.  t is the string of text.
	  	console.log(t);
	};
	parser.onopentag = function (node) {
	  	// opened a tag.  node has "name" and "attributes"
	  	console.log(node);
	};
	parser.onattribute = function (attr) {
	  	// an attribute.  attr has "name" and "value"
	  	console.log(attr);
	};
	parser.onend = function () {
	  	// parser stream is done, and ready to have more stuff written to it.
	  	console.log('end');
	};	

    hcas.parse = function (str) {
    	parser.write(str).close();
    	//<xml>Hello, <who name="world">world</who>!</xml>
    	return { Page: {} };
    };

    hcas.setBaseElement = function (name, fn) {

    };

    hcas.element = function(name, fn) {

    };

})(typeof exports === 'undefined' ? this.hcas = {} : exports);