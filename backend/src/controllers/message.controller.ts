import prisma from "../config/prisma";
import {Request , Response} from 'express'
import { createMessage , readAllMessage , readGroupMessage} from '../services/message.service'
import { group } from "console";

export const addMessage = async (req : Request,res : Response) =>{
     const {content,senderId,recipientId,groupId}  = req.body
     
     try{
      let message = await createMessage({content,senderId,recipientId,groupId})
       res.status(201).json({success:true,data:message})
     }catch(error){
        res.status(500).json({success:false,message:'Internal server error while add message'})
     } 
}


export const getMessage = async (req : Request,res : Response) =>{
       const {senderId,recipientId} = req.params

       console.log('senderId,recipientId', senderId,recipientId)
       return 
    try{
      let messages = await readAllMessage(senderId,recipientId)
    }catch(error){
        res.status(500).json({success:false,message:'Internal server error while read message'})
    }
}

export const getGroupMessage = async (req:Request,res :Response) =>{
 
    const {groupId} = req.params

    try{
    const groupMessages = await  readGroupMessage(groupId)
    res.status(200).json({success:true,data:groupMessages})
    }catch(error){
        res.status(500).json({success:false,message:'Internal server error while read group message'})
    }
}