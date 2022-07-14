import {rest} from 'msw'
import UserData from './UserData.json'

const BASE_URL = "http://localhost:5000/api"
// Mock Data
export const posts = [
    {
        userId: 1,
        id: 1,
        title: 'first post title',
        body: 'first post body',
    },
    {
        userId: 2,
        id: 5,
        title: 'second post title',
        body: 'second post body',
    },
    {
        userId: 3,
        id: 6,
        title: 'third post title',
        body: 'third post body',
    },
]
let myUserId = "1";
let swipedId = "2";

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
    rest.get(`${BASE_URL}/filtereduser/id/:${myUserId}`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(UserData))
        }),

    rest.put(`${BASE_URL}/user/profile/swipedLeft/id/${myUserId}/${swipedId}`,
        (req, res, ctx) => {
            return res(ctx.status(200),
                ctx.json(UserData))
        }),

    /*    jsonPlaceHolder.query('posts', (req, res, ctx) => {
            return res(
                ctx.data({
                    posts,
                }),
            )
        }),*/

]