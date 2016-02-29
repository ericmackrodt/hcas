module.exports = function (hcas) {
    "use strict";
    
    var utils = require('./../hcas.utils.js');
    
    hcas.defineControl("StackPanel", {
        allowsControls: true,
        template: '<div data-hcastype="StackPanel" [attributes]>[children]</div>'
    })
        
    .defineAttribute('orientation', {
        isContent: false,
        selector: 'class',
        value: function (value) {
            return value;
        }
    })
    
    .defineAttribute('horizontalAlign', {
        isContent: false,
        selector: 'class',
        value: function (value) {
            switch (value) {
                case "top":
                    return "horizontalAlign-top";
                case "bottom":
                    return "horizontalAlign-bottom";
                case "middle":
                    return "horizontalAlign-middle";
                case "stretch":
                    return "horizontalAlign-stretch";
                default:
                    throw new Error(utils.formatString('StackPanel horizontalAlign property does not allow ({0}) as value', value));
            }
        }
    })

    .defineAttribute('background', {
        selector: 'style',
        value: function (value) {
            return utils.formatString('background: {0};', value);
        }
    })
    
    .defineAttribute('foreground', {
        selector: 'style',
        value: function (value) {
            return utils.formatString('color: {0}', value);
        }
    });
};

