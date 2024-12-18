import axios from "axios";
import { URL } from "../config/apiConfig";

let token = localStorage.getItem('token')
if(token)
  token = JSON.parse(token)

export const loginUser   = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${URL}/auth/login`, credentials);
  return response.data;
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${URL}/auth/register`, userData);
  return response.data;
};

export const verifyEmail = async (token : string) =>{
   const response = await axios.post(`${URL}/auth/verify-email/${token}`)
   
   return response.data
}

export const logout = async () => {
  await axios.post(`${URL}/auth/logout`);
};


export const forgotPassword = async (data:object) =>{
 const response =  await axios.post(`${URL}/auth/forgot-password`,data)   
 return response.data 
} 

export const resetPassword = async (token:string,data:object) => {
  const response = await axios.post(`${URL}/auth/reset-password/${token}`,data)
  console.log('response resetPassword', response) 
  return response.data  
}

export const githubLogin = async () =>{
  const response = await axios.get(`${URL}/auth/github`)
  return response.data   
}  
 
export const getUsers = async () =>{ 
  return    await axios.get(`${URL}/users`,
    {
      headers: { 
        "Authorization":  `Bearer ${token}` 
      },
  }
  )  
 }
 
 export const getUser = async (id : string | undefined) =>{
 return await axios.get(`${URL}/users/${id}`,
  {
    headers: { 
      "Authorization":  `Bearer ${token}` 
    },
}
 )   
 } 

export const editUser =  async (id:string) =>{
  const response = await axios.patch(`${URL}/users/${id}`,
    {
      headers: { 
        "Authorization":  `Bearer ${token}` 
      },
  }
  )
  return response.data 
}




