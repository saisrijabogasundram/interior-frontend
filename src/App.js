import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './components/Navbar';


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

import ManageStaff from './pages/ManageStaff';
import ManageBookings from './pages/ManageBookings';
import ManageProducts from './pages/ManageProducts';
import ManageDesigners from './pages/ManageDesigners';
import Reports from './pages/Reports';


import { AdminRoute, StaffRoute } from './utils/PrivateRoute';


const UserRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
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
          path="/designers"
          element={
            <UserRoute>
              <Designers />
            </UserRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <UserRoute>
              <Booking />
            </UserRoute>
          }
        />
        <Route
          path="/products"
          element={
            <UserRoute>
              <Products />
            </UserRoute>
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
          path="/projects"
          element={
            <UserRoute>
              <Projects />
            </UserRoute>
          }
        />
        <Route
          path="/estimate"
          element={
            <UserRoute>
              <CostEstimation />
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
    </Router>
  );
}

export default App;