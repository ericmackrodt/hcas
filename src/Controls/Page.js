module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Page", function(api) {
		return {
			attributes: {
				title: {
					isContent: false,
					render: function (renderApi) {

					}
				}
			},
			controlAttributes: {
				Title: "title"
			},
			isRoot: true,
			allowsControls: true,
			render: function (renderApi) {
				renderApi.write('<!DOCTYPE html>');
				renderApi.startRoot('html');
				renderApi.write('<head>');
				renderApi.write('</head>');
				renderApi.write('<body>');
				renderApi.renderChildren();
				renderApi.write('</body>');
				renderApi.endRoot();
			}
		};
	});

};