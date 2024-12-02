import axios from "axios"
import { URL } from "../config/apiConfig"

export const sendMessage = async (message :string) =>{
  let response = await axios.post(`${URL}/message`,message)
  return response.data
}