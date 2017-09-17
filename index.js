var express = require('express');
var app = express();
var chalk = require('chalk');
var request = require('request');

var port = process.env.PORT || 3000;

var router = express.Router();
require('./app/routes/')(router);


app.use('/api', router);

app.get('*', function (req, res) {

    var fs = require('fs');
    fs.readFile(__dirname + '/README.md', function (err, data) {
        if (err) {
            throw err;
        }
        res.status(200).send(require('render-readme')(data.toString()));
    });

});


app.listen(port, function () {
    var environmentDetail = 'Application running on environment : ' + app.get('env');
    var hostportDetail = 'App is running on http://localhost:' + port;
    console.log(chalk.black.bgBlue(environmentDetail));
    console.log(chalk.green.bgBlack(hostportDetail));
});

module.exports = app;