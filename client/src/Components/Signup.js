import React, { useState,useEffect } from "react";
import { singUp } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast";




export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valErrors, setValErrors] = useState([]);
  const [errors,setErrors]=useState({message:'',status:''})

  const [errFlag,setErrFlag]=useState(false)
  const handleOnChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(valErrors, "i am validation errors");
  }, [valErrors]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const customURL = "user/createUser";
    setErrFlag(true)
    try {
      await singUp(name, email, password, customURL);
      navigate("/home");
    } catch (error) {
      console.log(error.status, error.message.errors, "I am in signUp component");
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

     {errFlag&& <Toast error={errors}/>}   
  
      <div className="container mt-5  ">
        <div className="row justify-content-center  ">
          <div className="col-5 border border-2 p-5 customCard">
            <h3 className="text-center text-secondary">Sign Up</h3>
            <form  onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleOnChange}
                  id="name"
                />
                {valErrors.length>0 && valErrors.map(
                  (error, index) =>
                    error.path === "name" && (
                      <div key={`${index}`} className="text-danger">
                        {error.msg}
                      </div>
                    )
                )}

              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleOnChange}
                  id="email"
                />
                {valErrors.length>0 && valErrors.map(
                  (error, index) =>
                    error.path === "email" && (
                      <div key={`${index}`} className="text-danger">
                        {error.msg}
                      </div>
                    )
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleOnChange}
                  className="form-control"
                  id="password"
                />
                {valErrors.length>0 && valErrors.map(
                  (error, index) =>
                    error.path === "password" && (
                      <div key={`${index}`} className="text-danger">
                        {error.msg}
                      </div>
                    )
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <p className="mt-5">Already Have an account <Link to={`/`} className=" ms-2 btn btn-primary">Login</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
