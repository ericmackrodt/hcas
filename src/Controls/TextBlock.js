module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("TextBlock", function(api) {
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

};