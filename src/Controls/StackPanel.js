module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("StackPanel", function(api) {
		return {
			attributes: {
				orientation: {
					isContent: false,
					render: function (renderApi) {
						
					}
				},
				horizontalAlign: {
					isContent: false,
					render: function (renderApi) {

					}
				},
				background: {
					render: function (renderApi) {
						
					}
				}
			},
			childAttributes: {
				Title: "title"
			},
			allowsControls: true,
			render: function (renderApi) {
				renderApi.startRoot('div');
				renderApi.renderChildren();
				renderApi.endRoot();
			}
		};
	});
	
};

