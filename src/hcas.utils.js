(function (hcas) {
	hcas.formatString = function() {
		var content = arguments[0];
		var result = content;
		
		for (var i = 1; i < arguments.length; i++) {
			var replacer = "{" + (i - 1) + "}";
			if (content.indexOf(replacer) > -1)
				result = result.replace(replacer, arguments[i]);
			else
				throw new Error('Could not evaluate format for "{0}"'.replace('{0}', content));
		}

		return result;
	};
}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);