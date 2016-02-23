module.exports = function (hcas) {
	"use strict";
    
    hcas.defineControl('Page', { isRoot: true, allowControls: true })
        
    .defineAttribute('title', {
        isContent: false,
        value: function (value) {
            return value;
        }
    })
    
    .defineRender(function (builder, data) {
        builder
            .write('<!DOCTYPE html>')
			.openTag('html')
            .openTag('head')
            .addStylesheet('/css/hcas/hcas.css')
			.closeTag('head')
			.openTag('body')
			.childrenPlacement()
			.closeTag('body')
			.closeTag('html');
    });
};