import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import User from "./Components/User";
import CreateTask from "./Components/CreateTask";
import UpdateTask from "./Components/UpdateTask";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UserHome from "./Components/UserHome";
import UpdateTaskStatus from "./Components/UpdateTaskStatus";
import ViewUsers from "./Components/ViewUsers";
import LogOut from "./Components/LogOut";
function App() {
  return (
    <>

  
      <BrowserRouter>
        <Routes>
           

          <Route path="/" element={<><Login/></>}/>
          <Route path="/home" element={<><Home/> </>} />
          <Route path="/signup" element={<><Signup/> </>} />
          <Route path="/about" element={<><About/> </>} />
          <Route path="/getUser/:id" element={<><User/> </>} />

          <Route path="/userhome" element={<><UserHome/> </>} />
          <Route path="/viewusers" element={<><ViewUsers/> </>} />
          <Route path="/updatetaskstatus/:id" element={<><UpdateTaskStatus/> </>} />
          <Route path="/createTask/:id" element={<><CreateTask/> </>} />
          <Route path="/updateTask/:id" element={<><UpdateTask/> </>} />
          <Route path="/logout" element={<><LogOut/> </>} />

           
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
