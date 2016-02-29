var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', './HcasTestApp'); // specify the views directory
//app.set('view engine', '../../../../index'); // register the template engine

//because it's not possible to set up a different extension for a view engine,
//making it IMPOSSIBLE to test it as a default engine.
app.engine('hcas', require('.').__express);

var router = express.Router();

router.get('/', function (req, res) {
    console.log('Rendering view...')
    res.render('index.hcas', { title: 'Bound title', message: 'Hello there!'});
});

app.use('/', router);

app.listen(3000, function () {
  console.log('Hcas app listening on port 3000');
});