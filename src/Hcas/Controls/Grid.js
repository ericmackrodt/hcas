(function (hcas) {
	"use strict";

	hcas.control("Grid", function(api) {
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

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);