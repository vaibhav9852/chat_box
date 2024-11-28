import { Request, Response } from 'express';
import authService from '../services/auth.service';
import {comparePassword,generateToken,hashPassword} from '../utils/auth.util'

export const signup = async (req: Request, res: Response) => {
  const { name, email, password , avatar} = req.body;

  try{
    let findUser = await authService.findUserByEmail(email)
    if(findUser){
     res.status(401).json({ error: 'User already exist' });
    }
  const hashedPassword = await hashPassword(password);
    console.log('after hasPass',name,email,password)
  const user = await authService.createUser({ name, email, password,avatar }); 

  const token = generateToken({ id: user.id });

  res.status(201).json({success:true,data:user,token });
  }catch(error){
    res.status(500).json({success:false, message:'Internal server error while signup' });
  }
};



export const login = async (req: Request, res: Response):Promise<String|any> => {
  const { email, password } = req.body;
 try{
  const user = await authService.findUserByEmail(email); 
  if (!user || !(await comparePassword(password, user.password))) {
   return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken({ id: user.id });
  res.json({ success:true, user, token });
}catch(err){
  res.status(500).json({success:false, message:'Internal server error while login' });
}
};
