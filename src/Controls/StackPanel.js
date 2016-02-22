module.exports = function (hcas) {
    "use strict";
    
    var utils = require('./../hcas.utils.js');

	hcas.defineControl("StackPanel", function() {
        
        
        return {
            attributes: {
                orientation: {
                    isContent: false,
                    value: function (value) {
                        return value;
                    }
                },
                horizontalAlign: {
                    isContent: false,
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
                },
                background: {
                    value: function (value) {
                        return value;
                    }
                },
                foreground: {
                    value: function (value) {
                        return value;
                    }
                }
            },
            childAttributes: {
                Title: "title"
            },
            allowsControls: true,
            render: function (builder, data) {
                builder
                    .openTag('div')
                    .addClass('stackPanel');
                
                if (data.attributes.horizontalAlign)
                    builder.addClass(data.attributes.horizontalAlign);
				    
                builder
                    .childrenPlacement()
				    .closeTag('div');
			}
		};
	});
	
};

