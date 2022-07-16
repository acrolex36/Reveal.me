import {rest} from 'msw'
import UserData from '../../cypress/fixtures/UserData.json'
import FilteredUsers from '../../cypress/fixtures/FilteredUsers.json'
import Login from '../../cypress/fixtures/Login.json'
import CreateProfile from '../../cypress/fixtures/CreateProfile.json'
import Register from '../../cypress/fixtures/Register.json'
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
        `${BASE_URL}/allconversation/62bc5577073b704e972c4186`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json()
            )
    })



]