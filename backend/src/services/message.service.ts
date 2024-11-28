import prisma from "../config/prisma";

 interface MessageData {
     
     content? :  String
     fileUrl? : String
     fileType? : String
     senderId : String 
     groupId? : String
     recipientId? : String
     
 } 

 // create message 
  export  const createMessage = async (data : MessageData) =>{
    return await prisma.message.create({ data })
  }

 // read non group message 
 export const readAllMessage = async (senderId : string,recipientId :string ) =>{
    return await prisma.message.findMany({
        where : {
           senderId : senderId,
           recipientId : recipientId
          
        }
    })
 }

 // read group message 

 export const readGroupMessage = async (groupid : string) =>{
    return await prisma.message.findMany({
        where : {
            groupId :  groupid 
        }
    })
 }

 // delete message 