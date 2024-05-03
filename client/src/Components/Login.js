import React from 'react'
import { useState } from 'react'
import { logIn } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
export default function Login() {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

   const navigate=useNavigate()
    
  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
        
      default:
        break;
    }
  };

   
    const handleLogIn =async (e) => {
        console.log(email, password);
        e.preventDefault();
        const customURL='user/loginUser'
        try{
           await logIn(email,password,customURL)
           navigate('/')
        }catch(error){
            console.log(error.status,error.message,'I am in login component')
        }         
    }
    
  return (
    <>
    
    <div className='container mt-5 '>
        <div className='row justify-content-center '>
            <div className='col-5 border border-2 p-5'>
            <form  onSubmit={handleLogIn}>
                <div className="mb-3">
                   <label htmlFor="email" className="form-label">Email address</label>
                   <input type="email" className="form-control"   onChange={handleOnChange} id="email" aria-describedby="emailHelp"/>
            
                </div>
               <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                 <input type="password"   onChange={handleOnChange} className="form-control" id="password"/>
                </div>
                   
                 <button type="submit" className="btn btn-primary">Submit</button>
                </form>
               </div>
        </div>
    </div>

    </>
  )
}
