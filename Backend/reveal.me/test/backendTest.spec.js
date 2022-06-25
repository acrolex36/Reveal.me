const request = require('supertest');
const expect = require('chai').expect;
const login = require('../testData/login.json');
const register = require('../testData/register.json');
const forgetPassword = require('../testData/forgetPassword.json');

describe('Reveal.me API Tests', () => {
    const baseurl = 'http://localhost:5000/api'
    var userId;
    var token;

    before(function(done) {
        request(baseurl)
            .post('/auth/login')
            .send(login)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should successfully create a user', (done) => {
        request(baseurl)
            .post('/auth/register')
            .send(register)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body._id).not.to.be.null;
                expect(res.body.first_name).to.be.equal(register.first_name);
                expect(res.body.last_name).to.be.equal(register.last_name);
                expect(res.body.email).to.be.equal(register.email);
                userId = res.body._id;
                if (err) {
                    throw err;
                }
                done();
            });
    });
});


    