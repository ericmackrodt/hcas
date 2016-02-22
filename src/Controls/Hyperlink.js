module.exports = function (hcas) {
	"use strict";

	var utils = require('../hcas.utils.js');

	hcas.defineControl("Hyperlink", function(api) {
		return {
			attributes: {
				content: {
					isContent: true
				},
				url: {
					value: function(value) {
						return value;
					}
				}
			},
			render: function (builder, data) {
                builder.openTag('a');
                
                if (data.attributes.url)
                    builder.addAttribute('href', data.attributes.url);

				builder.write(data.content);
				builder.closeTag('a');
			}
		};
	});

};