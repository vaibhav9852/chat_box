import axios from "axios";
import { URL } from "../config/apiConfig";


export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${URL}/auth/login`, credentials);
  return response.data;
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${URL}/auth/register`, userData);
  return response.data;
};

export const logout = async () => {
  await axios.post(`${URL}/auth/logout`);
};
