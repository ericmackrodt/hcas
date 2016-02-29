module.exports = function (hcas) {
	"use strict";
    
    hcas.defineControl('Page', {
        isRoot: true, 
        allowControls: true,
        templateFile: __dirname + '/Page.html',
        stylesheets: {
            'hcas': '/css/hcas/hcas.css'
        }
    })
        
    .defineAttribute('title', {
        isContent: false,
        value: function (value) {
            return value;
        }
    });
};