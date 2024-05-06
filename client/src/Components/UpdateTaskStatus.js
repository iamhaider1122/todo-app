import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskToUpdate, submitStatus } from "../api/taskApi";
import { useNavigate } from "react-router-dom";


export default function UpdateTaskStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate=useNavigate()
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };
  useEffect(() => {
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

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = "PUT";
    const customURL = "task/updateTaskStatus/";

    try {
      await submitStatus(method, id, customURL,status);
      
        navigate(`/userhome`);
    } catch (error) {

       console.log(error);
      } 
    

  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
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
  );
}
