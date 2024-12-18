import { Router } from "express";
import { addMessage ,getMessage,getGroupMessage} from "../controllers/message.controller"
import { upload } from "../middleware/multerUpload.middleware";
import { authenticate } from "../middleware/auth.middleware";


const router = Router()

 router.post('/',  upload.fields([{name:'file',maxCount:1}]) , addMessage)

 router.get('/:recipientId', getMessage )  

 router.get('/group/:groupId' , getGroupMessage)    
 
export default router       