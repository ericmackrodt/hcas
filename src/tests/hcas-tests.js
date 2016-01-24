var expect = chai.expect;
chai.should();

describe('Hcas', function () {

	beforeEach(function() {
	});

	afterEach(function() {
		hcas.cleanup();
	});

	it('should be present', function () {
	    expect(hcas).to.exist;
	});

	it('should have sax present', function () {
	    expect(sax).to.exist;
	});

	it('should format string with one parameter', function() {
		var format = "string {0}";
		var result = hcas.formatString(format, "parameter1");
		result.should.equal('string parameter1');
	});

	it('should format string with multiple parameters', function() {
		var format = "string {0} {1} {2}";
		var result = hcas.formatString(format, "parameter1", "parameter2", "parameter3");
		result.should.equal('string parameter1 parameter2 parameter3');
	});

	it('should fail formating if format string has missing insertion points', function() {
		var format = "string {0} {2}";
		var fn = function () {
			var result = hcas.formatString(format, "parameter1", "parameter2", "parameter3");
		};
		expect(fn).to.throw('Could not evaluate format for "string {0} {2}"');
	});

	it('should throw an exception if control does not have a render method', function () {
		var sut = function () {
			hcas.control('Control', function() {
				return {

				}
			});
		}
		expect(sut).to.throw('Control (Control) does not have a "render" function');
	});

	it('should fail when adding an Control without a type', function() {
		var sut = function () {
			hcas.control(function () {
				return {
					render: function () {}
				}
			});
		};

		expect(sut).to.throw('Cannot register a control without a type name');
	});

	it('should fail when adding an Control wihout an implementation', function() {
		var sut = function () {
			hcas.control("Control");
		};

		expect(sut).to.throw('The Control (Control) does not have an implementation');
	});

	it('should not be able to add two controls of the same Type', function() {
		var sut = function () {
			hcas.control("Control", function () {
				return {
					render: function () {}
				}
			});

			hcas.control("Control", function () {
				return {
					render: function () {}
				}
			});
		};

		expect(sut).to.throw('Cannot add two controls of the same type (Control)');
	});

	it('should fail trying to retrieve a control that does not exist', function () {
		var sut = function () {
			var result = hcas.retrieveControl('Control');
		};

		expect(sut).to.throw("Control (Control) does not exist");
	});

	it('should be able to add and retrieve a control', function() {
		var implementation = function () {
			return {
				render: function () {}
			}
		};

		hcas.control("Control", implementation);

		var result = hcas.retrieveControl("Control");
		console.log(result);
		result.should.be.an('object');
		result.render.should.be.a('function');
		result.type.should.equal('Control');
	});
});