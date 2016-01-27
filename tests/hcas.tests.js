var hcas=require('../_build/hcas.build.js');
var chai = require('chai');

var expect = chai.expect;
chai.should();

describe('Hcas', function () {
	it('should be present', function () {
	    expect(hcas).to.exist;
	});

	// it('should have sax present', function () {
	//     expect(sax).to.exist;
	// });	

	describe('Control Registry', function() {
		var _registryInstance;

		beforeEach(function() {
			_registryInstance = new hcas.ControlRegistry();
		});

		afterEach(function() {
		});

		it('should throw an exception if control does not have a render method', function () {
			var sut = function () {
				_registryInstance.control('Control', function() {
					return {

					}
				});
			}
			expect(sut).to.throw('Control (Control) does not have a "render" function');
		});

		it('should fail when adding an Control without a type', function() {
			var sut = function () {
				_registryInstance.control(function () {
					return {
						render: function () {}
					}
				});
			};

			expect(sut).to.throw('Cannot register a control without a type name');
		});

		it('should fail when adding an Control wihout an implementation', function() {
			var sut = function () {
				_registryInstance.control("Control");
			};

			expect(sut).to.throw('The Control (Control) does not have an implementation');
		});

		it('should not be able to add two controls of the same Type', function() {
			var sut = function () {
				_registryInstance.control("Control", function () {
					return {
						render: function () {}
					}
				});

				_registryInstance.control("Control", function () {
					return {
						render: function () {}
					}
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
				}
			};

			_registryInstance.control("Control", implementation);

			var result = _registryInstance.retrieveControl("Control");
			console.log(result);
			result.should.be.an('object');
			result.render.should.be.a('function');
			result.type.should.equal('Control');
		});
	});
});