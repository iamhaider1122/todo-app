import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskToUpdate, submitStatus } from "../api/taskApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";
import Toast from "./Toast";

export default function UpdateTaskStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors,setErrors]=useState({message:'',status:''})
  const [errFlag,setErrFlag]=useState(false)
  const navigate=useNavigate()

  const [user, setUser] = useState({ role: "", id: "" });
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };




   const[cookies]=useCookies('token')
  
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
    const customURL = "task/getTask/";
    try {
      const data = await getTaskToUpdate(customURL, id);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken()


    if(user.role==='admin' || user.role==='user'){
      fetchData()
    }
  }, [user.role]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = "PUT";
    const customURL = "task/updateTaskStatus/";
     setErrFlag(true)
    try {
      await submitStatus(method, id, customURL,status);
      
        navigate(`/userhome`);
    } catch (error) {

      setErrors({message:error.message,status:error.status})
      setErrFlag(true)
      } 
    

  };

  return (
    <>
    <Navbar/>
    {errFlag&& <Toast error={errors}/>}
    <div className="mx-auto card customCard mt-5" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className="card-title"><span className="h5">Title: </span> {title}</p>
        <p className="card-text"><span className="h5">Description: </span> {description}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="pending"
              onChange={handleOnChange}
              id="flexRadioDefault1"
              checked={status === "pending"}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Pending
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="inProgress"
              onChange={handleOnChange}
              id="flexRadioDefault2"
              checked={status === "inProgress"}
            />
            <label
              className="form-check-label"
              htmlFor="flexRadioDefault2"
              onChange={handleOnChange}
            >
              In Progress
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="fulfilled"
              onChange={handleOnChange}
              id="flexRadioDefault3"
              checked={status === "fulfilled"}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              FulFilled
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Update status
          </button>
        </form>

       
      </div>
    </div>
    </>
  );
}
