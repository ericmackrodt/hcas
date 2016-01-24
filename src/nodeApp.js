var express = require('express');
var fs = require('fs');
var hcas = require('./_build/hcas.build.js');
//console.log(hcas);
var app = express();

var router = express.Router();

router.get('/', function (req, res) {
    fs.readFile('./HcasTestApp/index.hcas', 'ascii', function (err, data) {
        if (err) {
            console.log("Could not open file" + err);
            process.exit(1);
        }
        
        hcas.parse(data.substring(0, data.length), function(result) {
        	var html = result.render();
        	res.send(html);
        });
    });
});

app.use('/', router);

app.listen(8080, function () {
  console.log('Hcas app listening on port 8080');
});