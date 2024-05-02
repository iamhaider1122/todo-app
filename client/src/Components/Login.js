import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
export default function Login() {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
   
    const Submit = (e) => {
        console.log(email, password);
        e.preventDefault();
        fetch('http://localhost:5500/api/user/loginUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ 
                email: email,
                password: password,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data.token))
        .catch(error => console.log(error));
    }
    
  return (
    <>
    <Navbar/>
    <div className='container mt-5 '>
        <div className='row justify-content-center '>
            <div className='col-5 border border-2 p-5'>
            <form  onSubmit={Submit}>
                <div className="mb-3">
                   <label htmlFor="emailField" className="form-label">Email address</label>
                   <input type="email" className="form-control"   onChange={(e) => setEmail(e.target.value)} id="emailField" aria-describedby="emailHelp"/>
            
                </div>
               <div className="mb-3">
                <label htmlFor="passwordField" className="form-label">Password</label>
                 <input type="password"   onChange={(e) => setPassword(e.target.value)} className="form-control" id="passwordField"/>
                </div>
                   
                 <button type="submit" className="btn btn-primary">Submit</button>
                </form>
               </div>
        </div>
    </div>

    </>
  )
}
