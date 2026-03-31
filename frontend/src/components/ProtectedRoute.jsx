import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

//wrap around pages that should be kept private such as AddFigure and Dashboard
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading spinnger while checking if the user is logged in.
  if(loading) return (<div>Loading...<Loader /></div>)
  
  // If no user is found, redirect to the login page
  if(!user) {
    return <Navigate to="/login" replace />
  }

  //If a user exists, render the private page (children)
  return children;
}

export default ProtectedRoute
