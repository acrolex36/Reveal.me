import {rest} from 'msw'
import UserData from '../../cypress/fixtures/UserData.json'
import FilteredUsers from '../../cypress/fixtures/FilteredUsers.json'
import Login from '../../cypress/fixtures/Login.json'
import ConversationSwipe from "../../cypress/fixtures/ConversationSwipe.json"
const BASE_URL = "http://localhost:5000/api"

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [

    rest.post(`${BASE_URL}/auth/login`,
        (req, res, ctx) => {
            return res(ctx.status(201),
            ctx.json(Login))
        }),


    rest.post(`${BASE_URL}/auth/register`,
        (req, res, ctx) => {
            return res(ctx.status(201),
                ctx.json(
                    {
                        "UserId": "test1",
                        "Token": "testToken1"
                    }
                )
            )
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

    //Update swipedLeftUsers when user swiped left
    rest.put(`${BASE_URL}/user/profile/swipedleft/id/:id/:swipedid`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(FilteredUsers[0]))
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
            return res(ctx.status(200),
                ctx.json(ConversationSwipe));
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








]