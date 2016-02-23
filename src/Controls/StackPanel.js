module.exports = function (hcas) {
    "use strict";
    
    var utils = require('./../hcas.utils.js');
    
    hcas.defineControl("StackPanel", { allowsControls: true })
        
    .defineAttribute('orientation', {
        isContent: false,
        value: function (value) {
            return value;
        }
    })
    
    .defineAttribute('horizontalAlign', {
        isContent: false,
        mapTo: 'class',
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
        value: function (value) {
            return value;
        }
    })
    
    .defineAttribute('foreground', {
        value: function (value) {
            return value;
        }
    })
    
    .defineRender(function (builder, data) {
        builder
            .openTag('div')
            .addClass('stackPanel');
        
        if (data.attributes.horizontalAlign)
            builder.addClass(data.attributes.horizontalAlign);
        
        builder
            .childrenPlacement()
            .closeTag('div');
    });
};

