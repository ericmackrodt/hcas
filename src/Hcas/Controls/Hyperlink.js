(function (hcas) {
	"use strict";

	hcas.control("Hyperlink", function(api) {
		return {
			attributes: {
				content: {
					isContent: true
				},
				url: {
					render: function(value) {
						return hcas.formatString(' href="{0}"', value);
					}
				}
			},
			render: function (renderApi) {
				renderApi.startRoot('a', true);
				renderApi.writeContent();
				renderApi.endRoot();
			}
		};
	});

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);