
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
 

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    fetch("http://localhost:5500/api/task/getTask/"+id,{
        headers:{
            "Content-Type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik"
        }
    }).then(response=>response.json())
    .then(data=>{
         console.log(data.title)
        setTitle(data.title)
        setDescription(data.description)
    }).catch(error=>console.log(error))

  },[])


  const Submit = (e) => {
    console.log(title, description);
    e.preventDefault();
   
    fetch("http://localhost:5500/api/task/updateTask/" + id, {
      method: "PUT",
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate(`/getUser/${data.user}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center py-2 border">
        <div className="col-6">
          <form onSubmit={Submit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title}  onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary">Update Task</button>
          </form>
        </div>
      </div>
    </div>
  );
}