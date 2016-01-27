var hcas=require('../_build/hcas.build.js');
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Hcas Utils', function () {
	describe('formatString', function () {
		it('should format with one parameter', function() {
			var format = "string {0}";
			var result = hcas.formatString(format, "parameter1");
			result.should.equal('string parameter1');
		});

		it('should format with multiple parameters', function() {
			var format = "string {0} {1} {2}";
			var result = hcas.formatString(format, "parameter1", "parameter2", "parameter3");
			result.should.equal('string parameter1 parameter2 parameter3');
		});

		it('should fail if string has missing insertion points', function() {
			var format = "string {0} {2}";
			var fn = function () {
				var result = hcas.formatString(format, "parameter1", "parameter2", "parameter3");
			};
			expect(fn).to.throw('Could not evaluate format for "string {0} {2}"');
		});
	});
});