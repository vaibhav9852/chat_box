import axios from "axios"
import { URL } from "../config/apiConfig"

let token =  localStorage.getItem('token')
console.log('set token',token) 
if(token){
  token = JSON.parse(token)
}
export const sendMessage = async (formData : FormData ) =>{
  let  response = await axios.post(`${URL}/message`,
    formData,   
    {
      headers: { 
        "Content-Type": "multipart/form-data" ,
        "Authorization":  `Bearer ${token}` 
      },

    }  
  );  
  return response.data  
}
  
export const fetchMessages = async (id:string) =>{
  if(id){
 let {data} =  await axios.get(`${URL}/message/${id}`,{
  headers :{
    "Authorization":  `Bearer ${token}` 
  }
 }) 
 return data
  }
}
     
//   message/:recipientId  

