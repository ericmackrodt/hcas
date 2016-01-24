(function (hcas) {
	"use strict";
	
	hcas.control("TextBox", function(api) {
		return {
			attributes: {
				text: {
					isContent: true
				}
			},
			childAttributes: {
				Text: "text"
			},
			allowControls: true,
			render: function (renderApi) {

			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);