import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DesignGallery from './pages/DesignGallery';
import Designers from './pages/Designers';
import Booking from './pages/Booking';
import Products from './pages/Products';
import Projects from './pages/Projects';
import CostEstimation from './pages/CostEstimation';
import Cart from './pages/Cart';
import Admindashboard from './pages/Admindashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDashboard from './pages/UserDashboard';
import ModularInteriors from './pages/ModularInteriors';
import FullHomeInteriors from './pages/FullHomeInteriors';
import LuxuryInteriors from './pages/LuxuryInteriors';
import Renovations from './pages/Renovations';
import ManageStaff from './pages/ManageStaff';
import ManageBookings from './pages/ManageBookings';
import ManageProducts from './pages/ManageProducts';
import ManageDesigners from './pages/ManageDesigners';
import Reports from './pages/Reports';

import { AdminRoute, StaffRoute } from './utils/PrivateRoute';

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} />;
};

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/designs" element={<DesignGallery />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/products" element={<Products />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/estimate" element={<CostEstimation />} />
        <Route path="/modular" element={<ModularInteriors />} />
        <Route path="/full-home" element={<FullHomeInteriors />} />
        <Route path="/luxury" element={<LuxuryInteriors />} />
        <Route path="/renovations" element={<Renovations />} />


        <Route
          path="/admin/staff"
          element={
            <AdminRoute>
              <ManageStaff />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <Reports />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Admindashboard />
            </AdminRoute>
          }
        />

        
        <Route
          path="/staff/bookings"
          element={
            <StaffRoute>
              <ManageBookings />
            </StaffRoute>
          }
        />
        <Route
          path="/staff/products"
          element={
            <StaffRoute>
              <ManageProducts />
            </StaffRoute>
          }
        />
        <Route
          path="/staff/designers"
          element={
            <StaffRoute>
              <ManageDesigners />
            </StaffRoute>
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <StaffRoute>
              <StaffDashboard />
            </StaffRoute>
          }
        />

       
        <Route
          path="/cart"
          element={
            <UserRoute>
              <Cart />
            </UserRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;