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
const fullHeaderData = require('../testData/updateData.json').fullHeaderData;
const missingHeaderData = require('../testData/updateData.json').missingHeaderData;
const fullBodyData = require('../testData/updateData.json').fullBodyData;
const missingBodyData = require('../testData/updateData.json').missingBodyData;


describe('Reveal.me API Tests', () => {
    const baseurl = 'http://localhost:5000/api'
    var userId
    var token
    var email = correctCredential.email

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

    it("should successfully update user", (done) => {
        request(baseurl)
            .put('/user/profile/head/' + email)
            .send(fullHeaderData)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.first_name).to.be.equal(fullHeaderData.first_name);
                expect(res.body.last_name).to.be.equal(fullHeaderData.last_name);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully update user details", (done) => {
        request(baseurl)
            .put('/user/profile/body/' + email)
            .send(fullBodyData)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.userDetail.gender).to.be.equal(fullBodyData.gender);
                expect(res.body.userDetail.gender_interest).to.have.members(fullBodyData.gender_interest);
                expect(res.body.userDetail.age).to.be.equal(fullBodyData.age);
                expect(res.body.userDetail.profile_picture).to.be.equal(fullBodyData.profile_picture);
                expect(res.body.userDetail.dob_date).to.be.equal(fullBodyData.dob_date);
                expect(res.body.userDetail.dob_month).to.be.equal(fullBodyData.dob_month);
                expect(res.body.userDetail.dob_year).to.be.equal(fullBodyData.dob_year);
                expect(res.body.userDetail.height).to.be.equal(fullBodyData.height);
                expect(res.body.userDetail.nationality).to.be.equal(fullBodyData.nationality);
                expect(res.body.userDetail.occupation).to.be.equal(fullBodyData.occupation);
                expect(res.body.userDetail.hobbies).to.have.members(fullBodyData.hobbies);
                expect(res.body.userDetail.languages).to.have.members(fullBodyData.languages);
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


    