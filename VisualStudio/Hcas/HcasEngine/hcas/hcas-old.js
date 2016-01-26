//For now it's going to interpret only xml2js json files, I'll think about a better way of implementing the hcas file reader later.
function ElementInternalApi(hcasEl, properties, content, classes, childrenRender) {
    function getContent() {
        var children = childrenRender();
        if (!children)
            return content;

        return children;
    }

    this.buildHtmlElement = function (name, interceptContent) {
        var innerContent = getContent();
        
        if (interceptContent)
            innerContent = interceptContent(innerContent);
        
        var tag = "";
        if (name == "html")
            tag += "<!DOCTYPE html>\n";

        tag += "<" + name;
        tag += ' data-hcas-type="{0}"'.replace("{0}", hcasEl);        
        tag += " " + properties.join(" ");
        
        if (classes) {
            tag += ' class="{0}"'.replace("{0}", classes.join(" "));
        }
            
        if (innerContent) {
            tag += ">";
            tag += innerContent;
            tag += "</" + name + ">";
        }
        else
            tag += "/>";

        return tag;
    }
}

function ElementObject(name, node, element) {
    var defaultProperties = {
        "id": {
            isContent: false,
            render: function (val) { return 'id="{0}"'.replace("{0}", val); }
        }
    }
    var children = [];
    var renderFunction = element.renderFunction;
    var properties = [];
    var content;
    var childrenClasses = element.childClasses;
    var ownClasses = [];
    
    function setProperties(props, children) {
        if (!children)
            return;
        
        for (var p in props) {
            var property = props[p];
            var child = children[p];
            if (!child) continue;
            
            if (property.isContent)
                content = child;
            else
                properties.push(property.render(child));
        }
    }
    
    function setChildProperties(childProps, props, children) {
        if (!children)
            return;
        
        for (var cp in childProps) {
            var propKey = childProps[cp];
            if (!propKey) continue;
            var propertyName = name + "." + cp;
            
            var property = props[propKey];
            var child = children[propertyName];
            if (!child) continue;
            var value = child[0];
            
            if (!value) continue;
            
            if (property.isContent)
                content = value;
            else
                properties.push(property.render(value));
        }
    }
    
    function construct() {
        var children = node[0];
        if (!children)
            return;
        
        setProperties(defaultProperties, children["$"]);
        setProperties(element.properties, children["$"]);
        setChildProperties(element.childProperties, element.properties, children);
    }
    
    //Properties
    Object.defineProperty(this, "name", {
        value: name,
        writable: false
    });
    
    Object.defineProperty(this, "children", {
        value: children,
        writable: false
    });
    
    this.addChild = function (el) {
        children.push(el);
        el.addClasses(childrenClasses);
    };
    
    this.addClasses = function (classes) {
        ownClasses = classes;
    }
    
    function childrenRender() {
        var result = "";
        for (var child in children) {
            result += children[child].render();
        }
        return result;
    }

    this.render = function () {
        return renderFunction(new ElementInternalApi(name, properties, content, ownClasses, childrenRender));
    };

    construct();
}

var hcas = function (jsonObject) {
    var hcasDom = [],
        document = null,
        elements = [];
    
    function loadElements(tree, parent) {
        if (!tree || !(tree instanceof Array) && !(tree instanceof Object)) return;
        
        for (var el in tree) {
            if (el == "$")
                continue;
            
            var node = tree[el];

            if (tree instanceof Array) {
                loadElements(node, parent);
                continue;
            }

            var element = elements[el];
            if (!element) {
                loadElements(node, parent);
                continue;
            };
            var obj = new ElementObject(el, node, element);
            
            if (!parent) {
                document = obj;
            } else {
                parent.addChild(obj);
            }

            loadElements(node, obj);
        }
    }

    function addElement(name, data) {
        elements[name] = data;
    }
    
    function loadFromJson(data) {
        loadElements(data);
    }
        
    return {
        loadFromJson: loadFromJson,
        addElement: addElement,
        renderDocument: function () {
            return document.render();
        }
    }
} ();

hcas.addElement("Page", {
    properties: [],
    childProperties: [],
    renderFunction: function (builder) {
        return builder.buildHtmlElement("html", function (content) {
            return [
                '<head>',
                '<link rel="stylesheet" href="/stylesheets/hcasLayout.css">',
                '</head>',
                '<body>',
                content,
                '</body>'
            ].join("\n");
        });
    }
});

hcas.addElement("StackPanel", {
    properties: [],
    childProperties: {},
    childClasses: [
        "stackPanelChild"
    ],
    renderFunction: function (builder, childrenRender) {
        return builder.buildHtmlElement("div");
    }
});

hcas.addElement("Header", {
    properties: {
        "text": {
            isContent: true
        }
    },
    childProperties: {},
    renderFunction: function (builder, childrenRender) {
        return builder.buildHtmlElement("h1");
    }
});

hcas.addElement("TextBlock", {
    properties: {
        "text": {
            isContent: true
        }
    },
    childProperties: {
        "Text": "text"
    },
    renderFunction: function (builder, childrenRender) {
        return builder.buildHtmlElement("p");
    }
});

hcas.addElement("Button", {
    properties: {
        "content": {
            isContent: true
        }
    },
    childProperties: {},
    renderFunction: function (builder, childrenRender) {
        return builder.buildHtmlElement("button");
    }
});

hcas.addElement("HyperLink", {
    properties: {
        "content": {
            isContent: true
        },
        "url": {
            isContent: false,
            render: function (val) {
                return 'href="{0}"'.replace("{0}", val);
            }
        }
    },
    childProperties: {},
    renderFunction: function (builder, childrenRender) {
        return builder.buildHtmlElement("a");
    }
});

module.exports = hcas;