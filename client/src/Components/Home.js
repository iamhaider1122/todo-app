import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/user/getAllUsers", {
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
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
                    <tr key={index}>
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
    </div>
  );
}
