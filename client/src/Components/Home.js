import React, { useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home() {
  const [cookies]=useCookies('token')
  const [user, setUser] = useState({ role: "", id: "" });

  const navigate=useNavigate()


  const verifyToken=()=>{
    if(cookies.token){
      const decoded = jwtDecode(cookies.token);
      setUser({
          role:decoded.user.role,id:decoded.user.id
      })
  }
  else{
      navigate('/')
  }
   }
  


  useEffect(() => {
      
    verifyToken()

  }, []);

 

  return (
    <>
    <Navbar/>
       
       {user.role==='admin' && <div className="text-center h1 mt-5">Welcome To Admin Dashboard</div>}
       {user.role==='user' && <>

       <div className="text-center h1 text-secondary  mt-5 mb-5">Welcome To User Dashboard</div>
       <div className="d-flex justify-content-center mt-4"> <Link to={`/userhome`} className="btn btn-primary">View My Tasks</Link></div>
       </>
      
       }
    </>
  );
}
