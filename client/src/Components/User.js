
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { deleteUserTask,userTasks } from "../api/taskApi";
import { getUserInfo } from "../api/userApi";
export default function User() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState([]);


  useEffect(() => {

    const fetchData=async ()=>{
      const customURL = "user/getUser/";
      try {
        const data = await getUserInfo(customURL, id);
        setName(data.name);
             setEmail(data.email);
            
             setRole(data.role);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData()
  
  }, []);



  const getUserTasks =async () => {
    const customURL='task/getUserTasks'

    try{
   const data=await userTasks(customURL,id)
   setTasks(data)
    }catch(error){
      console.log(error)
    }
    
  };

  const deleteTask= async (id) => {
   console.log('i am in delete task')
    const customURL='task/deleteTask'
   const method='DELETE'

    try{
      await deleteUserTask(method,customURL,id)
      getUserTasks();
    }catch(error){
      console.log('I am error occured in deleting a task',error)
    }
  }
 

  return (
    <>
    <Navbar/>
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title text-center">User Info</h5>

            <p className="card-text">
              <span className="h6">Name:</span> {name}
            </p>
            <p className="card-text">
              <span className="h6">Email:</span>
              {email}
            </p>
            <p className="card-text">
              <span className="h6">Role:</span>
              {role}
            </p>

            <Link
              to={`/getUser/${id}`}
              className="btn btn-primary mx-2"
              onClick={getUserTasks}
            >
              View
            </Link>

            <Link to={`/createTask/${id}`} className="btn btn-primary">
              Assign new task
            </Link>
          </div>
        </div>
      </div>

      {tasks && tasks.length>0 && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">Task status</th>
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
                        
                        <td> <Link to={`/updateTask/${element._id}`} className='btn btn-success mx-1'>Update</Link>
                        <button className="btn btn-danger" onClick={()=>deleteTask(element._id)}>Delete</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
