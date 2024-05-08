
import { BASE_URL } from "../config";
 
//create task with user id and update task with task id
export const Submit = async (apiMethod,title,description,id,url) => {
  console.log(title, description);
   
    const res = await fetch(`${BASE_URL}/${url}` + id, {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
           },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      credentials: "include"
    });

    
   
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
};



//get task that we want to update with task id
export const getTaskToUpdate =async (url,id)=>{

  try{
      const res= await fetch(`${BASE_URL}/${url}${id}`, {
      headers: {
        "Content-Type": "application/json"
       },
       credentials: "include"
      
      })
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
      },
      credentials: "include"
    })

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
     },
     credentials: "include"
    })

      return res.json()

  }catch(error){
    throw error
  }
}



export const getMyTasks= async(url)=>{

  const res=await fetch(`${BASE_URL}/${url}`,{
    credentials: "include"
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
      credentials: "include"
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