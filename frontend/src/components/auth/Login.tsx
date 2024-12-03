import axios from "axios"
import React, { useState } from "react"
import { isValidEmail, isValidPassword } from "../../utils/validation"
import { toast } from "react-toastify"
import { URL } from "../../config/apiConfig"
const Login = () =>{
 
    const [user,setUser] = useState({email:'',password:''})
    const [loading,setLoading] = useState(false)
   
     const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) =>{
        setUser({...user,[event.target.name] : event.target.value})
      
     }

     const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const  validPassword =  isValidPassword(user.password) 
        const validEmail = isValidEmail(user.email)
        if(!user.email.trim() || !user.password.trim()){
            toast.error('Email and password should be required', {
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
        console.log('handle submit', user) 
        try{
            let response = await axios.post(`${URL}/auth/login`,user)
            console.log('login resp',response)
        }catch(error){
         console.log('login error', error)  
        }
      
        }
        setUser({email:'',password:''})
     }

     const handleGithubLogin = async (event: React.FormEvent<HTMLElement>) =>{
             event.preventDefault()
       console.log('url',URL) 
       try{
          let response = await   axios.get(`http://localhost:8000/auth/github`,{
            headers : {
            
            }
          })

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

        <form onSubmit={handleSubmit}>
            <label>email</label>
            <input type="email" name="email" value={user.email}  onChange={handleChange} />
            <label>password</label>
            <input type="password" name="password" value={user.password}  onChange={handleChange} />
            <button>Log In</button>
        </form>
         <button onClick={handleGithubLogin}>Log In with github</button>
        </>
    )
}

export default Login