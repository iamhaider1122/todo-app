import { BASE_URL } from "../config";

//get info of a particular user with user id:: admin/user
export const getUserInfo=async (url,id)=>{

    try{
        const res=await fetch(`${BASE_URL}/${url}${id}`,{
            headers:{
                "Content-Type": "application/json",

            },
            credentials: "include"
        })
         return res.json()
    }
    catch(error){
        throw error
    }
}

//get all users::Admin/user  
export const getUsers=async (url)=>{

    try{
        const res=await fetch(`${BASE_URL}/${url}`,{
            headers:{
                "Content-Type": "application/json",
 
            },
            credentials: "include"
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
        console.log(res, "i am before if else",res.ok)
        if(res.ok){
              console.log(res)
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
//sign up for any user admin or user
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
         
         
         
        console.log( 'i am error message')
         const error = {
             status: res.status,
             message: await res.json()
         };
         throw error;
        }
}

//authenticate the token from cookies:: admin/user
export const authUsingToken= async (url)=>{

    console.log('i am in authapi')
   
        const res = await fetch(`${BASE_URL}/${url}`, {

          credentials: "include"
        });
        if(res.ok){
            console.log(res,'i am response in authusing token')
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