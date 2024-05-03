import { BASE_URL } from "../config";

//get info of a particular user with user id::Admin Endpoint
export const getUserInfo=async (url,id)=>{

    try{
        const res=await fetch(`${BASE_URL}/${url}${id}`,{
            headers:{
                "Content-Type": "application/json",
                "auth-token":
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",

            }
        })
         return res.json()
    }
    catch(error){
        throw error
    }
}

//get all users::Admin Endpoint
export const getUsers=async (url)=>{

    try{
        const res=await fetch(`${BASE_URL}/${url}`,{
            headers:{
                "Content-Type": "application/json",
                "auth-token":
                  "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",

            }
        })
        if (res.ok) {
            return res.json();
        } else {
           const msg= await res.json()
            const error = {
                status: res.status,
                message: msg.error
            };
            throw error;
        }
    } catch (error) {
        console.error("Error Status:", error.status); // Log the error status
        console.error("Error Message:", error.message); 
        throw error;  
    }
};

//Login user as admin or user::for Admin and User roles

export const logIn= async(email,password,url)=>{

        const res=await fetch(`${BASE_URL}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify({ 
                email: email,
                password: password,
            })
        })
        if(res.ok){
              
            return res.json()
        }
        else {
            const msg= await res.json()
             const error = {
                 status: res.status,
                 message: msg.error
             };
             throw error;
            }
     
    
}

export const singUp= async (name,email,password,url)=>{

    
    const res=await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  
        },
        body: JSON.stringify({ 
            name:name,
            email: email,
            password: password,
            role:'user'
        })
    })
    if(res.ok){
          console.log('i am response in user api',res)
        return res.json()
    }
    else {
        const msg= await res.json()
         const error = {
             status: res.status,
             message: msg.error
         };
         throw error;
        }
}