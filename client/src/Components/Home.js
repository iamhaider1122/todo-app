import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { getUsers } from "../api/userApi";
import Toast from "./Toast";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [errors,setErrors]=useState({flag:false,message:'',status:''})
  useEffect(() => {


    const fetchData=async ()=>{
      const customURL = "user/getAllUsers/";
      try {
        const data = await getUsers(customURL);
        
        setUsers(data)
      } catch (error) {
        console.log(error.status,error.message,"i am error object");
         setErrors({flag:true,message:error.message,status:error.status})
      }
    };
  
    fetchData()

  }, []);

 

  return (
    <>
   {errors.flag && <Toast error={errors}/>}
    <Navbar/>
      <h2 className="text-center mt-5">All Users</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
          {users.length>0 &&  <table className="table  table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((element, index) => {
                  return (
                    <tr key={`${index}`}>
                      <th scope="row">{index}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.role}</td>
                      <td> <Link to={`/getUser/${element._id}`} className='btn btn-success'>View</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
}
          </div>
        </div>
      </div>
    </>
  );
}
