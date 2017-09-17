(function () {
    var cheerio = require('cheerio'),
        request = require('request'),
        config = require('../config/config'),
        waterfall = require('async-waterfall'),
        jokeAttribute = config.jokeAttribute,
        quoteAttribute = config.quoteAttribute,
        factAttribute = config.factAttribute,
        newsAttribute = config.newsAttribute,
        noResult = 'No Result';


    exports.getJokeResult = getJokeResult;

    exports.getQuoteResult = getQuoteResult;

    exports.getFactResult = getFactResult;

    exports.getNewsResultDb = getNewsResultForDb;

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
                        callback(new Error(noResult));
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });

    }

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
                        callback(new Error(noResult));
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });
    }

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
                        callback(new Error(noResult));
                    }
                });
            }
            else {
                displayerrorMessage(res);
            }
        });
    }


    function getNewsResultForDb(callback) {
        request(newsAttribute.baseUrl, function (error, response, html) {
            fetchNewsData(html, function (err, resultData) {
                if (!err) {
                    callback(null, resultData);
                }
                else {
                    callback(new Error(noResult));
                }
            });
        });
    }

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

    function fetchNewsData(html, callback) {
        var $ = cheerio.load(html);
        var content = [];
        $('.news-card-title.news-right-box span[itemprop="headline"]').each(function (i, elm) {
            var baseUrl = 'https://www.inshorts.com';
            var titleDiv = $(this);
            var articleBodyDiv = titleDiv.parent().parent().next().children('div[itemprop="articleBody"]');

            var headLine = $(titleDiv).text(),
                articleBody = $(articleBodyDiv).text(),
                url = baseUrl + titleDiv.parent().attr('href');

            var metadata = {
                headLine: headLine,
                articleBody: articleBody,
                url: url
            };
            content.push(metadata);
        });

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

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


}());