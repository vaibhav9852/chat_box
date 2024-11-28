import { Router } from "express";
import { addMessage ,getMessage,getGroupMessage} from "../controllers/message.controller"
const router = Router()

 router.post('/', addMessage)

 router.get('/:senderId/:recipientId',getMessage ) 

 router.get('/group/:groupId' , getGroupMessage)

export default router  