import io from "socket.io-client";
import { URL } from "./apiConfig";
const socket = io(`${URL}`); 
export default socket;
