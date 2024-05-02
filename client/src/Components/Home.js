import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BASE_URL } from "../config";
import { getUsers } from "../api/userApi";
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {


    const fetchData=async ()=>{
      const customURL = "user/getAllUsers/";
      try {
        const data = await getUsers(customURL);
        setUsers(data)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData()

   


  }, []);

  return (
    <>
    <Navbar/>
      <h2 className="text-center mt-5">All Users</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <table className="table  table-striped">
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
          </div>
        </div>
      </div>
    </>
  );
}
