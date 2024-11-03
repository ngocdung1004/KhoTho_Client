import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Components/pages/App';
import About from './Components/pages/About';
import Contact from './Components/pages/Contact';
import Customer from './Components/pages/Customer';
import Jobs from './Components/pages/Jobs';
import Register from './Components/pages/RegisterPage/Register';  
import Login from './Components/pages/LoginPage/Login';
import ForgotPassword from './Components/pages/ForgotPasswordPage/ForgotPassword';
import AdminDashboard from './Components/pages/Dashboard/AdminDashboard';  // Updated path
import CustomerDashboard from './Components/pages/Dashboard/CustomerDashboard';  // Updated path
import WorkerProfile from "./Components/pages/WorkerProfile/WorkerProfile";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/khotho" element={<Jobs />} />  
        <Route path="/jobs" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />  
        <Route path="/worker-profile/:workerId" element={<WorkerProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);