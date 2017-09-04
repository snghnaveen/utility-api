var controller = require('../controller/index');

module.exports = function (router) {

    router.all('/joke/jokeoftheday', function (req, res) {
        controller.jokeoftheday(req, res);
    });


    router.all('/quote/quoteoftheday', function (req, res) {
        controller.quoteoftheday(req, res);
    });


    router.all('/fact/factoftheday', function (req, res) {
        controller.factoftheday(req, res);
    });

};