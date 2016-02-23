var sax = sax || require('sax');
var chai = chai || require('chai');
var hcas = hcas || require('../src/hcas.js');

var expect = chai.expect;
chai.should();

describe('Hcas', function () {
	it('should be present', function () {
	    expect(hcas).to.exist;
	});

	it('should have sax present', function () {
	    expect(sax).to.exist;
	});	

	describe('Control Registry', function() {
		var _registryInstance;

		beforeEach(function() {
			_registryInstance = new hcas.ControlRegistry();
		});

		afterEach(function() {
		});

		it('should fail when adding an Control without a type', function() {
			var sut = function () {
				_registryInstance.defineControl(function () {
					return {
						render: function () {}
					};
				});
			};

			expect(sut).to.throw('Cannot register a control without a type name');
		});

		it('should not be able to add two controls of the same Type', function() {
			var sut = function () {
				_registryInstance.defineControl("Control", function () {
					return {
						render: function () {}
					};
				});

				_registryInstance.defineControl("Control", function () {
					return {
						render: function () {}
					};
				});
			};

			expect(sut).to.throw('Cannot add two controls of the same type (Control)');
		});

		it('should fail trying to retrieve a control that does not exist', function () {
			var sut = function () {
				var result = _registryInstance.retrieveControl('Control');
			};

			expect(sut).to.throw("Control (Control) does not exist");
		});

		it('should be able to add and retrieve a control', function() {
			var implementation = function () {
				return {
					render: function () {}
				};
			};

			_registryInstance.defineControl("Control", implementation);

			var result = _registryInstance.retrieveControl("Control");
			console.log(result);
			result.should.be.an('object');
			result.render.should.be.a('function');
			result.type.should.equal('Control');
		});
	});
});