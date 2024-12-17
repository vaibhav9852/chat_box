import {Request , Response} from "express"
import { findMany, updateOne } from "../services/user.service"
import { findOne } from "../services/auth.service"
import { verifyToken } from "../utils/auth.util";


export const getUsers = async (req : Request,res : Response) =>{
   const token : any  = req.headers.authorization?.split(' ')[1]; 
   console.log('get user token',token)
    try{
      const user = verifyToken(token)
       let users = await  findMany(user.id) 
       res.status(200).json({success:true,data:users})
    }catch(error){
     res.status(500).json({success:false,message:'Internal server error while get users'})
    }
 }

 export const getUser = async (req: Request , res:Response) =>{
   try{
      let {id} = req.params 
       let user = await findOne({id}) 
       res.status(200).json({success:true,data:user}) 
   }catch(error){
      res.status(500).json({success:false,message:'Internal server error while get user'})
   }
 }

 export const updateUser = async (req:Request,res:Response) =>{
   let {name,email,passsword,avatar} = req.body 
   let {id} = req.params
   try{
      let res = await updateOne(id, {name,email,passsword,avatar}) 
   }catch(error){
      res.status(500).json({success:false,message:'Internal server error while update user'})
   }
 }

 