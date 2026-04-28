import React from 'react'
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddFigure from './pages/AddFigure';
import Nav from './components/Nav';
import EditFigure from './pages/EditFigure';
import Homepage from './pages/Homepage';


const App = () => {
  const { user } = useAuth();

  return (
    <>
     <Nav />
      <div className='container mx-auto p-4'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={user ? <ProtectedRoute><Dashboard /></ProtectedRoute> : <Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/my-collection" element={user ? <ProtectedRoute><Dashboard /></ProtectedRoute> : <Login />} />
          <Route path="/add" element={user ? <ProtectedRoute><AddFigure /></ProtectedRoute> : <Login />} />
          <Route path='/edit/:id' element={user ? <ProtectedRoute><EditFigure /></ProtectedRoute> : <Login />} />
        </Routes>
      </div>
    </> 
  );
}

export default App
