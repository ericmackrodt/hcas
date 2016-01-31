module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Button", function(api) {
		return {
			attributes: {
				content: {
					isContent: true
				}
			},
			render: function (builder, data) {
				builder.openTag('button');
				builder.write(data.content);
				builder.closeTag('button');
			}
		};
	});

};