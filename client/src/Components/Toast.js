import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast(props) {
  useEffect(() => {
    console.log("i am in toast", props.error,props.error.message.error);
   if(props.error.status && props.error.status>=400)
    toast.error(`Invalid User(${props.error.status}):${props.error.message.error}`, {
      position: "top-right",
    });
    else{
      toast.error(`Network Error`, {
        position: "top-right",
      });
    }
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

Toast.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
};
