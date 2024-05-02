import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CreateTask() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 
  const handleOnChange=(e)=>{

      switch(e.target.id){
        case 'title':
          setTitle(e.target.value)
          break
        case 'description':
          setDescription(e.target.value)
          break
      }

  }
  const Submit = (e) => {
    console.log(title, description);
    e.preventDefault();
  
    fetch("http://localhost:5500/api/task/createTask/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          navigate(`/getUser/${id}`);
          return
        }
       const data=await res.json()
       throw { status: res.status, errors: data.errors }; 
   })
      .catch((error) => {
         
        if (error.status === 400) {
          console.log("Validation Errors:", setErrors(error.errors));
 
        }
        else{
          console.log("Error",error.message)
        }
      });
  };

  return (
    <>
       <Navbar/>
    <div className="container mt-5 py-5">
      <div className="row justify-content-center py-2 border">
        <div className="col-6">
          <form onSubmit={Submit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={handleOnChange}
              />
              
                {errors.map((error, index) => (
                 error.path==="title" && <div key={`${index}`} className="text-danger">
                    { error.msg}
                  </div>
                ))}
              
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={handleOnChange}
              />
              {errors.map((error, index) => (
                 error.path==="description" && <div key={`${index}`} className="text-danger">
                    { error.msg}
                  </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary">
              Assign Task
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
