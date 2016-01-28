module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("Header", function(api) {
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

};