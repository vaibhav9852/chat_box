import {Request , Response} from "express"
import prisma from "../config/prisma";
import { createNewGroup , getAllGroup , getGroupDeatils} from "../services/group.service"
import { array, string } from "zod";
import { verifyToken } from "../utils/auth.util";
import { verify } from "crypto";

export const createGroup = async (req : Request,res : Response) =>{
     let {name , adminId, members} = req.body
     const token : any  = req.headers.authorization?.split(' ')[1];  
     console.log('recived group data...',name,adminId,members)
    try{
        const user = verifyToken(token)
        adminId = user.id  
      //  members = JSON.parse(members) 
        let group = await  createNewGroup({name , adminId,members})
                 res.status(201).json({success:true,data:group})
    }catch(error){
        console.log('group create error',error) 
        res.status(500).json({success:false,message:'Internal server error while create group'})
    }
}

export const getGroups = async (req : Request,res : Response) =>{
  const token : any  = req.headers.authorization?.split(' ')[1];  
    try{
      const user = verifyToken(token)
      let  groups = await getAllGroup(user.id)
      console.log('groups...', groups) 
      res.status(200).json({success:true,data:groups}) 
    }catch(error){
        res.status(500).json({success:false,message:'Internal server error while get groups'})
    }
}

export const getGroup = async (req : Request,res : Response) =>{
     const {groupId} = req.params 
    try{
      let  groups = await getGroupDeatils(groupId)
      res.status(200).json({success:true,data:groups})
    }catch(error){
        res.status(500).json({success:false,message:'Internal server error while get groups'})
    }
}