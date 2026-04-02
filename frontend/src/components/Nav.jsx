import React from 'react'
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

//Navigation links - new figure, log out
const Nav = () => {
  const { user, logout } = useAuth();

  return (
      <nav className='flex justify-between items-center p-4 bg-slate-800 text-white shadow-lg'>
        <Link to="/" className='text-xl font-bold'>Figure Tracker</Link>

        <div className='space-x-4'>
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <Link to="/add" className='hover:text-blue-400'>Add Figure</Link>
              <button onClick={logout}
                className='bg-red-500 px-3 py-1 rounded hover:bg-red-600'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='hover:text-blue-400'>Login</Link>
              <Link to='/register' className='bg-blue-600 px-3 py-1 rounded hover:bg-blue-700'>Sign Up</Link>
            </>
          )}
        </div>
      </nav>    
  );
};

export default Nav
