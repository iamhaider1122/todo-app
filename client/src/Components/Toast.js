import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
export default function Toast(props){


    useEffect(()=>{
       console.log("i am in toast",props.error)
        toast.error(`Invalid User(${props.error.status}):${props.error.message}`, {
            position: "top-right",
            
          });
    })

 
 
   
    

    return (
      <div>
        
        <ToastContainer />
      </div>
    );
  }

  Toast.propTypes = {
    status: PropTypes.string,
    message: PropTypes.number
  };