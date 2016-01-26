(function (hcas) {
	"use strict";
	
	hcas.control("Header", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			render: function (renderApi) {
				renderApi.startRoot('h1');
				renderApi.writeContent();
				renderApi.endRoot();
			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);