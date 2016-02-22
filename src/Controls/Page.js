module.exports = function (hcas) {
	"use strict";

	hcas.defineControl("Page", function(api) {
		return {
			attributes: {
				title: {
					isContent: false,
					value: function (value) {
                        return value;
					}
				}
			},
			controlAttributes: {
				Title: "title"
			},
			isRoot: true,
			allowsControls: true,
			render: function (builder, data) {
                builder
                    .write('<!DOCTYPE html>')
				    .openTag('html')
                    .openTag('head')
                    .addStylesheet('/css/hcas/hcas.css')
				    .closeTag('head')
				    .openTag('body')
				    .childrenPlacement()
				    .closeTag('body')
				    .closeTag('html')
			}
		};
	});

};