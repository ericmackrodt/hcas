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
});