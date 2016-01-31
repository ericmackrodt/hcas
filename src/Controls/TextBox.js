module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("TextBox", function(api) {
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
			render: function (renderApi, data) {

			}
		};
	});

};