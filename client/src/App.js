import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import User from "./Components/User";
import CreateTask from "./Components/CreateTask";
import UpdateTask from "./Components/UpdateTask";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
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
          <Route path="/createTask/:id" element={<><CreateTask/> </>} />
          <Route path="/updateTask/:id" element={<><UpdateTask/> </>} />
           
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
