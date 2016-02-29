module.exports = function (hcas) {
	"use strict";

	var utils = require('../hcas.utils.js');

    hcas.defineControl("Hyperlink", {
        template: '<a data-hcastype="Hyperlink" [attributes.url]>[content]</a>'
    })

    .defineAttribute('content', {
        isContent: true
    })
    
    .defineAttribute('url', {
        selector: 'href',
        value: function (value) {
            return value;
        }
    });
};