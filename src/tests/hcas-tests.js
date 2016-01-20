var expect = chai.expect;
chai.should();

describe('Hcas', function () {
    it('is present', function () {
        expect(hcas).to.exist;
    });

    it('sax is present', function () {
        expect(sax).to.exist;
    });

    it('should load Page element', function() {
    	var result = hcas.parse('<Page></Page>');
    	result.should.be.an('Object');
    	result.Page.should.exist;
    });

    it('sax test', function() {
    	var result = hcas.parse('<Page><StackPanel orientation="">Potato</StackPanel></Page>');
    	result.should.be.an('Object');
    	result.Page.should.exist;
    });
});