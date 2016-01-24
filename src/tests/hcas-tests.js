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
    	// var result = hcas.parse('<Page></Page>');
    	// result.should.be.an('Object');
    	// result.Page.should.exist;
    });

    it('sax test', function(done) {
        var doc = '<Page>' +
    '<StackPanel orientation="vertical" ' +
              'horizontalAlign="stretch" ' +
              'background="#000000">' +
        '<Header text="This is the Header" />' +
    
    '<Grid>' +
      '<!--Grid.Columns>' +
        '<Column proportion="1" />' +
        '<Column proportion="2" />' +
      '</Grid.Columns>' +
      '<Grid.Rows>' +
        '<Row proportion="1" />' +
        '<Row proportion="1" />' +
      '</Grid.Rows-->' +
  
      '<StackPanel>' +
        '<Button content="Button Top" />' +
        '<TextBlock text="TextBlock with normal text property" />' +
      '</StackPanel>  ' +
      
      '<TextBlock>' +
              '<!--TextBlock.Text>' +
                  'Before Text: This is a full, hardcoded paragraph where you can write full texts in the way you want.' +
              '</TextBlock.Text-->' +
          '</TextBlock>' +
      
      '<Button content="Button" />' +
    
      '<Hyperlink content="Wikipedia" ' +
               'url="http://www.wikipedia.org" />' +
    '</Grid>' +
    '</StackPanel>' +
'</Page>';
    	var result = hcas.parse(doc, function(result) {
            result.render();
            result.should.be.an('Object');
            result.Page.should.exist;
            done();
        });
    });
});