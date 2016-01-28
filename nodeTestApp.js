var express = require('express');
var fs = require('fs');
var hcas = require('./');

var app = express();

var fs = require('fs'); // this engine requires the fs module
app.engine('hcas', function (filePath, options, callback) { // define the template engine
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
});

app.set('views', './HcasTestApp'); // specify the views directory
app.set('view engine', 'hcas'); // register the template engine

var router = express.Router();

router.get('/', function (req, res) {
    console.log('Rendering view...')
    res.render('index', { title: 'Hey', message: 'Hello there!'});
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