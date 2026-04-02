import React from 'react'
import { Route, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddFigure from './pages/AddFigure';
import Nav from './components/Nav';


const App = () => {
  return (
    <AuthProvider>
     
     <Nav />
      <div className='container mx-auto p-4'>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-figure" element={<ProtectedRoute><AddFigure /></ProtectedRoute>} />
        </Routes>
      </div>
     
    </AuthProvider>
  );
}

export default App
