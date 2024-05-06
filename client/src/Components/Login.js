import React, { useEffect } from "react";
import { useState } from "react";
import { logIn } from "../api/userApi";
import { authUsingToken } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
export default function Login() {
  const [cookie, setCookie] = useCookies(["token"]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("i am in useEffect");
    const authenticateUser = async () => {
      console.log('i am in authenticateuser')
       const customURL='user/protected'
      try {
         const data=await authUsingToken(customURL)
         console.log(data,'i am res in useEfftect')
        if (data.success) {
          navigate("/home");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    authenticateUser();
  }, []);

  const handleLogIn = async (e) => {
    console.log(email, password);
    e.preventDefault();
    const customURL = "user/loginUser";
    console.log(" I am before try catch");
    try {
      console.log(" i am in try catch");
      const data = await logIn(email, password, customURL);
      setCookie("token", data.token, { path: "/" });
      console.log(data, "I am data");
        // const decoded = jwtDecode(data.token);
        // console.log(decoded.user.role,"i am decoded data")
    } catch (error) {
      console.log(error.status, error.message, "I am in login component");
    }
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="row justify-content-center ">
          <div className="col-5 border border-2 p-5">
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
          </div>
        </div>
      </div>
    </>
  );
}
