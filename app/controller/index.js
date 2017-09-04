var cheerio = require('cheerio'),
    request = require('request'),
    config = require('../config/config'),
    jokeUrls = config.jokeUrls,
    quoteUrls = config.quoteUrls,
    factUrls = config.factUrls;



exports.jokeoftheday = function (req, res) {
    request(jokeUrls.jokeoftheday, function (error, response, html) {
        if (!error) {
            fetchJokedata(html, function (err, content) {
                if (!err) {
                    res.send({ status: 200, category: "Joke Of the day", message: content });
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
    request(quoteUrls.quotesoftheday, function (error, response, html) {
        if (!error) {
            fetchQuoteData(html, function (err, content) {
                if (err === false) {
                    res.send({ status: 200, category: "Quote Of the day", message: content });
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
    request(factUrls.factoftheday, function (error, response, html) {
        if (!error) {
            fetchFactData(html, function (err, content) {
                if (err === false) {
                    res.send({ status: 200, category: "Fact Of the day", message: content });
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


function displayerrorMessage(res) {
    res.send({ status: 400, message: "Something went wrong, Please try again" });
}



function noContentFound(res) {
    res.send({ status: 400, message: "No Content Found" });
}