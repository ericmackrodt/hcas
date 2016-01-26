//Object that represents an instantiated HCAS Control on Server-Side
(function (hcas) {
	"use strict";

	hcas.HtmlBuilder = function () {
		var htmlArray = [];
		var openedTags = [];

		function tag(str) {
			return ['<', str, '>'].join('');
		}

		function endTag(str) {
			return ['</', str, '>'].join('');
		}

		this.write = function(val) {
			htmlArray.push(val);
		};

		this.writeLine = function(val) {
			htmlArray.push('\n');

			if (val)
				htmlArray.push(val);
		};

		this.openTag = function(val) {
			if (!val)
				throw new Error('You have to specify a tag name');

			htmlArray.push(tag(val));
			openedTags.push(val);
		};

		this.closeTag = function(val) {
			if (!val)
				throw new Error('You have to specify a tag name');

			var opened = false;
			for (var i in openedTags) {
				if (openedTags[i] === val)
					opened = true;
			}
			if (!opened)
				throw new Error(hcas.formatString('You have to open a ({0}) tag before closing it', val));

			var openedTag = openedTags[openedTags.length - 1];
			if (openedTag !== val)
				throw new Error(hcas.formatString('You have to close ({0}) before closing ({1})', openedTag, val));

			var lastIndex = htmlArray.length - 1;
			openedTag = htmlArray[lastIndex];

			if (openedTag === tag(val)) {
				htmlArray[lastIndex] = openedTag.replace('>', ' />');
			} else {
				htmlArray.push(endTag(val));
			}
			openedTags.splice(openedTags.length - 1, 1);
		};

		this.getArray = function() {
			return htmlArray;
		};

		this.build = function() {
			return htmlArray.join('');
		};
	};

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);