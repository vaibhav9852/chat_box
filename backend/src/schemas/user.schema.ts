import {string, z} from 'zod'

export const userSignup = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
    avatar : z.string()
})

export const userSignin = z.object({
   email : z.string().email(),
   password : z.string().min(8)
})

