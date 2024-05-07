import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
    const [, , removeCookie] = useCookies(['token']);
 
    const navigate=useNavigate()
    const handleLogOut=()=>{
        removeCookie('token', { path: '/' });
    }

    useEffect(()=>{
            handleLogOut()
              navigate('/')
            
    },[])

  return (
    <>
     i am logout
    </>
  )
}
