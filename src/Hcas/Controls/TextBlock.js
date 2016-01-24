(function (hcas) {
	"use strict";
	
	hcas.element("TextBlock", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			allowsElements: true,
			render: function (renderApi) {
				renderApi.startRoot('p');
				renderApi.writeContent();
				renderApi.endRoot();
			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);