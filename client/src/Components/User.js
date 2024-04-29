import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";

export default function User() {
   
  const { id } = useParams();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')
  useEffect(() => {
    fetch("http://localhost:5500/api/user/getUser/" + id, {
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setName(data.name)
        setEmail(data.email)
        setRole(data.role)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title text-center">User Info</h5>
             
            <p className="card-text">
             <span className="h6">Name:</span>  {name}
            </p>
            <p className="card-text">
            <span className="h6">Email:</span>{email}
            </p>
            <p className="card-text">
            <span className="h6">Role:</span>{role}
            </p>
            <a href="#" className="card-link">
              Assign Task
            </a>
            <Link to={`/createTask/${id}`} className='btn btn-primary'>Assign new task</Link>
          </div>
        </div>
      </div>
    </>
  );
}
