import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Toast from "./Toast";
import { Submit } from "../api/taskApi";
export default function CreateTask() {
  const [errors,setErrors]=useState({message:'',status:''})
  const [errFlag,setErrFlag]=useState(false)
  const [valErrors, setValErrors] = useState([]);
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

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const method='POST'
    const customURL='task/createTask/'
    setErrFlag(false)
    try{
      await Submit(method,title,description,id,customURL)
      navigate(`/getUser/${id}`);
    }
    catch(error){
      if(error.status===400){
        setValErrors(error.message.errors)
         
      }else{
        console.log(error,'i am random error')
        setErrors({message:error.message,status:error.status})
      setErrFlag(true)

        console.log(error)
      }
    }
    
      
     
     
  }
 
  return (
    <>
       <Navbar/>
       {errFlag&& <Toast error={errors}/>} 
    <div className="container mt-5 py-5">
      <div className="row justify-content-center py-2 border">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
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
              
                {valErrors.map((error, index) => (
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
              {valErrors.map((error, index) => (
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
