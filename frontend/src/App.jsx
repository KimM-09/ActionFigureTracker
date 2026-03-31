import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import AddFigure from './pages/AddFigure';


const App = () => {
  return (
    <div>
     <BrowserRouter> 
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/" element={user ? <ProtectedRoute><Dashboard /></ProtectedRoute> : <Homepage />} />
        <Route path="/add-figure" element={<AddFigure />} />
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
