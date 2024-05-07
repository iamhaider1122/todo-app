import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { getMyTasks } from '../api/taskApi'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import Navbar from './Navbar'
export default function UserHome() {

   const navigate=useNavigate()
     

     const [tasks,setTasks]=useState([])
     const [cookies]=useCookies('token')
     const [user,setUser]=useState({role:'',id:''})

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


     const fetchTasks=async()=>{
            
      const   customURL='task/getMyTasks/'+user.id

         try{
             const data=await getMyTasks(customURL)
             setTasks(data)

         }catch(error){
             console.error(error);
         }
     }

     useEffect(()=>{
        
       verifyToken()
       if(user.role==='user'){
        fetchTasks()
       }
       
       
     },[user.role])




  return (
    <div>
        <Navbar/>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-10'>
                  <h3 className='text-center'>My tasks</h3>
                {tasks.length>0 &&  <table className="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Task Status</th>
                  <th scope="col">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {tasks.map((element, index) => {
                  return (
                    <tr key={`${index}`}>
                      <th scope="row">{index}</th>
                      <td>{element.title}</td>
                      <td>{element.description}</td>
                      <td>{element.status}</td>
                      <td> <Link to={`/updatetaskstatus/${element._id}`} className='btn btn-success'>Update Status</Link></td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
            }
            {tasks.length===0 && <div className='text-center'>No task is assigned to you.</div>}
                </div>
            </div>
        </div>
       
    </div>
  )
}
