var sax = sax || require('sax');
var chai = chai || require('chai');
var ControlApi = ControlApi || require('../src/hcas.controlApi.js');

var expect = chai.expect;
chai.should();

describe('Hcas', function () {
    describe('ControlApi', function () {
        var _controlApi;
        
        beforeEach(function () {
            _controlApi = new ControlApi('Type', { isRoot: true });
        });
        
        afterEach(function () {
        });
        
        it('should default structure defined', function () {
            _controlApi = new ControlApi('Type');
            var result = _controlApi.getStructure();
            result.should.deep.equals({
                type: 'Type'
            });
        });
        
        it('should have structure defined', function () {
            var result = _controlApi.getStructure();
            result.should.deep.equals({
                type: 'Type',
                isRoot: true
            });
        });
        
        it('should fail if no type defined', function () {
            var sut = function () {
                new ControlApi();
            };
            
            expect(sut).to.throw('A ControlApi instance has to have a type');
        });
        
        describe('defineType', function () {
            it('should set the type', function () {
                _controlApi.defineType('AnotherType');
                var result = _controlApi.getStructure();
                result.type.should.equal('AnotherType');
            });
        });

        describe('defineAttribute', function () {
            it('should fail if no name is defined', function () {
                var sut = function () {
                    _controlApi.defineAttribute({});
                };
                
                expect(sut).to.throw('You have to define a name for an attribute in (Type)');
            });
            
            it('should not set attribute if no strucutre', function () {
                _controlApi.defineAttribute('someAttribute');
                var result = _controlApi.getStructure();
                expect(result).to.not.have.property('someAttribute');
            });
            
            it('should set an attribute', function () {
                _controlApi.defineAttribute('someAttribute', {
                    isContent: true
                });
                var result = _controlApi.getStructure();
                expect(result.attributes).to.have.property('someAttribute').that.deep.equals({
                    isContent: true
                });
            });
        });

        describe('defineRender', function () {
            it('should fail if empty', function () {
                var sut = function () {
                    _controlApi.defineRender();
                };
                
                expect(sut).to.throw('No render function was defined for (Type)');
            });
            
            it('should fail if not a function', function () {
                var sut = function () {
                    _controlApi.defineRender({});
                };
                
                expect(sut).to.throw('No render function was defined for (Type)');
            });
            
            it('should set render function', function () {
                _controlApi.defineRender(function () { });
                var result = _controlApi.getStructure();
                expect(result).to.have.property('render').that.is.a('function');
            });
        });

        describe('defineTagAttribute', function () {
            it('should fail if no name', function () {
                var sut = function () {
                    _controlApi.defineTagAttribute();
                };
                
                expect(sut).to.throw('You have to define a name for a Tag Attribute in (Type)');
            });
            
            it('should fail no related attribute defined', function () {
                var sut = function () {
                    _controlApi.defineTagAttribute('Attribute');
                };
                
                expect(sut).to.throw('You have to associate the (Attribute) Tag Attribute to an attribute in (Type)');
            });
            
            it('should set a tag attribute', function () {
                _controlApi.defineTagAttribute('Attribute', 'attribute');
                var result = _controlApi.getStructure();
                expect(result.tagAttributes).to.have.property('Attribute').that.equal('attribute');
            });
        });
    });
});