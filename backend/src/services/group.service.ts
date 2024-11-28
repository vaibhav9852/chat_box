import prisma from "../config/prisma";

interface GroupData{
    name : string
    adminId : string
    member : string[]
}

export const createNewGroup = async (data : GroupData) =>{

    return await prisma.group.create({data})
}

export const getAllGroup = async () =>{
  return await prisma.group.findMany()
}


export const getGroupDeatils = async (groupId : string) =>{
    return await prisma.group.findFirst({
        where :{
            id :  groupId
        },
        include : {
            members : true
        }
    })
}
