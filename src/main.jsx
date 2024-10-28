import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Components/pages/App';
import About from './Components/pages/About';
import Contact from './Components/pages/Contact';
import Customer from './Components/pages/Customer';
import Jobs from './Components/pages/Jobs';
import Register from './Components/pages/RegisterPage/Register';  
import './index.css';
import Login from './Components/pages/LoginPage/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/khotho" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
