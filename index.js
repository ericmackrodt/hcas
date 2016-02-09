var hcas = exports = module.exports = require('./src/hcas.js');
var fs = require('fs');

//builds express viewEngine
exports.__express = function (filePath, options, callback) {
    fs.readFile(filePath, 'ascii', function (err, data) {
        if (err) {
            console.log("Could not open file" + err);
            process.exit(1);
        }

        hcas.parse(data.substring(0, data.length), function(result) {
            rendered = result.render();
            return callback(null, rendered);
        });
    });
};

