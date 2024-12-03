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


function App() {
  
  return(
    <>
    <h2 className="flex justify-center items-center">Welcome</h2>
    <Routes>
      <Route path='/' element={ <Home />} /> 
      <Route path='/login' element={ <Login /> } />
      <Route path='/auth/github/callback' element={ <Dashboard />} />
      <Route path='/signup' element={ <Signup /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path="/auth/github/callback" element={<Dashboard />} />
      <Route path="/upload" element={<ChatInput /> } /> 
      <Route path="/github" element={<LoginPage /> } /> 
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