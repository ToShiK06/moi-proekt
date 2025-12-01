import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import Booking from './components/booking/Booking';
import AdminLoginPage from './pages/AdminLoginPage';
import ReviewsPage from './components/Rewiews/ReviewsPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
       <Route path="/booking" element={<Booking />} />
       <Route path="/admin-panel" element={<AdminDashboardPage />} />
       <Route path="/admin-login" element={<AdminLoginPage />} />
       <Route path="/rewiews" element={<ReviewsPage />} />
       <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
     
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);