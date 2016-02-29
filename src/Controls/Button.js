module.exports = function (hcas) {
	"use strict";

    hcas.defineControl("Button", {
        template: '<button data-hcastype="Button">[content]</button>'
    })
    
    .defineAttribute('content', {
        isContent: true
    });
};