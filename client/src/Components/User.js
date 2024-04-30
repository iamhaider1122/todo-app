
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";

export default function User() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState([]);
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
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUserTasks = () => {
    fetch("http://localhost:5500/api/task/getUserTasks/" + id, {
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
        setTasks(data);
        console.log(tasks);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
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

      {tasks.length!==0 && (
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
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{element.title}</td>
                        <td>{element.description}</td>
                        <td>{element.status}</td>
                        
                        <td> <Link to={`/updateTask/${element._id}`} className='btn btn-success'>Update</Link></td>
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
