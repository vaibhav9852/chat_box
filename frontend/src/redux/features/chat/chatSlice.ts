import { createSlice } from "@reduxjs/toolkit";

const initialState = {recipientId:"",loginUser:""}
//  recipientId
const chatSlice = createSlice({
    name:"chatSlice",
    initialState : initialState,
    reducers : {
        handleRecipient(state,action){
           state.recipientId = action.payload
        }

    }
})

export const {  handleRecipient } = chatSlice.actions

export default chatSlice.reducer