import axios from "axios"
import { URL } from "../config/apiConfig"
import axiosInstance from "../config/api" 

let token = localStorage.getItem('token')

if(token){
token = JSON.parse(token) 
alert('token find') 
} 
console.log('token find....', token)


export const getUsers = async () =>{     
 return    await axiosInstance.get(`/users`, 
)  
    
} 
 
export const getUser = async (id : string) =>{ 
return await axiosInstance.get(`/users/${id}`)   
}
 

export const getGroups = async () =>{
return await axiosInstance.get(`/group`)
    
} 

export const createGroup = async (data:object) =>{
    return await axiosInstance.post(`/group/create`,data) 
}

export const exitGroup = async (groupId:string | undefined) =>{
    return await axiosInstance.patch(`${URL}/group/${groupId}/exit`,'x' ) 
}

export const deleteGroup = async (groupId:string | undefined) =>{
    return await axiosInstance.delete(`${URL}/group/${groupId}` ) 
}



export const fetchGroupMessage = async (id : string) =>{
 
    let response =  await axiosInstance.get(`${URL}/message/group/${id}` )  
    return response   
} 


