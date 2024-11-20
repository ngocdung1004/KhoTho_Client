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
import WorkerProfile from "./Components/pages/WorkerProfile/WorkerProfile"; //tested path
import UserManagement from './Components/pages/Dashboard/UserManagement';
import Dashboard from './Components/pages/Dashboard/Dashboard';  // Updated path
import WorkerManagement from './Components/pages/Dashboard/WorkerManagement';
import JobTypeManagement from './Components/pages/Dashboard/JobTypeManagement';
import ReviewManagement from './Components/pages/Dashboard/ReviewManagement';
import WorkerDashboard from './Components/pages/Dashboard/Worker/WorkDashboard';
import RegisterWorker from './Components/pages/RegisterWorker/RegisterWorker'
import OrderTracking from './Components/pages/OrderTracking/OrderTracking'
import Profile from './Components/pages/MyProfile/Profile';
<<<<<<< HEAD
import './index.css';

=======
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './index.css';

>>>>>>> 4af0bedb18ab875ad243f9b4a3cf34c5efccac5a
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/khotho" element={<Jobs />} /> 
        <Route path="/ordertracking" element={<OrderTracking />} />  
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/usermanagement" element={<UserManagement />} />
        <Route path="/admin/customers" element={<CustomerDashboard />} />  
        <Route path="/admin/users" element={<UserManagement />} />  
        <Route path="/admin/workers" element={<WorkerManagement/>} />  
        <Route path="/admin/jobtypes" element={<JobTypeManagement />} />
        <Route path="/admin/reviews" element={<ReviewManagement />} />
        <Route path="/workers" element={<WorkerDashboard/>} />
        <Route path="/registerworker" element={<RegisterWorker/>} />
        <Route path="/ordertracking" element={<OrderTracking/>} />
        
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);