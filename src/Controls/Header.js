module.exports = function (hcas) {
	"use strict";
	
    hcas.defineControl("Header", {
        template: '<h1 data-hcastype="Header">[content]</h1>',
    })
    
    .defineAttribute('text', {
        isContent: true
    });
};