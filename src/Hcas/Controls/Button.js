(function (hcas) {
	"use strict";

	hcas.element("Button", function(api) {
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