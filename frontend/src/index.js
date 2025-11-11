import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import Booking from './components/Booking';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element ={<App />}/>
      <Route path="/booking" element={<Booking />} />
       <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


