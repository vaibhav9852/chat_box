
import prisma from "../config/prisma";

interface GroupData{
    name : string
    adminId : string
    memberIds : string[]
}

export const createNewGroup = async ({name, adminId, memberIds} : GroupData) =>{

    return await prisma.group.create({data:{ 
        name,
        adminId,
      
        //  members : { connect : memberIds.map((id) => {{id}})}
    }})
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

/*
 // Create the group with the provided admin and members
    const newGroup = await prisma.group.create({
      data: {
        name,
        adminId,
        admin: { connect: { id: adminId } },  // Connect the admin user
        members: { connect: memberIds.map(id => ({ id })) },  // Connect the members by their user IDs
      },
    });

    res.status(201).json({ message: 'Group created successfully', group: newGroup });

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: memberIds.map(id => ({ id })),  // Connect the new members
        },
      },
    });
    
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
*/