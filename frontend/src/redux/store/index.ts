import { configureStore } from "@reduxjs/toolkit";
 import authReducer from '../features/authentication/authSlice'
// import expenseReducer from '../features/expense/expenseSlice'
// import darkModeReducer from '../features/darkmode/darkModeSlice'
const store = configureStore({
    reducer:{
         auth: authReducer,
        // expense: expenseReducer,
        // darkMode: darkModeReducer
    }
})

export type Rootstate = ReturnType< typeof store.getState >

export type  AppDispatch = typeof store.dispatch

export default store;   