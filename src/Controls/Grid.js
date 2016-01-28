module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Grid", function(api) {
		return {
			attributes: {
			},
			inheritAttributes: {
				'Row': {
					render: function() {}
				}
			},
			render: function (renderApi) {
				renderApi.startRoot('div');
				renderApi.renderChildren();
				renderApi.endRoot();
			}
		};
	});

};