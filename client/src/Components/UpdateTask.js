import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Submit, getTaskToUpdate } from "../api/taskApi";
import Toast from "./Toast";
export default function UpdateTask() {
  const navigate = useNavigate();
  const [errors,setErrors]=useState({message:'',status:''})
  const [errFlag,setErrFlag]=useState(false)
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [valErrors,setValErrors]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const customURL = "task/getTask/";
      try {
        const data = await getTaskToUpdate(customURL, id);
        setTitle(data.title);
        setDescription(data.description);
        setUser(data.user);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;

      case "description":
        setDescription(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = "PUT";
    const customURL = "task/updateTask/";
    setErrFlag(false)
    try {
      await Submit(method, title, description, id, customURL);
      navigate(`/getUser/${user}`);
    } catch (error) {
      if (error.status === 400) {
         
        setValErrors(error.message.errors);
       
      }
      else{
        setErrors({message:error.message,status:error.status})
      setErrFlag(true)
      }
    }
  };

  return (
    <>
      <Navbar />
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
                  value={title}
                  onChange={handleOnChange}
                />

                {valErrors.map(
                  (error, index) =>
                    error.path === "title" && (
                      <div key={`${index}`} className="text-danger">
                        {error.msg}
                      </div>
                    )
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={handleOnChange}
                />
                {valErrors.map(
                  (error, index) =>
                    error.path === "description" && (
                      <div key={`${index}`} className="text-danger">
                        {error.msg}
                      </div>
                    )
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
