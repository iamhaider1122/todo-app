import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
function App() {
  return (
    <>

  
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<><Navbar/><Home/> </>} />
          <Route path="/about" element={<><Navbar/><About/> </>} />
           
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
