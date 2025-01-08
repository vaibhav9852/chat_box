import { createSlice } from "@reduxjs/toolkit";

const initialState = {userAndGroupList:[],deleteGroupId:'',exitGroupId:''}

const chatSlice = createSlice({
    name:"chatSlice", 
    initialState : initialState,
    reducers : {
        handleUserAndGroupList(state,action){
           state.userAndGroupList = action.payload
        } ,
        setDeleteGroupId(state,action){
            state.deleteGroupId = action.payload
        },
        setExitGroupId(state,action){
            state.exitGroupId = action.payload 
        }
    }
}) 
 
export const { handleUserAndGroupList , setDeleteGroupId ,setExitGroupId } = chatSlice.actions
export default chatSlice.reducer   