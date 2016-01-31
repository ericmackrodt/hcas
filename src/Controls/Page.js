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
			render: function (builder, data) {
				builder.write('<!DOCTYPE html>');
				builder.openTag('html');
				builder.openTag('head');
				builder.closeTag('head');
				builder.openTag('body');
				builder.childrenPlacement();
				builder.closeTag('body');
				builder.closeTag('html');
			}
		};
	});

};