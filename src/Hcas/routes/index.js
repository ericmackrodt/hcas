var fs = require('fs');
var xml2js = require('xml2js');
var hcas = require('../HcasEngine/hcas.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    fs.readFile('./HcasApp/index.hcas', 'ascii', function (err, data) {
        if (err) {
            console.log("Could not open file" + err);
            process.exit(1);
        }
        
        var parser = new xml2js.Parser({ preserveChildrenOrder: true });
        parser.parseString(data.substring(0, data.length), function (err, result) {
            hcas.loadFromJson(result);
            var doc = hcas.renderDocument();
            res.send(doc);
        });
    });
});

module.exports = router;