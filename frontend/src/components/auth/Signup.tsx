import axios from "axios"
import React, { useState } from "react"

import { isValidEmail, isValidPassword } from "../../utils/validation"
import { toast } from "react-toastify" 
import { URL } from "../../config/apiConfig" 
import { Link, useNavigate } from "react-router-dom"
const Signup = () =>{
  
    const [user,setUser] = useState({name:'',email:'',password:''})
    const [profileImage, setProfileImage] = useState<File | null>(null); 
    const [loading,setLoading] = useState(false) 
    
    const navigate = useNavigate()
     const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) =>{
        setUser({...user,[event.target.name] : event.target.value})
      
     }

       const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

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
          const formData = new FormData();
                formData.append("name", user.name);
                formData.append("email", user.email);
                formData.append("password", user.password);
          
                if (profileImage) {
                  formData.append("avatar", profileImage);   
                }
          
          
            let {data} = await axios.post(`${URL}/auth/signup`,formData,{
              headers: { "Content-Type": "multipart/form-data" }
            }) 
          
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
        setProfileImage(null)
     }

   

    return(
        <>

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
          <div className="mb-6">
             <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
               Profile Image
            </label>
            <input
              type="file"
               name="profileImage"
               id="profileImage"
               onChange={handleImageChange}
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
        <div className="text-center mt-6">
  <p className="text-sm text-gray-600">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-600 hover:underline">
      Log In
    </Link>
  </p>
</div>

      </div>
    </div>
        </>
    )
}

export default Signup

