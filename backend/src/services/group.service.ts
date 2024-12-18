
import prisma from "../config/prisma";

interface GroupData{
    name : string
    adminId : string
    members : string[]
}



export const createNewGroup = async ({ name, adminId, members }: GroupData) => {
  console.log('recived data...',{ name, adminId, members })
  return await prisma.group.create({
    data: {
      name,
      adminId,
      members: {
        connect: members.map((id) => ({ id })) 
      }
    }
  });
};


export const getAllGroup = async (userId : string) =>{
  return await prisma.group.findMany({
    where : {
      OR: [
        { adminId: userId }, 
        { members: { some: { id: userId } } }, 
      ],
    },
    include: {
      members: true, 
      messages: true, 
    },
    }
)} 


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

/*
import prisma from "../config/prisma"; // Prisma instance

export const getGroupsByUserId = async (userId: string) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        OR: [
          { adminId: userId }, // Fetch groups where the user is the admin
          { members: { some: { id: userId } } }, // Fetch groups where the user is a member
        ],
      },
      include: {
        members: true, // Include group members if needed
        messages: true, // Include messages if needed
      },
    });
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Could not fetch groups");
  }
};


*/