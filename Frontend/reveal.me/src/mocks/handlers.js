import {rest} from 'msw'
import UserData from '../../cypress/fixtures/UserData.json'
import FilteredUsers from '../../cypress/fixtures/FilteredUsers.json'
import Login from '../../cypress/fixtures/Login.json'
import Login2 from '../../cypress/fixtures/Login2.json'
import CreateProfile from '../../cypress/fixtures/CreateProfile.json'
import Register from '../../cypress/fixtures/Register.json'
import Conversation from '../../cypress/fixtures/Conversation.json'
import ConversationDetail from '../../cypress/fixtures/ConversationDetail.json'
import Image from '../../cypress/fixtures/getImage.json'
import Messages from '../../cypress/fixtures/Messages.json'
import NewMessage from '../../cypress/fixtures/NewMessage.json'
const BASE_URL = "http://localhost:5000/api"

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [

    rest.post(`${BASE_URL}/auth/login`,
        (req, res, ctx) => {
            if(req.body.email == "bryan@test.com"){
                return res(ctx.status(201),
                    ctx.json(Login2))
            }
            return res(ctx.status(201),
            ctx.json(Login))
        }),

    rest.get(`${BASE_URL}/singleuser/id/:id`,
        (req, res, ctx) => {
            if (req.params.id == "test"){
                return res(ctx.status(200),
                    ctx.json(UserData))
            }
            else if (req.params.id == "test1"){
                return res(ctx.status(200),
                    ctx.json(ConversationDetail))
            }
            else if (req.params.id == "test2"){
                return res(ctx.status(200),
                    ctx.json(CreateProfile))
            }
            
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
        `${BASE_URL}/user/profile/head/:email`,
        (req, res, ctx) => {
            return res(ctx.status(200)
            )
        }),
    
    rest.put(
        `${BASE_URL}/user/profile/body/:email`,
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
        `${BASE_URL}/conversation/user/picture/:conversationId/:id`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Image)
            )
        }),
    
    rest.get(
        `${BASE_URL}/message/all/:conversationId`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(Messages)
            )
    }),

    rest.post(`${BASE_URL}/message/:conversationId`,
    (req, res, ctx) => {
        return res(ctx.status(201))
        // ctx.json(NewMessage)
    }),
    

]