import prisma from "../config/prisma";

 interface MessageData {
     
     content? :  string
     fileUrl? : string
     fileType? : string
     senderId : string 
     groupId? : string
     recipientId? : string
     
 } 

 // create message 
  export  const createMessage = async (data : MessageData) =>{
    return await prisma.message.create({ data })
  }

 // read non group message 
 export const readAllMessage = async (senderId : string,recipientId :string ) =>{
    return await prisma.message.findMany({
        where : {
           senderId  ,
           recipientId 
          
        }
    })
 }

 // read group message 

 export const readGroupMessage = async (groupId : string) =>{
    return await prisma.message.findMany({
        where : {
            groupId :  groupId 
        }
    })
 }

 // delete message 