module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Button", function(api) {
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

};