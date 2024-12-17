import axios from "axios"
import { URL } from "../config/apiConfig"

let token = localStorage.getItem('token')
if(token)
token = JSON.parse(token)

export const getUsers = async () =>{ 
 return    await axios.get(`${URL}/users`,
    {
        headers: { 
          "Authorization":  `Bearer ${token}` 
        },
    }
)  
}
 
export const getUser = async (id : string) =>{
return await axios.get(`${URL}/users/${id}`,
    {
        headers: { 
          "Authorization":  `Bearer ${token}` 
        },
    }
)   
}
 
export const getGroups = async () =>{
return await axios.get(`${URL}/group`,
    {
        headers: { 
          "Authorization":  `Bearer ${token}` 
        },
    }
)
}

export const createGroup = async (data:object) =>{
    return await axios.post(`${URL}/group/create`,data,
        {
            headers: { 
              "Authorization":  `Bearer ${token}` 
            },
        }
    ) 
}

export const deleteGroup = async (groupId:string) =>{
    return await axios.post(`${URL}/group/${groupId}`,
        {
            headers: { 
              "Authorization":  `Bearer ${token}` 
            },
        }
    ) 
}

export const fetchGroupMessage = async (id : string) =>{
    console.log('fetchGroupMessage..',id)
    let response =  await axios.get(`${URL}/message/group/${id}`,
        {
            headers: { 
              "Authorization":  `Bearer ${token}` 
            },
        }
    )  
    console.log('group msg...',response)  
    return response   
} 


