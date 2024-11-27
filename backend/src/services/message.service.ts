import prisma from "../config/prisma";

 interface MessageData {
     
     content :  String
     fileUrl : String
     fileType : String
     senderId : String 
     groupId? : String

 }

 // create message 
  export  const createMessage = async (data : MessageData) =>{
  //  return await prisma.message.create({data})
  }

 // read message 

 export const readAllMessage = async () =>{
    return await prisma.message.findMany()
 }

 // delete message 