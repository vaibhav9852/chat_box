import axios from "axios"
import { URL } from "../config/apiConfig"
import axiosInstance from "../config/api"

export const sendMessage = async (formData : FormData ) =>{
  let  response = await axiosInstance.post(`${URL}/message`,
    formData,    
    {
      headers: { 
        "Content-Type": "multipart/form-data" ,
      },

    }  
  );  
  return response.data  
}
  
export const fetchMessages = async (id:string) =>{ 
  if(id){
 let {data} =  await axios.get(`${URL}/message/${id}`) 
 return data
  }
}


