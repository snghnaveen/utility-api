process.env.NODE_ENV = 'development';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index'),
    should = chai.should(),
    expect = require('chai').expect,
    timeout = 10000;
chai.use(chaiHttp);


var endpoints = ['/api/joke/jokeoftheday',
    '/api/quote/quoteoftheday',
    '/api/fact/factoftheday',
    '/api/news/newsoftheday'];

endpoints.forEach(function (endpoint) {
    describe(' Testing For - ' + endpoint, function () {
        this.timeout(timeout);
        it(' Execuiting ...', function (done) {
            chai.request(server)
                .get(endpoint)
                .end(function (err, res) {
                    res.should.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.status).to.equal(200);
                    done();
                });
        });
    });
});
