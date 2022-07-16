import {rest} from 'msw'
import UserData from '../../cypress/fixtures/UserData.json'
import FilteredUsers from '../../cypress/fixtures/FilteredUsers.json'
import Login from '../../cypress/fixtures/Login.json'
import CreateProfile from '../../cypress/fixtures/CreateProfile.json'
import Register from '../../cypress/fixtures/Register.json'
import Conversation from '../../cypress/fixtures/Conversation.json'
import Image from '../../cypress/fixtures/getImage.json'
const BASE_URL = "http://localhost:5000/api"

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [

    rest.post(`${BASE_URL}/auth/login`,
        (req, res, ctx) => {
            return res(ctx.status(201),
            ctx.json(Login))
        }),
    
    rest.get(`${BASE_URL}/singleuser/id/test1`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Register))
    }),

    rest.get(`${BASE_URL}/singleuser/id/test2`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(CreateProfile))
        }),
    
    rest.get(`${BASE_URL}/singleuser/id/62b6fccd182ddbe9be312d62`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(ConversationDetail))
        }),

    rest.get(`${BASE_URL}/singleuser/id/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(UserData))
        }),

    rest.get(`${BASE_URL}/filtereduser/id/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers))
        }),

    rest.put(`${BASE_URL}/user/profile/swipedleft/id/:id/:swipedid`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers))
        }),

    rest.post(`${BASE_URL}/auth/register`,
        (req, res, ctx) => {
            return res(ctx.status(201),
                ctx.json(
                    {
                        "userId": "test1",
                        "token": "testToken1"
                    }
                )
            )
        }),

    rest.put(
        `${BASE_URL}/user/profile/head/frontendEmail@test.com`,
        (req, res, ctx) => {
            return res(ctx.status(200)
            )
        }),
    
    rest.put(
        `${BASE_URL}/user/profile/body/frontendEmail@test.com`,
        (req, res, ctx) => {
            return res(ctx.status(200)
            )
        }),

    rest.get(
        `${BASE_URL}/allconversation/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Conversation)
            )
    }),

    rest.get(
        `${BASE_URL}/conversation/user/picture/62d325eb9eedf39daa06ead3`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Image)
            )
        })



]