module.exports = function (hcas) {
	"use strict";
	
	hcas.defineControl("TextBlock", function(api) {
		return {
            template: '<p data-hcastype="TextBlock">[content]</p>',
			attributes: {
				text: {
					isContent: true
				}
			},
			allowsControls: false
		};
	});

};