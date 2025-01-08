import prisma from "../config/prisma";
import {Request , Response} from 'express'
import { createMessage , readAllMessage , readGroupMessage} from '../services/message.service'
import { upload } from "../utils/cloudinary.util";
import { io } from "../app";
import {  verifyToken } from "../utils/auth.util";
 
export const addMessage = async (req : any,res : Response) =>{ 
     let {content,senderId,recipientId,groupId}  = req.body
     const token : any = req.headers.authorization?.split(' ')[1];  
     const data = req.files 
     console.log('data..',data)    
     console.log('--- content,senderId,recipientId,groupId ---',content,senderId,recipientId,groupId) 
   //  Promise.all(data.map(()))
   let fileUrl   
   if(data.file){ 
    fileUrl  = await  upload(data.file[0].path)
    console.log('fileUrl',fileUrl)   
   }   
     
   if(!recipientId && !groupId) 
    res.status(400).json({success:false,message:'RecipientId or groupId is required'});
  
     try{ 
      let user =  verifyToken(token)  
      senderId = user.id 
      let message = await createMessage({content,fileUrl,senderId,recipientId,groupId})  
      if (groupId) { 
        io.to(groupId).emit("newMessage", message); //  group messages
      } else {
        io.to(recipientId).emit("newMessage", message); //  direct messages
        console.log('send to recipientid', recipientId , message)    
      } 

       res.status(201).json({success:true,data:message})  
     }catch(error){
      console.log('error',error)  
        res.status(500).json({success:false,message:'Internal server error while add message'})
     } 
}


export const getMessage = async (req : Request,res : Response) =>{
  const token : any  = req.headers.authorization?.split(' ')[1];  
       const {recipientId} = req.params 
    try{
      const user =  verifyToken(token) 
      const senderId = user.id
      let messages = await readAllMessage(senderId,recipientId)
      res.status(200).json({success:true,data:messages}) 
    }catch(error){
      console.log('error',error)
        res.status(500).json({success:false,message:'Internal server error while read message'})
    }
}

export const getGroupMessage = async (req:Request,res :Response) =>{
    const {groupId} = req.params
  console.log('groupId...', groupId)  
    try{
    const groupMessages = await  readGroupMessage(groupId)
    console.log('groupmessage...',groupMessages)  
    res.status(200).json({success:true,data:groupMessages})
    }catch(error){
      console.log('error on group message',error)
        res.status(500).json({success:false,message:'Internal server error while read group message'})
    }
} 


