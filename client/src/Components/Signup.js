import React, { useState } from 'react'
import { singUp } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
 
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
 


  const handleOnChange = (e) => {
    switch (e.target.id) {

      case "name":
        setName(e.target.value)
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


    const handleSignUp= async(e)=>{
        e.preventDefault()
        const customURL='user/createUser'

        try{
           await singUp(name,email,password,customURL)
           navigate('/home')
             
         }catch(error){
             console.log(error.status,error.message,'I am in signUp component')
         }         
     
    }

  return (
    <>

    <div className='container mt-5 '>
        <div className='row justify-content-center '>
            <div className='col-5 border border-2 p-5'>
            <form onSubmit={handleSignUp}>

                <div className='mb-3'>
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input className="form-control" type="text"  onChange={handleOnChange} id='name'/>
                </div>

                <div className="mb-3">
                   <label htmlFor="email" className="form-label">Email address</label>
                   <input type="email" className="form-control"   onChange={handleOnChange} id="email"  />
            
                </div>
               <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                 <input type="password"   onChange={handleOnChange} className="form-control" id="password"/>
                </div>
                   
                 <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
               </div>
        </div>
    </div>



    </>
  )
}
