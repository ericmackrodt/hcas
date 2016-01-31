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
			render: function (builder, data) {
				builder.openTag('div');
				builder.childrenPlacement();
				builder.closeTag('div');
			}
		};
	});
	
};

