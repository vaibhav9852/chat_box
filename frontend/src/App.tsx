import { useEffect, useState } from "react";
import { Routes,Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import LoginPage from "./components/LoginPage";


function App() {
  
  return(
    <>
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path="/auth/github/callback" element={<Dashboard />} />
    </Routes> 
    </> 
  )
}

export default App;