import React from 'react'
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddFigure from './pages/AddFigure';
import Nav from './components/Nav';
import EditFigure from './pages/EditFigure';


const App = () => {
  return (
    <>
     <Nav />
      <div className='container mx-auto p-4'>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/my-collection" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddFigure /></ProtectedRoute>} />
          <Route path='/edit/:id' element={<ProtectedRoute><EditFigure /></ProtectedRoute>} />
        </Routes>
      </div>
    </> 
  );
}

export default App
