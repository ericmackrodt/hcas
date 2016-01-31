module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("TextBlock", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			allowsControls: true,
			render: function (builder, data) {
				builder.openTag('p');
				builder.write(data.content);
				builder.closeTag('p');
			}
		};
	});

};