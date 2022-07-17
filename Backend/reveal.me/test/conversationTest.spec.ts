import request  from 'supertest';
import chai from "chai"
import chaiHttp from "chai-http"

import {
    successfulRegister,
    anotherUser
} from '../testData/register.json'

import {
    fullBodyData
} from '../testData/updateData.json'

const server = require("../index.ts")
const expect = require('chai').expect;
chai.use(chaiHttp)

describe('Reveal.me Conversation API Tests', () => {
    const baseurl = 'http://localhost:5000/api'
    var userId :any
    var anotherUserId : any
    var token : any
    var conversationId : any
    var email = anotherUser.email

    //Creating the first User
    before(function(done) {
        request(baseurl)
            .post('/auth/register')
            .send(successfulRegister)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.userId).not.to.be.null;
                token = res.body.token;
                userId = res.body.userId;
                if (err) {
                    throw err;
                }
                done();
            })
    })

    //Creating the second User
    before(function(done) {
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

    //Inserting user details for the second user to be used in the Api call
    before(function(done) {
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

    //Deleting the first user
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

    //Deleting the second user
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

    //Deleting the conversation
    after(function(done) {
        request(baseurl)
            .delete(`/conversation/remove/${conversationId}`)
            .set(({ "Authorization": `Bearer ${token}` }))
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully create a conversation when both swipe right", (done) => {
        request(baseurl)
            .post(`/conversation/message/${userId}/${anotherUserId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.members).to.have.members([userId, anotherUserId])
                conversationId = res.body._id
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully get the picture", (done) => {
        request(baseurl)
            .get(`/conversation/user/picture/${conversationId}/${userId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully getting all conversation", (done) => {
        request(baseurl)
            .get(`/allconversation`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully getting all conversation from one user", (done) => {
        request(baseurl)
            .get(`/allconversation/${userId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully create a message", (done) => {
        let message = { userId: userId, message: "testing"}

        request(baseurl)
            .post(`/message/${conversationId}`)
            .send(message)
            .set("Authorization", "Bearer " + token)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.sender).to.be.equal(userId);
                expect(res.body.message).to.be.equal(message.message)
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully getting the total of all messages from a conversation", (done) => {
        request(baseurl)
            .get(`/message/total/${conversationId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.have.members([1,0])
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it("should successfully getting all messages from a conversation", (done) => {
        request(baseurl)
            .get(`/message/all/${conversationId}`)
            .set("Authorization", "Bearer " + token)
            .end(function(err,res) {
                expect(res.statusCode).to.be.equal(200);
                if (err) {
                    throw err;
                }
                done();
            })
    });
});


    