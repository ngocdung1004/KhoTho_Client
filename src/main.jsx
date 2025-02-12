import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Components/pages/App';
import About from './Components/pages/About';
import AboutLogin from './Components/pages/AboutLogin';
import Contact from './Components/pages/Contact';
import ContactLogin from './Components/pages/ContactLogin';
import Customer from './Components/pages/Customer';
import Jobs from './Components/pages/Jobs';
import JobsLogin from './Components/pages/JobsLogin';
import Register from './Components/pages/RegisterPage/Register';  
import Login from './Components/pages/LoginPage/Login';
import ForgotPassword from './Components/pages/ForgotPasswordPage/ForgotPassword';
// import AdminDashboard from './Components/pages/Dashboard/AdminDashboard';  // Updated path
import CustomerDashboard from './Components/pages/Dashboard/CustomerDashboard';  // Updated path
import WorkerProfile from "./Components/pages/WorkerProfile/WorkerProfile"; //tested path
import UserManagement from './Components/pages/Dashboard/UserManagement';
import Dashboard from './Components/pages/Dashboard/Dashboard';  // Updated path
import WorkerManagement from './Components/pages/Dashboard/WorkerManagement';
import JobTypeManagement from './Components/pages/Dashboard/JobTypeManagement';
import ReviewManagement from './Components/pages/Dashboard/ReviewManagement';
import BookingManagement from './Components/pages/Dashboard/BookingManagement';
import WorkerScheduleManagement from './Components/pages/Dashboard/WorkerScheduleManagement';
import WorkerDashboard from './Components/pages/Dashboard/Worker/WorkDashboard';
import RegisterWorker from './Components/pages/RegisterWorker/RegisterWorker'
import OrderTracking from './Components/pages/OrderTracking/OrderTracking'
import Profile from './Components/pages/MyProfile/Profile';
import OrderManagement from './Components/pages/OrderManagement/OrderManagement';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BookingPaymentManagement from './Components/pages/Dashboard/BookingPaymentManagement';
import DetailBookingPaymentManagement from './Components/pages/Dashboard/DetailBookingPaymentManagement';
import WorkerDetail from './Components/pages/Dashboard/WorkerDetail';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Jobs />} /> 
        <Route path="/khothologin" element={<JobsLogin />} /> 
        <Route path="/ordertracking" element={<OrderTracking />} />  
        <Route path="/ordermanagement" element={<OrderManagement />} />  
        <Route path="/jobs" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/aboutlogin" element={<AboutLogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactlogin" element={<ContactLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
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
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/workerschedule" element={<WorkerScheduleManagement />} />
        <Route path="/admin/bookingpayment" element={<BookingPaymentManagement />} />
        <Route path="/booking-payment/detail/:id" element={<DetailBookingPaymentManagement />} />
        <Route path="/workers" element={<WorkerDashboard/>} />
        <Route path="/workers/detail/:id" element={<WorkerDetail />} />
        
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
