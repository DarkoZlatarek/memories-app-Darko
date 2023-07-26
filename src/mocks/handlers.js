import { rest } from "msw"

const baseUrl = "https://djangorestframework-darko-070f41296928.herokuapp.com/"

export const handlers = [
    rest.get(`${baseUrl}dj-rest-auth/user/`, (req,res,ctx) =>{
        return res(ctx.json)
    })
]