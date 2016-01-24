(function (hcas) {
	"use strict";

	hcas.element("StackPanel", function(api) {
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
			allowsElements: true,
			render: function (renderApi) {
				renderApi.startRoot('div');
				renderApi.renderChildren();
				renderApi.endRoot();
			}
		};
	});
	
}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);

