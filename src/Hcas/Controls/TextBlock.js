(function (hcas) {
	"use strict";
	
	hcas.control("TextBlock", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			allowsControls: true,
			render: function (renderApi) {
				renderApi.startRoot('p');
				renderApi.writeContent();
				renderApi.endRoot();
			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);