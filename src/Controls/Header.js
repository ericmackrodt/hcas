module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("Header", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			render: function (builder, data) {
				builder.openTag('h1');
				builder.write(data.content);
				builder.closeTag('h1');
			}
		};
	});

};