var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require("path");
var app = express();
var db = require('./models');
var rowdy = require('rowdy-logger');
rowdy.begin(app);

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';

    request(pokemonUrl, function(error, response, body) {
        var pokemon = JSON.parse(body).results;

        res.render('index', { pokemon: pokemon });
    });
});

app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000, function() {
    rowdy.print();
});

module.exports = server;
