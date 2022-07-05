// import request from "supertest";
// import { expect } from "chai";
// import {
//     correctCredential,
//     falseCredential
// } from "../testData/login.json";
// import {
//     successfulRegister,
//     failRegister
// } from "../testData/register.json";
// import {
//     correctConfirmPassword,
//     falseConfirmPassword,
//     passwordTooShort

// } from "../testData/forgetPassword.json"
const request = require('supertest');
const expect = require('chai').expect;
const correctCredential = require('../testData/login.json').correctCredential;
const falseCredential = require('../testData/login.json').falseCredential;
const successfulRegister = require('../testData/register.json').successfulRegister;
const failRegister = require('../testData/register.json').failRegister;
const correctConfirmPassword = require('../testData/forgetPassword.json').correctConfirmPassword;
const falseConfirmPassword = require('../testData/forgetPassword.json').falseConfirmPassword;
const passwordTooShort = require('../testData/forgetPassword.json').passwordTooShort;


describe('Reveal.me API Tests', () => {
    const baseurl = 'http://localhost:5000/api'
    var userId
    var token

    // before(function(done) {
    //     request(baseurl)
    //         .post('/auth/login')
    //         .send(login)
    //         .set('Accept', 'application/json')
    //         .set('Content-Type', 'application/json')
    //         .end(function(err, res) {
    //             expect(res.statusCode).to.be.equal(201);
    //             expect(res.body.token).not.to.be.null;
    //             token = res.body.token;
    //             if (err) {
    //                 throw err;
    //             }
    //             done();
    //         });
    // });

    after(function(done) {
        request(baseurl)
            .delete("/user/" + userId)
            .set(({ "Authorization": `Bearer ${token}` }))
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(201);
                if (err) {
                    throw err;
                }
                done();
            })
    })

    it('should successfully create a user', (done) => {
        request(baseurl)
            .post('/auth/register')
            .send(successfulRegister)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.userId).not.to.be.null;
                userId = res.body.userId;
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should fail creating the same user twice', (done) => {
        request(baseurl)
            .post('/auth/register')
            .send(successfulRegister)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(405);
                if (err) {
                    throw err;
                  }
                  done();
            });
    });

    it("should fail because password is too short", (done) => {
        request(baseurl)
            .post('/auth/register')
            .send(failRegister)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(409);
                if (err) {
                    throw err;
                  }
                  done();
            });
    });
    
    it("should successfully logging in", (done) => {
        request(baseurl)
            .post('/auth/login')
            .send(correctCredential)
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

    it("should fail logging in false credential", (done) => {
        request(baseurl)
            .post('/auth/login')
            .send(falseCredential)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(400);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully reset password", (done) => {
        request(baseurl)
            .post('/auth/login/forgetpassword')
            .send(correctConfirmPassword)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should fail reset password because confirm password does not match", (done) => {
        request(baseurl)
            .post('/auth/login/forgetpassword')
            .send(falseConfirmPassword)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(400);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should fail reset password because new password is too short", (done) => {
        request(baseurl)
            .post('/auth/login/forgetpassword')
            .send(passwordTooShort)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(409);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    // it("should successfully delete user", (done) => {
    //     request(baseurl)
    //         .delete("/user/" + userId)
    //         .set("Authorization", "Bearer " + token)
    //         .end(function(err,res) {
    //             expect(res.statusCode).to.be.equal(201);
    //             if (err) {
    //                 throw err;
    //             }
    //             done();
    //         })
    // })
});


    