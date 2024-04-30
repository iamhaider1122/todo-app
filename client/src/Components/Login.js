import React from 'react'
import { useState } from 'react'
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
    <div className='container mt-5 '>
        <div className='row justify-content-center '>
            <div className='col-5 border border-2 p-5'>
            <form className='' onSubmit={Submit}>
                <div className="mb-3">
                   <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                   <input type="email" className="form-control"   onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            
                </div>
               <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                 <input type="password"   onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                </div>
                   
                 <button type="submit" className="btn btn-primary">Submit</button>
                </form>
               </div>
        </div>
    </div>

    </>
  )
}
