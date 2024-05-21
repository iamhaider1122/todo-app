import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { getUsers } from "../api/userApi";
import { Link } from "react-router-dom";
export default function ViewUsers() {
  const navigate = useNavigate();
  const [cookies] = useCookies("token");
  const [user, setUser] = useState({ role: "", id: "" });
  const [usersInfo, setusersInfo] = useState([]);


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

  const fetchData = async () => {
    const customURL = "user/getAllUsers/";
    try {
      const data = await getUsers(customURL);
      
      setusersInfo(data);
    } catch (error) {
      console.log(error.status, error.message, "i am error object");
    }
  };
  

  useEffect(() => {
    verifyToken()
    if (user.role === "admin" || user.role === "user") {
   
      console.log("i am in user role or user admin");
      fetchData();
    }
  }, [user.role]);


  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-5">All Users</h2>
      {usersInfo.length > 0 && (
        <div className="container mt-5">
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
                  {usersInfo.map((element, index) => {
                    return (
                      <tr key={`${index}`}>
                        <th scope="row">{index}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                        <td>
                          {" "}
                          <Link
                            to={`/getUser/${element._id}`}
                            className="btn btn-success"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {usersInfo.length === 0 && (
        <div className="text-center">Nothing to Show</div>
      )}
    </div>
  );
}
