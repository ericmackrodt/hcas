(function (hcas) {
	"use strict";

	hcas.element("Page", function(api) {
		return {
			attributes: {
				title: {
					isContent: false,
					render: function (renderApi) {

					}
				}
			},
			elementAttributes: {
				Title: "title"
			},
			isRoot: true,
			allowsElements: true,
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

}) (typeof exports === 'undefined' ? this.hcas = this.hcas || {} : exports);