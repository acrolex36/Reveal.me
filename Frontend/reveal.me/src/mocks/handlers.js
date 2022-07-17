import {rest} from 'msw'
import UserData from '../../cypress/fixtures/UserData.json'
import FilteredUsers from '../../cypress/fixtures/FilteredUsers.json'
import GenderedUsers from '../../cypress/fixtures/GenderedUsers.json'
import Login from '../../cypress/fixtures/Login.json'
import Login2 from '../../cypress/fixtures/Login2.json'
import CreateProfile from '../../cypress/fixtures/CreateProfile.json'
import Register from '../../cypress/fixtures/Register.json'
import Conversation from '../../cypress/fixtures/Conversation.json'
import ConversationDetail from '../../cypress/fixtures/ConversationDetail.json'
import Image from '../../cypress/fixtures/getImage.json'
import Messages from '../../cypress/fixtures/Messages.json'
import NewMessage from '../../cypress/fixtures/NewMessage.json'
import NewMessageImage from '../../cypress/fixtures/NewMessageImage.json'
import ConversationSwipe from "../../cypress/fixtures/ConversationSwipe.json"

const BASE_URL = "http://localhost:5000/api"

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [

    //login
    rest.post(`${BASE_URL}/auth/login`,
        (req, res, ctx) => {
            if (req.body.email === "bryan@test.com") {
                return res(ctx.status(201),
                    ctx.json(Login2))
            } else {
                return res(ctx.status(201),
                    ctx.json(Login))
            }
        }),

    //get user by id
    rest.get(`${BASE_URL}/singleuser/id/:id`,
        (req, res, ctx) => {
            if (req.params.id === "test") {
                return res(ctx.status(200),
                    ctx.json(UserData))
            } else if (req.params.id === "test1") {
                return res(ctx.status(200),
                    ctx.json(ConversationDetail))
            } else if (req.params.id === "test2") {
                return res(ctx.status(200),
                    ctx.json(CreateProfile))
            } else if (req.params.id === "test3") {
                return res(ctx.status(200),
                    ctx.json(Register))
            } else if (req.params.id === "Frontend") {
                return res(ctx.status(200),
                    ctx.json(UserData))
            }

        }),

    rest.get(`${BASE_URL}/filtereduser/id/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers))
        }),

    rest.get(`${BASE_URL}/gendereduser/id/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(GenderedUsers))
        }),

    //Update swipedLeftUsers when user swiped left
    rest.put(`${BASE_URL}/user/profile/swipedleft/id/:id/:swipedid`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers[0]))
        }),

    //register
    rest.post(`${BASE_URL}/auth/register`,
        (req, res, ctx) => {
            return res(ctx.status(201),
                ctx.json(
                    {
                        "userId": "test3",
                        "token": "testToken3"
                    }
                )
            )
        }),

    //Update swipedLeftUsers when undo Button pressed
    rest.put(`${BASE_URL}/user/profile/swipedleft/remove/id/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers[0]))
        }),

    // update oneSideMatch when swiped right By using Id
    rest.put(`${BASE_URL}/user/profile/id/:id/:swipedid`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers[0]))
        }),

    // Get all conversation of a user
    rest.get(`${BASE_URL}/allconversation/:userId`,
        (req, res, ctx) => {
            if (req.params.userId === "test1") {
                return res(ctx.status(200),
                    ctx.json(Conversation)
                )
            } else {
                return res(ctx.status(200),
                    ctx.json(ConversationSwipe));
            }
        }),

    // Delete a conversation
    rest.delete(`${BASE_URL}/conversation/remove/:conversationId`,
        (req, res, ctx) => {
            return res(ctx.status(200));
            //return deleted conversation
        }),

    //remove user from OneSideMatch when both of them matched
    rest.put(`${BASE_URL}/user/profile/remove/id/:id/:matchedUserId`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers[1]))
        }),

    //Create conversation
    rest.post(`${BASE_URL}/conversation/message/:userId1/:userId2`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(ConversationSwipe[0]))
        }),

    //create user
    rest.put(
        `${BASE_URL}/user/profile/head/:email`,
        (req, res, ctx) => {
            return res(ctx.status(200)
            )
        }),

    //create user with details
    rest.put(
        `${BASE_URL}/user/profile/body/:email`,
        (req, res, ctx) => {
            return res(ctx.status(200)
            )
        }),

    //get other person's picture from a conversation with userid
    rest.get(
        `${BASE_URL}/conversation/user/picture/:conversationId/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Image)
            )
        }),

    //get all messages from conversation
    rest.get(
        `${BASE_URL}/message/all/:conversationId`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Messages)
            )
        }),

    //create message for a conversation
    rest.post(`${BASE_URL}/message/:conversationId`,
        (req, res, ctx) => {
            if (req.body.message?.length < 200) {
                return res(ctx.status(201),
                    ctx.json(NewMessage)
                )
            } else {
                return res(ctx.status(201),
                    ctx.json(NewMessageImage)
                )
            }
        }),


]