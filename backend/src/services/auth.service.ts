import prisma from '../config/prisma';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const createUser = async (data: UserData) => {
  return await prisma.user.create({ data }); 
};
 
const findUserByEmail = async (email: string) => {
  return  await prisma.user.findUnique({ where: { email } });
};

export default { createUser, findUserByEmail }; 
 
