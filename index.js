var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // GET /style.css etc
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log('Not connected to MongoDB: ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
    }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function () {
    console.log('Listening on port 8080');
});