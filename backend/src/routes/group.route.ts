import { Router } from "express";
import {createGroup , getGroups, getGroup} from "../controllers/group.controller"
import { authenticate } from "../middleware/auth.middleware";

const router = Router()

router.post('/create',createGroup) 

router.get('/', authenticate ,getGroups)

router.get('/:groupId',getGroup) 

// model casacade delete

export default router ;   