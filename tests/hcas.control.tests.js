var sax = sax || require('sax');
var chai = chai || require('chai');
var Control = Control || require('../src/hcas.control.js');

var expect = chai.expect;
chai.should();

describe('Hcas', function () {
	describe('Control', function() {
		describe('Defaults', function() {
			var _control;
			beforeEach(function() {
				_control = new Control({
					type: 'Ctrl',
					isRoot: true
				});
			});

			afterEach(function() {
			});

			it('should fail if no structure', function () {
			    var fn = function() {
			    	_control = new Control();
			    };

			    expect(fn).to.throw('A control needs to be instantiated with its configuration');
			});	

			it('should fail if no type', function () {
			    var fn = function() {
			    	_control = new Control({

			    	});
			    };

			    expect(fn).to.throw('A control has to have its type defined');
			});	

			it('should contain type', function() {
				_control.type.should.equal('Ctrl');
			});

			it('should isRoot', function() {
				_control.isRoot.should.equal(true);
			});
		});

		describe('addChild', function() {
			var _control;
			beforeEach(function() {
				_control = new Control({
					type: 'Ctrl'
				});
			});

			it('should be able to add a control', function() {
				subControl = new Control({
					type: 'SubType'
				});
				_control.addChild(subControl);
				_control.children[0].should.equal(subControl);
			});
		});

		describe('setContent', function() {
			var _control;
			beforeEach(function() {
				_control = new Control({
					type: 'Ctrl'
				});
			});

			it('should be able to add content', function() {
				_control.setContent('content');
				_control.content.should.equal('content');
			});
		});

		describe('setAttribute', function() {
			var _control;
			beforeEach(function() {
				_control = new Control({
					type: 'Ctrl',
					attributes: {
						attrContent: {
							isContent: true
						},
						attrValue: {
							value: function(value) {
								return value;
							}
						}
					}
				});
			});

			it('should fail no attrubutes defined', function() {
				_control = new Control({
					type: 'Ctrl'
				});

				var fn = function () {
					_control.setAttribute('attr1', 'value');
				};

				expect(fn).to.throw('Control of type (Ctrl) does not contain an attribute named (attr1)');
			});

			it('should fail attribute does not exist', function() {
				var fn = function () {
					_control.setAttribute('attr1', 'value');
				};

				expect(fn).to.throw('Control of type (Ctrl) does not contain an attribute named (attr1)');
			});

			it('should set content if content attribute', function() {
				_control.setAttribute('attrContent', 'newContent');

				_control.content.should.equal('newContent');
			});

			it('should set value for attribute', function() {
				_control.setAttribute('attrValue', 'newValue');

				_control.attributeValues.attrValue.should.eql({ value: 'newValue' });
			});
		});
	});
});