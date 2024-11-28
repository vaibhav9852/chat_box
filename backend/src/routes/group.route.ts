import { Router } from "express";
import prisma from "../config/prisma";
import {createGroup , getGroups, getGroup} from "../controllers/group.controller"

const router = Router()

router.post('/create',createGroup)

router.get('/',getGroups)

router.get('/:groupId',getGroup) 

export default router ;  