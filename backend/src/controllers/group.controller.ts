import {Request , Response} from "express"
import prisma from "../config/prisma";
import { createNewGroup , getAllGroup , getGroupDeatils} from "../services/group.service"

export const createGroup = async (req : Request,res : Response) =>{
     const {name , adminId, memberIds} = req.body
    try{
        let group = await  createNewGroup({name , adminId,members : memberIds})
                 res.status(201).json({success:true,data:group})
    }catch(error){
        res.status(500).json({success:false,message:'Internal server error while create group'})
    }
}

export const getGroups = async (req : Request,res : Response) =>{
    try{
      let  groups = await getAllGroup()
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