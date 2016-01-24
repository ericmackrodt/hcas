(function (hcas) {
	"use strict";

	hcas.control("Button", function(api) {
		return {
			attributes: {
				content: {
					isContent: true
				}
			},
			render: function (renderApi) {
				renderApi.startRoot('button');
				renderApi.writeContent();
				renderApi.endRoot();
			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);