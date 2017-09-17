var service = require('../services'),
    jobs = require('../../jobs'),
    statusOk = 200,
    unavailable = 503;


exports.jokeoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    service.getJokeResult(requestedItems, resultData, function (err, resultCompletedData) {
        if (!err) {
            res.send({
                status: statusOk,
                category: "Joke Of the day",
                message: resultCompletedData.slice(0, requestedItems)
            });
        }
        else {
            noContentFound(res);
        }
    });

};


exports.quoteoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    service.getQuoteResult(requestedItems, resultData, function (err, resultCompletedData) {
        if (!err) {
            res.send({
                status: statusOk,
                category: "Quote Of The  Day",
                message: resultCompletedData.slice(0, requestedItems)
            });
        } else {
            noContentFound(res);
        }

    });


};


exports.factoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    service.getFactResult(requestedItems, resultData, function (err, resultCompletedData) {
        if (!err) {
            res.send({
                status: statusOk,
                category: "Fact Of The  Day",
                message: resultCompletedData.slice(0, requestedItems)
            });
        } else {
            noContentFound(res);
        }
    });

};


exports.newsoftheday = function (req, res) {
    jobs.getNewsResultFromDb(function (err, resultCompletedData) {
        if (!err) {
            res.send({
                status: statusOk,
                category: "News Of The  Day",
                message: resultCompletedData
            });
        }
        else {
            noContentFound(res);
        }

    });

};

function getLengthOfRequestedItems(req) {
    var items = req.query.items;
    if (items !== 'undefined' && items >= 1 && items <= 60) {
        return items;
    }
    else {
        return 10;
    }
}

function noContentFound(res) {
    res.send({status: unavailable, result: "No Content Found", message: []});
}
