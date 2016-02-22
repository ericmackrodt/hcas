var chai = chai || require('chai');
var HtmlBuilder = require('../src/hcas.htmlBuilder.js');

var expect = chai.expect;
chai.should();

describe('Hcas HtmlBuilder', function () {
	var htmlBuilder;

	beforeEach(function() {
		htmlBuilder = new HtmlBuilder();
	});

	afterEach(function() {
	});

	it('getArray should return empty when new instance', function() {
		var result = htmlBuilder.getArray();
		result.should.eql([]);
	});

	it('build should return empty string when new instance', function() {
		var result = htmlBuilder.build();
		result.should.equal("");
	});

	describe('write', function() {
		it('should add text', function() {
			htmlBuilder.write('text');
			var result = htmlBuilder.build();
			result.should.equal("text");
		});
	});

	describe('writeLine', function() {
		it('should write new line when empty', function() {
			htmlBuilder.writeLine();
			var result = htmlBuilder.build();
			result.should.equal("\n");
		});

		it('should write text in new line', function() {
			htmlBuilder.writeLine('text');
			var result = htmlBuilder.build();
			result.should.equal("\ntext");
		});
	});

	describe('openTag', function() {        
		it('should throw exception if empty', function() {
			expect(htmlBuilder.openTag).to.throw('You have to specify a tag name');
		});

		it('should add the beginning of a tag', function() {
			htmlBuilder.openTag('div');
			var result = htmlBuilder.build();
			result.should.equal("<div>");
		});
        
        it('should show data-hcastype on tag', function () {
            htmlBuilder = new HtmlBuilder('SomeType');
            htmlBuilder.openTag('div');
            var result = htmlBuilder.build();
            result.should.equal('<div data-hcastype="SomeType">');
        });
        
        it('should show data-hcastype only on first tag', function () {
            htmlBuilder = new HtmlBuilder('SomeType');
            htmlBuilder.openTag('div');
            htmlBuilder.openTag('span');
            var result = htmlBuilder.build();
            result.should.equal('<div data-hcastype="SomeType"><span>');
        });

        it('should be able to open tags with an attribute', function () {
            htmlBuilder.openTag('div', { 'class': 'someClass' });
            var result = htmlBuilder.build();
            result.should.equal('<div class="someClass">');
        });

        it('should be able to open tags with multiple attributes', function () {
            htmlBuilder.openTag('div', { 'class': 'someClass', 'style': 'background: #FFFFFF', 'data-someData': 'someData' });
            var result = htmlBuilder.build();
            result.should.equal('<div class="someClass" style="background: #FFFFFF" data-someData="someData">');
        });
	});

	describe('closeTag', function() {
		it('should throw exception if empty', function() {
			expect(htmlBuilder.closeTag).to.throw('You have to specify a tag name');
		});

		it('should self-close tag if no content', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal("<div />");
		});

		it('should close tag', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.write('text');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal("<div>text</div>");
		});

		it('should throw exception if did not open a tag', function() {
			htmlBuilder.openTag('div');
			var fn = function() {
				htmlBuilder.closeTag('span');	
			};
			expect(fn).to.throw('You have to open a (span) tag before closing it');
		});

		//maybe this test should be renamed
		it('should throw exception trying to close tag without closing a subsequent one', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.openTag('span');
			var fn = function() {
				htmlBuilder.closeTag('div');	
			};
			expect(fn).to.throw('You have to close (span) before closing (div)');
		});
    });
    
    describe('selfClosingTag', function () {
        it('should throw exception if empty', function () {
            expect(htmlBuilder.selfClosingTag).to.throw('You have to specify a tag name');
        });
        
        it('should add a self-closing tag', function () {
            htmlBuilder.selfClosingTag('div');
            var result = htmlBuilder.build();
            result.should.equal("<div />");
        });
        
        it('should show data-hcastype on self-closing tag', function () {
            htmlBuilder = new HtmlBuilder('SomeType');
            htmlBuilder.selfClosingTag('div');
            var result = htmlBuilder.build();
            result.should.equal('<div data-hcastype="SomeType" />');
        });
        
        it('should be able to open self-closing tags with an attribute', function () {
            htmlBuilder.selfClosingTag('div', { 'class': 'someClass' });
            var result = htmlBuilder.build();
            result.should.equal('<div class="someClass" />');
        });
        
        it('should be able to open self-closing tags with multiple attributes', function () {
            htmlBuilder.selfClosingTag('div', { 'class': 'someClass', 'style': 'background: #FFFFFF', 'data-someData': 'someData' });
            var result = htmlBuilder.build();
            result.should.equal('<div class="someClass" style="background: #FFFFFF" data-someData="someData" />');
        });
    });

	describe('addAttribute', function() {
		it('should throw exception if no key', function() {
			expect(function () { 
				htmlBuilder.openTag('div');
				htmlBuilder.addAttribute(null, "attr"); 
			}).to.throw('You have to specify a key for the attribute');
		});

		it('should throw exception if no value', function() {
			expect(function () { 
				htmlBuilder.openTag('div');
				htmlBuilder.addAttribute("attr"); 
			}).to.throw('You have to specify a value for the attribte');
		});

		it('should throw exception if no open tag', function() {
			expect(function () { htmlBuilder.addAttribute("key", "attr"); }).to.throw('You have open a tag before specifying an attribute');
		});

		it('should throw exception if key is not string', function() {
			expect(function () { 
				htmlBuilder.openTag('div');
				htmlBuilder.addAttribute({}, "attr"); 
			}).to.throw('Keys for attributes have to be strings');
		});

		it('should throw exception if value is an object', function() {
			expect(function () { 
				htmlBuilder.openTag('div');
				htmlBuilder.addAttribute("key", {}); 
			}).to.throw('The value of an attribute has to be a base type (string, int, char, double, ...)');
		});

		it('should throw exception if value is a function', function() {
			expect(function () { 
				htmlBuilder.openTag('div');
				htmlBuilder.addAttribute("key", function() {}); 
			}).to.throw('The value of an attribute has to be a base type (string, int, char, double, ...)');
		});

		it('should add an attribute', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttribute('href', 'http://someaddress.com');
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a href="http://someaddress.com" />');
		});

		it('should add multiple attributes if used multiple times', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttribute('href', 'http://someaddress.com');
			htmlBuilder.addAttribute('title', 'sometitle');
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a href="http://someaddress.com" title="sometitle" />');
		});
	});

	describe('addAttributes', function() {
		it('should do nothing if empty', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttributes();
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a />');
		});

		it('should do nothing if empty object', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttributes({});
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a />');
		});

		it('should be able to add one attribute', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttributes({href: 'http://someaddress.com'});
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a href="http://someaddress.com" />');
		});

		it('should be able to add multiple attributes', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addAttributes({href: 'http://someaddress.com', title: 'sometitle'});
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a href="http://someaddress.com" title="sometitle" />');
		});
	});

	describe('addClass', function() {
		it('should do nothing if empty', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass();
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div />');
		});

		it('should add class', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass('class');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div class="class" />');
		});

		it('should add multiple classes if called multiple times', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass('class1');
			htmlBuilder.addClass('class2');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div class="class1 class2" />');
		});
	});

	describe('removeClass', function() {
		it('should do nothing if empty', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass('class1');
			htmlBuilder.removeClass();
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div class="class1" />');
		});

		it('should remove a single class when multiple', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass('class1');
			htmlBuilder.addClass('class2');
			htmlBuilder.removeClass('class1');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div class="class2" />');
		});

		it('should remove the class attribute if there is only one class', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addClass('class1');
			htmlBuilder.removeClass('class1');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div />');
		});
	});

	describe('addStyle', function() {
		it('should throw exception if no key', function() {
			expect(function () { htmlBuilder.addStyle(null, "0px"); }).to.throw('You have to specify a key for the styles');
		});

		it('should throw exception if no value', function() {
			expect(function () { htmlBuilder.addStyle("attr"); }).to.throw('You have to specify a value for the style');
		});

		it('should add the style property to the tag', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff" />');
		});

		it('should add multiple styles to the same style property', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.addStyle('display', 'none');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff; display: none" />');
		});
	});

	describe('addStyles', function() {
		it('should do nothing if empty', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addStyles();
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a />');
		});

		it('should do nothing if empty object', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addStyles({});
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a />');
		});

		it('should add one style', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyles({ 'background': '#ffffff' });
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff" />');
		});

		it('should add multiple styles', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyles({ 'background': '#ffffff', 'display': 'none' });
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff; display: none" />');
		});

		it('should add style from object without losing the ones already included', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.addStyle('display', 'none');
			htmlBuilder.addStyles({ 'color': '#000000' });
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff; display: none; color: #000000" />');
		});
	});

	describe('removeStyle', function() {
		it('should do nothing if empty', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.removeStyle();
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="background: #ffffff" />');
		});

		it('should remove a single style entry when multiple', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.addStyle('display', 'none');
			htmlBuilder.removeStyle('background');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div style="display: none" />');
		});

		it('should remove the style attribute if there is only one style entry', function() {
			htmlBuilder.openTag('div');
			htmlBuilder.addStyle('background', '#ffffff');
			htmlBuilder.removeStyle('background');
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div />');
		});
	});

	describe('childrenPlacement', function() {
		it('should call children placement event', function() {
			htmlBuilder.onChildrenCall = function() {
				return "<span />";
			};
			htmlBuilder.openTag('div');
			htmlBuilder.childrenPlacement();
			htmlBuilder.closeTag('div');
			var result = htmlBuilder.build();
			result.should.equal('<div><span /></div>');

		});
	});

	describe('addData', function() {
		it('should throw exception if no key', function() {
			expect(function () { htmlBuilder.addData(null, "data"); }).to.throw('You have to specify a key for data attributes');
		});

		it('should throw exception if no value', function() {
			expect(function () { htmlBuilder.addData("attr"); }).to.throw('You have to specify a value for data attributes');
		});

		it('should throw exception if key is not string', function() {
			expect(function () { htmlBuilder.addData({}, "attr"); }).to.throw('Keys for data attributes have to be strings');
		});

		it('should throw exception if value is a function', function() {
			expect(function () { htmlBuilder.addData("attr", function() {}); }).to.throw('The value of a data attribute cannot be a function');
		});

		it('should add a data attribute', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addData('attr', 'someattr');
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a data-attr="someattr" />');
		});

		it('should be able to add a data attribute with json object', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addData('attr', { some: 'attr' });
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			//this might not work
			result.should.equal('<a data-attr="{"some":"attr"}" />');
		});

		it('should add multiple data-attributes if used multiple times', function() {
			htmlBuilder.openTag('a');
			htmlBuilder.addData('attr1', 'value1');
			htmlBuilder.addData('attr2', 'value2');
			htmlBuilder.closeTag('a');
			var result = htmlBuilder.build();
			result.should.equal('<a data-attr1="value1" data-attr2="value2" />');
		});
    });

    describe('addStylesheet', function () {        
        it('should add a stylesheet', function () {
            htmlBuilder.addStylesheet('somestyle.css');
            var result = htmlBuilder.build();
            result.should.equal('<link rel="stylesheet" type="text/css" href="somestyle.css" />');
        });
    });

    it('should allow fluent calls', function () {
        htmlBuilder.onChildrenCall = function () {
            return '<span class="child" />';
        };
        
        var result = htmlBuilder
            .addStylesheet('somestyle.css')
            .openTag('div')
            .addAttribute('data-someData', 'someData')
            .addAttributes({ 'attr1': 'attr1', 'attr2': 'attr2' })
            .addClass('someClass')
            .addClass('otherClass')
            .removeClass('someClass')
            .addStyle('background', '#FFFFFF')
            .addStyles({ display: 'none', position: 'relative' })
            .removeStyle('display')
            .addData('data1', 'data1')
            .childrenPlacement()
            .write('text')
            .writeLine('secondText')
            .closeTag('div')
            .selfClosingTag('span')
            .build();

        result.should.equal('<link rel="stylesheet" type="text/css" href="somestyle.css" /><div data-someData="someData" attr1="attr1" attr2="attr2" class="otherClass" style="background: #FFFFFF; position: relative" data-data1="data1"><span class="child" />text\nsecondText</div><span />');
    });
});