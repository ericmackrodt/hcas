var _ = require('underscore');
var utils = require('./hcas.utils.js');

var TemplateCompiler = (function (type, template, data, children) {
    var hcasTypeRegex = /\<.+data.hcastype="(\w+)".*\>/g;
    var stylesheetsRegex = /\[stylesheets(\.([\w]+|\*|\(([\w\d,]+)\)))?\]/g;
    var attributesRegex = /\s*?\[attributes(\.([\w]+|\*|\(([\w\d,]+)\)))?\]/g;
    var childrenRegex = /\[children\]/g;
    var contentRegex = /\[content\]/g;
    
    function buildSingleAttribute(attribute) {
        var attr = data.attributes[attribute];
        if (attr.selector)
            return utils.formatString(' {0}="{1}"', attr.selector, attr.value);
        return attr.value;
    }
    
    function buildMultipleAttributes(selector) {
        var attributes;
        if (selector === '*')
            attributes = _.map(Object.keys(data.attributes), function (key) {
                return data.attributes[key];
            });
        else {
            var attrs = selector.split(',');
            attributes = _.chain(attrs)
            .filter(function (item) {
                return _.contains(Object.keys(data.attributes), item);
            })
            .map(function(item) {
                return data.attributes[item];
            })
            .value();
        }
        
        var values = [];

        for (var i in attributes) {
            var attribute = attributes[i];
            var item = _.find(values, function(item) {
                return item.selector === attribute.selector; 
            });
            if (!item) {
                item = { selector: attribute.selector, values: [] };
                values.push(item);
            }
            item.values.push(attribute.value);
        };
        
        var compiledAttributes = _.map(values, function(attribute) {
             return utils.formatString(' {0}="{1}"', attribute.selector, attribute.values.join(' '));
        });
        return compiledAttributes.join(' ');        
    }
    
    function getAttributes(m) {
        var match = attributesRegex.exec(m);
        
        if (!match[3] && match[2] && match[2] !== '*')
            return buildSingleAttribute(match[2]);
            
        var selector = match[3] || '*';
        return buildMultipleAttributes(selector);
    }

    function compileAttributes() {
        var matches = template.match(attributesRegex);
        for (var i in matches) {
            var match = matches[i];
            template = template.replace(match, getAttributes(match));
        }
    }
    
    function getStylesheets(m) {
        var match = stylesheetsRegex.exec(m);
        var selector = match[3] || match[2] || '*';
        
        var keys = [];
        if (selector === '*') {
            keys = Object.keys(data.stylesheets);
        } else {
            keys = selector.split(',');
        }
        
        return _.map(keys, function(key) {
            return utils.formatString('<link rel="stylesheet" type="text/css" href="{0}" />\n', data.stylesheets[key]);  
        });
    }
    
    function compileStylesheets() {
        var matches = template.match(stylesheetsRegex);
        for (var i in matches) {
            var match = matches[i];
            template = template.replace(match, getStylesheets(match));
        }
    }
    
    function checkHcasType() {
        var match = hcasTypeRegex.exec(template);
        
        if (!match[1] || match[1] !== type)
            throw new Error(utils.formatString('({0}) template does not have the attribute data-hcastype defined)', type));
    }
    
    function compileContent() {
        var match = contentRegex.exec(template);
        
        if (match && match[0] === '[content]') {
            template = template.replace('[content]', data.content);
        }
    }
    
    function compileChildren() {
        var match = childrenRegex.exec(template);
        
        if (match && match[0] === '[children]') {
            var childs = _.map(children, function(child) {
               return child.render();
            });
            template = template.replace('[children]', childs.join('\n'));
        }
    }

    this.compile = function (callback) {
        checkHcasType();
        compileAttributes();
        compileStylesheets();
        compileContent();
        compileChildren();
        return template;
    };
});

module.exports = TemplateCompiler;