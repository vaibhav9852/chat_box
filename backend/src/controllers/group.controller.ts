import {Request , Response} from "express"
import prisma from "../config/prisma";
import { createNewGroup , getAllGroup , getGroupDeatils , exitFromGroup , deleteGroupService} from "../services/group.service"
import { array, string } from "zod";
import { verifyToken } from "../utils/auth.util";
import { verify } from "crypto";

export const createGroup = async (req : Request,res : Response) =>{
     let {name , adminId, members} = req.body
     const token : any  = req.headers.authorization?.split(' ')[1];   
  
    try{
        const user = verifyToken(token)
        adminId = user.id  
      //  members = JSON.parse(members) 
        let group = await  createNewGroup({name , adminId,members})
                 res.status(201).json({success:true,data:group})
    }catch(error){
      
        res.status(500).json({success:false,message:'Internal server error while create group'})
    }
}

export const getGroups = async (req : Request,res : Response) =>{
  const token : any  = req.headers.authorization?.split(' ')[1];  
    try{
      const user = verifyToken(token) 
      let  groups = await getAllGroup(user.id) 
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
  
export const exitGroup = async (req:Request , res:Response) =>{
  const token : any  = req.headers.authorization?.split(' ')[1];  
  const {groupId} = req.params  
  try{
    const user = verifyToken(token) 
    let response = await exitFromGroup(user.id , groupId)
    res.status(200).json({success:true,data:response})
  }catch(erroe){
    res.status(500).json({success:false,message:'Internal server error while exit group'}) 
  }   
 
} 

export const deleteGroup = async (req:Request , res : Response) => {
  const token : any = req.headers.authorization?.split(' ')[1]
  const {groupId} = req.params
  try{
    const user = verifyToken(token) 
    const response = await deleteGroupService(user.id,groupId)
    res.status(200).json({sccess:true,data:response})
  }catch(error){ 
    console.log('error...',error) 
    res.status(500).json({success:false,message:'Internal server error while delete group'})
  }
}

