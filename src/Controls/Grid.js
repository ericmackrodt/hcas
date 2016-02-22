module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Grid", function(api) {
		return {
			attributes: {
			},
			inheritAttributes: {
				'Row': {
					value: function() {}
				}
			},
			render: function (builder) {
				builder.openTag('div');
				builder.childrenPlacement();
				builder.closeTag('div');
			}
		};
	});

};