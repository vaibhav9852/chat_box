import { useEffect, useState } from "react";
import { Routes,Route } from "react-router-dom";

import Home from "./components/home";
import Dashboard from "./components/dashboard";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import FileUploadWithAudioMessage from "./components/Message";
import ChatInput from "./components/Message";
import Socket from "./components/Socket";
import CreateGroup from "./components/group/CreateGroup";
import SignUpPage from "./components/MyPage";
import Navbar from "./components/layout/Navbar";
import ChatBox from "./components/chat/ChatBox";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import List from "./components/chat/List";
import Profile from "./components/user/Profile";
import Message from "./components/chat/Message";
import EditProfile from "./components/user/EditProfile";


function App() {
  
  return(
    <>
   <Navbar />
    <Routes>
    <Route path='/signup' element={ <Signup /> } /> 
    <Route path='/verify-email/:token' element={<VerifyEmail />} />
      <Route path='/' element={ <Login />} /> 
      <Route path='/login' element={ <Login /> } />
      <Route path='/auth/github/callback' element={ <Dashboard />} />
      <Route path="/forgot-password" element= { <ForgotPassword />} />   
      <Route path="/reset-password/:token" element= { <ResetPassword />} />
      <Route path='/dashboard' element={<Dashboard /> } />
      {/* <Route path="/auth/github/callback" element={<Dashboard />} /> */}
      <Route path="/upload" element={<ChatInput /> } /> 
      <Route path="/socket" element={ <Socket /> } /> 
      <Route path="/signup-2" element={<SignUpPage />} />
      <Route path="/chat" element={<ChatBox />} /> 
      <Route path="/profile/:id" element={<Profile />} />   
      <Route path="/update-profile"  element={<EditProfile />} /> 
      <Route path="/create-group" element={ <CreateGroup adminId="bb2d73df-b5e0-4bfe-aeae-792464b0132f" /> } /> 
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