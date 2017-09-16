var _ = require('lodash'),
    cheerio = require('cheerio'),
    request = require('request'),
    config = require('../config/config'),
    jokeAttribute = config.jokeAttribute,
    quoteAttribute = config.quoteAttribute,
    factAttribute = config.factAttribute;


exports.jokeoftheday = function (req, res) {
    var pageToRender = getRandomTopic(jokeAttribute);
    request(jokeAttribute.baseUrl + pageToRender, function (error, response, html) {
        if (!error) {
            fetchJokedata(html, function (err, content) {
                if (!err) {
                    res.send({status: 200, category: "Joke Of the day", message: content});
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
};


exports.quoteoftheday = function (req, res) {
    var pageToRender = getRandomTopic(quoteAttribute);
    request(quoteAttribute.baseUrl + pageToRender, function (error, response, html) {
        if (!error) {
            fetchQuoteData(html, function (err, content) {
                if (err === false) {
                    res.send({status: 200, category: "Quote Of the day", message: content});
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
};


exports.factoftheday = function (req, res) {
    request(factAttribute.baseUrl, function (error, response, html) {
        if (!error) {
            fetchFactData(html, function (err, content) {
                if (err === false) {
                    res.send({status: 200, category: "Fact Of the day", message: content});
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
    res.send({status: 400, message: "Something went wrong, Please try again"});
}


function noContentFound(res) {
    res.send({status: 400, message: "No Content Found"});
}


function getLengthOfRequestedItems(req) {
    var items = req.query.items;
    if (items !== 'undefined' && items >= 0 && items <= 60) {
        return items;
    }
    else {
        return 10;
    }
}