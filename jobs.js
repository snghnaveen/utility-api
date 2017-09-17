var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./app-sqlite3.db'),
    // db = new sqlite3.Database(':memory:'),
    config = require('./app/config/config'),
    waterfall = require('async-waterfall'),
    schedule = require('node-schedule'),
    service = require('./app/services/'),
    chalk = require('chalk');

schedule.scheduleJob('17 * * * *', function () {
    console.log(chalk.bgWhite.black('Job Running...' + Date()));

    waterfall([
        fetchDataFromProvider(),
        pushDataToDb
    ], function (err, result) {
        if (!err) {
            console.log(chalk.green("Done - Pushing data"));
        }
        else {
            console.log(chalk.red.bgWhite(err.message));
        }
    });


    function fetchDataFromProvider() {
        return function (callback) {
            service.getNewsResultDb(callback);
        };
    }

    function pushDataToDb(result, callback) {

        db.serialize(function () {
            var uniqueId = '_' + Math.random().toString(36).substr(2, 9);

            var createTableQuery = "create table if not exists NewsFeeds( \
            id TEXT PRIMARY KEY, \
            headLine TEXT, \
            articleBody TEXT, \
            url TEXT, \
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP \
        )";

            var insertIntoQuery = "INSERT INTO NewsFeeds \
            ( id , headLine, articleBody, url) \
            VALUES (?,?,?,?)";

            var cleanDataQuery = "DELETE FROM NewsFeeds";

            db.run(createTableQuery);

            db.run(cleanDataQuery);

            console.log(chalk.yellow("Cleaned Old Data"));

            var stmt = db.prepare(insertIntoQuery);
            var count = 0;
            result.forEach(function (eachResult) {
                stmt.run(
                    [
                        uniqueId + count,
                        eachResult.headLine,
                        eachResult.articleBody,
                        eachResult.url
                    ]);
                count++;
            });

            stmt.finalize();
        });
        callback(null, true);
    }
});


exports.getNewsResultFromDb = function (callback) {
    var countQuery = 'SELECT COUNT(*) as records FROM NewsFeeds';
    var selectQuery = "SELECT id, headLine, articleBody, url, timestamp FROM NewsFeeds";
    var resultArray = [];
    db.get(countQuery, function (err, row) {
        var numberOfRecords = row.records;
        db.each(selectQuery, function (err, row) {
            if (numberOfRecords === 0) {
                callback(new Error('No Data Found'));
            }
            resultArray.push({
                id: row.id,
                headLine: row.headLine,
                articleBody: row.articleBody,
                url: row.url,
                timestamp: row.timestamp
            });
            if (resultArray.length === numberOfRecords) {
                callback(null, resultArray)
            }
        });

    });

};
