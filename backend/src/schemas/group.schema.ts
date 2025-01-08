import {string, z} from 'zod'

export const createGroup = z.object({
    name : z.string(),
    groupId : z.string().email(),
    senderId : z.string().min(8),
    members : z.string().array(),
    messages : z.object({}).array()
}) 

export const userSignin = z.object({
   email : z.string().email(),
   password : z.string().min(8)
}) 



