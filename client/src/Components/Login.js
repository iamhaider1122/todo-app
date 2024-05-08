import React, { useEffect } from "react";
import { useState } from "react";
import { logIn } from "../api/userApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Toast from "./Toast";
export default function Login() {
  const [cookie, setCookies] = useCookies(["token"]);
  const [errors, setErrors] = useState({ message: "", status: "" });
  const [cookies] = useCookies("token");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState({ role: "", id: "" });
  const navigate = useNavigate();
  const [flag, setErrflag] = useState(false);

  const handleOnChange = (e) => {
    switch (e.target.id) {
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

  const verifyToken = () => {
    console.log("i am in verify token");
    if (cookies.token) {
      const decoded = jwtDecode(cookies.token);
      setUser({
        role: decoded.user.role,
        id: decoded.user.id,
      });

      navigate("/home");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleLogIn = async (e) => {
    console.log(email, password);
    e.preventDefault();
    setErrflag(false);
    const customURL = "user/loginUser";

    try {
      const data = await logIn(email, password, customURL);
      setCookies("token", data.token, { path: "/" });
      console.log(data, "I am data");
      const decoded = jwtDecode(data.token);
      if (decoded.user.role === "admin" || decoded.user.role === "user") {
        navigate("/home");
      }
    } catch (error) {
      setErrors({ message: error.message, status: error.status });
      setErrflag(true);
    }
  };

  return (
    <>
      {flag && <Toast error={errors} />}
      <div className="container mt-5 ">
        <div className="row justify-content-center ">
          <div className="col-5 border customCard border-2 p-5">
            <h3 className="text-center text-secondary">Log In</h3>
            <form onSubmit={handleLogIn}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"> 
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleOnChange}
                  id="email"
                  aria-describedby="emailHelp"
                />
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
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p className="mt-5">
              Don't have an Account
              <Link to={`/signup`} className=" ms-2 btn btn-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
