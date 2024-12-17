import axios from "axios"
import React, { useState } from "react"

import { isValidEmail, isValidPassword } from "../../utils/validation"
import { toast } from "react-toastify"
import { URL } from "../../config/apiConfig" 
import { useNavigate } from "react-router-dom"
const Signup = () =>{
  
    const [user,setUser] = useState({name:'',email:'',password:''})
    const [loading,setLoading] = useState(false) 
    
    const navigate = useNavigate()
     const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) =>{
        setUser({...user,[event.target.name] : event.target.value})
      
     }

     const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const  validPassword =  isValidPassword(user.password) 
        const validEmail = isValidEmail(user.email)
        if(!user.email.trim() || !user.password.trim() || !user.name.trim()){
            toast.error('All fields should be required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }else if(!validEmail){
            toast.error('Invalid email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
        else if(!validPassword){
            toast.error('Invalid password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }else{ 
      
        try{
            let {data} = await axios.post(`${URL}/auth/signup`,user)
         
            if(data.success){
              toast.success(data.message,{
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar : false
              })
             
            }
        }catch(error){
            toast.error('Error while signup',{
              position : 'top-right',
              autoClose : 5000,
              hideProgressBar : false
            })
        }
      
        }
        setUser({name: '',email:'',password:''})
     }

     const handleGithubLogin = async (event: React.FormEvent<HTMLElement>) =>{
             event.preventDefault()
       console.log('url',URL) 
       try{
          let response = await   axios.get(`http://localhost:8000/auth/github`) 

          console.log('response github login',response)
       }catch(error){
        console.log('catch error', error)
        toast.error('Oops login failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
       }
     }

    return(
        <>

        {/* <form onSubmit={handleSubmit}>
        <label>name</label>
        <input type="text" name="name" value={user.name}  onChange={handleChange} />
            <label>email</label>
            <input type="email" name="email" value={user.email}  onChange={handleChange} />
            <label>password</label>
            <input type="password" name="password" value={user.password}  onChange={handleChange} />
            <button>Log In</button>
        </form>
         <button onClick={handleGithubLogin}>Log In with github</button> */}
         <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-between mt-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>
        <button
          onClick={handleGithubLogin}
          className="w-full mt-6 py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Log In with GitHub
        </button>
      </div>
    </div>
        </>
    )
}

export default Signup