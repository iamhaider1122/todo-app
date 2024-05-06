
import { BASE_URL } from "../config";
 
//create task with user id and update task with task id
export const Submit = async (apiMethod,title,description,id,url) => {
  console.log(title, description);
  try {
    const res = await fetch(`${BASE_URL}/${url}` + id, {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data)
      throw { status: res.status, errors: data.errors };
    }
  } catch (error) {
    throw error;
  }
};



//get task that we want to update with task id
export const getTaskToUpdate =async (url,id)=>{

  try{
      const res= await fetch(`${BASE_URL}/${url}${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",
      }})
    return res.json()

  }catch(error){
    throw error
  }
 
    
}

//delete a particular task of a user with task id

export const deleteUserTask=async(method,url,id)=>{
 
  try{
    
    const res=await fetch(`${BASE_URL}/${url}/${id}`,{
      method:method,
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",
      }})

  }catch(error){
    throw error
  }

}

//get all tasks of a user with user id

export const userTasks=async (url,id)=>{
  
  try{
    
    const res=await fetch(`${BASE_URL}/${url}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMzhiYTFkOWEyOTllODU4ZjFlYjhlIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDY1NDExM30.LwrC1h8PlTML_TI2Vid7j72pVsB54apWz8udlplr-7c",
      }})

      return res.json()

  }catch(error){
    throw error
  }
}

export const getMyTasks= async(url)=>{

  const res=await fetch(`${BASE_URL}/${url}`)
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
export const submitStatus =async (method, id, url,status)=>{

  try {
    const res = await fetch(`${BASE_URL}/${url}` + id, {
      method: method,
      headers: {
        "Content-Type": "application/json",
         },
      body: JSON.stringify({
        status: status
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data)
      throw { status: res.status, errors: data.errors };
    }
  } catch (error) {
    throw error;
  }
  


}