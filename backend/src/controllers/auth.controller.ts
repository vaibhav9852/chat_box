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
  const user = await authService.createUser({ name, email, password  ,avatar }); 
  const token = generateToken({ id: user.id });
  res.status(201).json({success:true,data:{id:user.id,name:user.name,email:user.email,avatar:user.avatar},token });
  }catch(error){
    console.log('signup error',error)
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
  res.json({ success:true, data:{id:user.id,name:user.name,email:user.email,avatar:user.avatar}, token });
}catch(err){
  res.status(500).json({success:false, message:'Internal server error while login' });
}
};


export const githubLogin = async (req : Request,res : Response) =>{
    
    const user = req.user as any;
    const token = generateToken({id : user.id})
   // {id:user.id,name:user.name,email:user.email,avatar:user.avatar,token}
//  res.status(200).json({
//       message: 'Authenticated successfully',
//       token: token,
//       data:{id:user.id,name:user.name,email:user.email,avatar:user.avatar}
//     });
const userData = encodeURIComponent(JSON.stringify({id:user.id,name:user.name,email:user.email,avatar:user.avatar,token}));
  res.redirect(`http://localhost:3000/dashboard?user=${userData}`);
}





/*
exports.forgotPassword = async (req,res) =>{
    let {email} = req.body 
    const FRONTEND_URL = process.env.BASE_URL 
   
     try{
        let user = await User.findOne({email})
          if(!user){
            return res.status(404).json({success:false,message:'User not found'})
          }
        const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

 const origin = req.headers.origin || FRONTEND_URL;
const resetUrl = `${origin}/reset-password/${resetToken}`;
 

  const message = `To reset your password, please click the link: ${resetUrl}`;
           try{
           await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message,
          });
          res.status(200).json({success:true, message: 'Email sent' });
        }catch(error){
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined; 
          await user.save();
            res.status(500).json({success:false,message:'Internal server error while forgot password ',error})
        }

     }catch(error){
     
        res.status(500).json({success:false,message:'Internal server error while forgot password ',error})
     }
}

exports.resetPassword = async (req,res) =>{
    try{
        let {token} = req.params
        let {password} = req.body
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
        });
        
        if (!user) return res.status(400).json({success:false, message: 'Invalid or expired token' });
        let {SALT_ROUND} = process.env
        SALT_ROUND = +SALT_ROUND
         const hashPassword = await bcrypt.hash(password, SALT_ROUND );
        user.password = hashPassword
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined; 
        await user.save();
      
        res.status(200).json({ success:true,message: 'Password reset successfully' });
        

    }catch(error){
       res.status(500).json({success:false,message:'Internal server error while forgot password '})
    }
}
*/

