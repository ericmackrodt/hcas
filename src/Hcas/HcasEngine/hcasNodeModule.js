var fs = require('fs');

// Read and eval library
filedata = fs.readFileSync('./HcasEngine/hcas.js', 'utf8');
eval(filedata);


module.exports = hcas;