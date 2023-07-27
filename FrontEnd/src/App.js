
import "./App.css";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DiseaseDetection from "./components/Disease-Detection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path ='/' element={<Home/>} />
        <Route path ='/disease-detection' element={<DiseaseDetection/>} />
        <Route path ='/contact' element={<Contact/>} />
        <Route path ="*" element = {<Navigate to = "/"/>} />
      </Routes>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;
