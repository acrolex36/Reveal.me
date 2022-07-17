import request  from 'supertest';
import chai from "chai"
import chaiHttp from "chai-http"
import {
    correctCredential,
    falseCredential,
} from '../testData/login.json'

import {
    successfulRegister,
    failRegister,
    anotherUser
} from '../testData/register.json'

import {
    correctConfirmPassword,
    falseConfirmPassword,
    passwordTooShort
} from '../testData/forgetPassword.json'

import {
    fullHeaderData,
    fullBodyData
} from '../testData/updateData.json'

const server = require("../index.ts")
const expect = require('chai').expect;
chai.use(chaiHttp)

describe('Reveal.me user API Tests', () => {
    const baseurl = 'http://localhost:5000/api'
    var userId :any
    var anotherUserId : any
    var token : any
    var email = correctCredential.email

    //Deleting first user
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

    //Deleting second User
    after(function(done) {
        request(baseurl)
            .delete("/user/" + anotherUserId)
            .set(({ "Authorization": `Bearer ${token}` }))
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(201);
                if (err) {
                    throw err;
                }
                done();
            })
    });

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

    it('should successfully create another user', (done) => {
        request(baseurl)
            .post('/auth/register')
            .send(anotherUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.userId).not.to.be.null;
                anotherUserId = res.body.userId;
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully update oneMatchUser", (done) => {
        request(baseurl)
            .put(`/user/profile/id/${userId}/${anotherUserId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.oneSideMatch).to.have.members([userId]);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully remove UserId from oneMatchUser", (done) => {
        request(baseurl)
            .put(`/user/profile/remove/id/${userId}/${anotherUserId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.oneSideMatch).to.have.members([]);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully input anotherUserId in swipedLeftUser from UserId", (done) => {
        request(baseurl)
            .put(`/user/profile/swipedleft/id/${userId}/${anotherUserId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.swipedLeftUsers).to.have.members([anotherUserId]);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully remove anotherUserId in swipedLeftUser from UserId", (done) => {
        request(baseurl)
            .put(`/user/profile/swipedleft/remove/id/${userId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.be.equal(anotherUserId);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully getting all user", (done) => {
        request(baseurl)
            .get(`/alluser`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it("should successfully getting a user", (done) => {
        request(baseurl)
            .get(`/singleuser/id/${userId}`)
            .send(fullHeaderData)
            .send(fullBodyData)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.first_name).to.be.equal(fullHeaderData.first_name);
                expect(res.body.last_name).to.be.equal(fullHeaderData.last_name);
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

    it("should successfully getting filteredUsers", (done) => {
        request(baseurl)
            .get(`/filtereduser/id/${userId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            });
    });
});


    