import {rest} from 'msw'
import UserData from './UserData.json'
import FilteredUsers from './FilteredUsers.json'
import Login from './Login.json'
import Register from './Register.json'
import CreateProfile from './CreateProfile.json'
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
        })



]