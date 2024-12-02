import prisma from "../config/prisma";
import {Request , Response} from 'express'
import { createMessage , readAllMessage , readGroupMessage} from '../services/message.service'
import { upload } from "../utils/cloudinary.util";


export const addMessage = async (req : any,res : Response) =>{
     const {content,senderId,recipientId,groupId}  = req.body
     const data = req.files 
     console.log('data..',data) 
     console.log('data..',data.file) 
     console.log('content..',content) 
   //  Promise.all(data.map(()))
   if(data.file){
    let fileUrl  = await  upload(data.file[0].path)
    console.log('fileUrl',fileUrl)  
   } 
  
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

/*
export const getMessages = async (req: Request, res: Response) => {
  const { recipientId, groupId } = req.query;

  try {
    if (!recipientId && !groupId) {
      throw new Error('Either recipientId or groupId must be provided.');
    }

    const messages = await fetchMessages(req.user.id, recipientId as string, groupId as string);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

*/