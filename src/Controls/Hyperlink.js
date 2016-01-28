module.exports = function (hcas) {
	"use strict";

	var utils = require('../hcas.utils.js');

	hcas.defineControl("Hyperlink", function(api) {
		return {
			attributes: {
				content: {
					isContent: true
				},
				url: {
					render: function(value) {
						return utils.formatString(' href="{0}"', value);
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

};