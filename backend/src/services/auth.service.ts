import prisma from '../config/prisma';
import { hashPassword } from '../utils/auth.util';

interface UserData {
  name: string
  email: string
  password: string
  avatar? : string
}

export const createUser = async ({name, email, password  ,avatar}: UserData) => {
  const hashedPassword  = await hashPassword(password);
  
  return await prisma.user.create({ data : { name , email, password : hashedPassword , avatar }}); 
};
 
 const findUserByEmail = async (email: string) => {
  return  await prisma.user.findUnique({ where: { email } });
};

export default { createUser, findUserByEmail }; 
 
