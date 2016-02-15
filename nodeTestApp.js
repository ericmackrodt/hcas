var express = require('express');
var fs = require('fs');
//var hcas = require('.');

var app = express();

app.set('views', './HcasTestApp'); // specify the views directory
app.set('view engine', '../../../../index'); // register the template engine

//because it's not possible to set up a different extension for a view engine,
//making it IMPOSSIBLE to test it as a default engine.
app.engine('hcas', require('.').__express);

var router = express.Router();

router.get('/', function (req, res) {
    console.log('Rendering view...')
    res.render('index.hcas', { title: 'Bound title', message: 'Hello there!'});
});

// router.get('/', function (req, res) {
//     fs.readFile('./HcasTestApp/index.hcas', 'ascii', function (err, data) {
//         if (err) {
//             console.log("Could not open file" + err);
//             process.exit(1);
//         }
        
//         hcas.parse(data.substring(0, data.length), function(result) {
//         	var html = result.render();
//         	res.send(html);
//         });
//     });
// });

app.use('/', router);

app.listen(3000, function () {
  console.log('Hcas app listening on port 3000');
});

var fs = require('fs'); // this engine requires the fs module

app.engine('ntl', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', ''+ options.title +'')
        .replace('#message#', ''+ options.message +'');
    return callback(null, rendered);
    });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine