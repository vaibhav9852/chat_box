import React, { ReactElement, useEffect, useState } from "react";
import { Routes,Route, Navigate } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css'; 
import Login from "./components/auth/Login"; 
import Signup from "./components/auth/Signup";
import CreateGroup from "./components/group/CreateGroup"; 
import Navbar from "./components/layout/Navbar";
import ChatBox from "./components/chat/ChatBox";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import List from "./components/chat/List";
import Profile from "./components/user/Profile";
import Message from "./components/chat/Message";
import EditProfile from "./components/user/EditProfile";
import { ProtectedRouteProps } from "./types";
import { useDispatch } from "react-redux";
import { Rootstate } from "./redux/store";
import { useSelector } from "react-redux";


function App() { 

const isAuthenticated   = useSelector((state : Rootstate) => state.auth.isAuthenticated)

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    return  isAuthenticated ? element : <Navigate to="/" />;
  };        
 
  return(
    <>
   <Navbar /> 
    <Routes>
    <Route path='/signup' element={ <Signup /> } /> 
    <Route path='/verify-email/:token' element={<VerifyEmail />} />
      <Route path='/' element={ <Login />} /> 
      <Route path='/login' element={ <Login /> } /> 
      <Route path="/forgot-password" element= { <ForgotPassword />} />   
      <Route path="/reset-password/:token" element= { <ResetPassword />} /> 
      <Route path="/chat"  element={ <ProtectedRoute element={<ChatBox />} />} />   
      <Route path="/profile/:id"  element={ <ProtectedRoute element={<Profile />} />} />   
      <Route path="/update-profile"  element={<ProtectedRoute element={ <EditProfile />} />} /> 
      <Route path="/create-group/:adminId" element={ <ProtectedRoute element={ <CreateGroup />} />} />  
    </Routes>
  
    <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </> 
  )
}

export default App;

