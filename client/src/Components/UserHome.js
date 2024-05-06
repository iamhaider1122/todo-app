import React, { useEffect } from 'react'

import { useState } from 'react'
import { getMyTasks } from '../api/taskApi'
import { Link } from 'react-router-dom'
export default function UserHome() {


    const userId=`66333d6a602fdf0f8d438ffe`

     const [tasks,setTasks]=useState([])


     useEffect(()=>{

        const fetchTasks=async()=>{
            
         const   customURL='task/getMyTasks/'+userId

            try{
                const data=await getMyTasks(customURL)
                setTasks(data)

            }catch(error){
                console.error(error);
            }
        }
        fetchTasks()
     },[])




  return (
    <div>
        
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
                </div>
            </div>
        </div>
       
    </div>
  )
}
