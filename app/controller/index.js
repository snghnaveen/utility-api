var cheerio = require('cheerio'),
    request = require('request'),
    config = require('../config/config'),
    jokeAttribute = config.jokeAttribute,
    quoteAttribute = config.quoteAttribute,
    factAttribute = config.factAttribute,
    statusOk = 200,
    unavailable = 503;


exports.jokeoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    getJokeResult(requestedItems, resultData, function (err, resultCompletedData) {
        res.send({
            status: statusOk,
            category: "Joke Of the day",
            message: resultCompletedData.slice(0, requestedItems)
        });
    });

    function getJokeResult(requestedItems, resultData, callback) {
        request(jokeAttribute.baseUrl + getRandomTopic(jokeAttribute), function (error, response, html) {
            if (!error) {
                fetchJokedata(html, function (err, content) {
                    if (!err) {
                        content.forEach(function (eachItem) {
                            resultData.push(eachItem);
                        });
                        resultData = resultData.filter(onlyUnique);
                        if (resultData.length > requestedItems) {
                            callback(null, resultData);
                        } else {
                            getJokeResult(requestedItems, resultData, callback);
                        }
                    }
                    else {
                        noContentFound(res);
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });

    }
};


exports.quoteoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    getQuoteResult(requestedItems, resultData, function (err, resultCompletedData) {
        res.send({
            status: statusOk,
            category: "Quote Of The  Day",
            message: resultCompletedData.slice(0, requestedItems)
        });
    });

    function getQuoteResult(requestedItems, resultData, callback) {
        request(quoteAttribute.baseUrl + getRandomTopic(quoteAttribute), function (error, response, html) {
            if (!error) {
                fetchQuoteData(html, function (err, content) {
                    if (!err) {
                        content.forEach(function (eachItem) {
                            resultData.push(eachItem);
                        });
                        resultData = resultData.filter(onlyUnique);
                        if (resultData.length > requestedItems) {
                            callback(null, resultData);
                        } else {
                            getQuoteResult(requestedItems, resultData, callback);
                        }
                    }
                    else {
                        noContentFound(res);
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });
    }
};


exports.factoftheday = function (req, res) {
    var requestedItems = getLengthOfRequestedItems(req);
    var resultData = [];
    getFactResult(requestedItems, resultData, function (err, resultCompletedData) {
        res.send({
            status: statusOk,
            category: "Fact Of The  Day",
            message: resultCompletedData.slice(0, requestedItems)
        });
    });

    function getFactResult(requestedItems, resultData, callback) {
        request(factAttribute.baseUrl, function (error, response, html) {
            if (!error) {
                fetchFactData(html, function (err, content) {
                    if (!err) {
                        content.forEach(function (eachItem) {
                            resultData.push(eachItem);
                        });
                        resultData = resultData.filter(onlyUnique);
                        if (resultData.length > requestedItems) {
                            callback(null, resultData);
                        } else {
                            getFactResult(requestedItems, resultData, callback);
                        }
                    }
                    else {
                        noContentFound(res);
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });
    }
};


function fetchJokedata(html, callback) {
    var $ = cheerio.load(html);
    var content = [];
    $('.joke-text p').not('.joke-name').each(function (i, elm) {
        var joke = $(this).text();
        joke = joke.trim();
        content.push(joke);
    });
    if (content.length >= 1) {
        callback(false, content);
    }
    else {
        callback(true, content);
    }
}


function fetchQuoteData(html, callback) {
    var $ = cheerio.load(html);
    var content = [];
    $('.b-qt').each(function (i, elm) {
        var quote = $(this).text();
        quote = quote.trim();
        content.push(quote);
    });
    if (content.length >= 1) {
        callback(false, content);
    }
    else {
        callback(true, content);
    }
}


function fetchFactData(html, callback) {
    var $ = cheerio.load(html);
    var content = [];
    var facts = $('#f').text();
    facts = facts.trim();
    facts = facts.replace(/\n/g, "");
    facts = facts.replace(/tweet/gi, "|");
    facts = facts.split("|");
    facts.pop();
    facts.forEach(function (fact) {
        content.push(fact);
    }, this);

    if (content.length >= 1) {
        callback(false, content);
    }
    else {
        callback(true, content);
    }
}


function getRandomTopic(attribute) {
    var randomCategory = attribute.randomCategory;
    return randomCategory[Math.floor(Math.random() * randomCategory.length)];
}


function displayerrorMessage(res) {
    res.send({status: unavailable, result: "Something went wrong, Please try again", message: []});
}


function noContentFound(res) {
    res.send({status: unavailable, result: "No Content Found", message: []});
}


function getLengthOfRequestedItems(req) {
    var items = req.query.items;
    if (items !== 'undefined' && items >= 1 && items <= 60) {
        return items;
    }
    else {
        return 10;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
