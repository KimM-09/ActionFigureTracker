import React from 'react'
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react'
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

//Navigation links - new figure, log out
const Nav = () => {
  const { user, logout } = useAuth();

  return (
      <nav className='flex justify-between items-center p-4 bg-dark-gray text-gold shadow-lg'>
        <Link to={user ? "/my-collection" : "/"} className='text-xl font-bold'>Figure Tracker</Link> 
        <div className='space-x-4 flex items-center'>
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <Link to="/add" className='bg-gold text-dark-gray px-4 py-2 rounded-lg hover:bg-gold-light transition flex items-center gap-2'><Plus className='w-5 h-5' /> Add Figure</Link>
              <Link to="/login">  <button onClick={logout}
                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
              >
                Logout
              </button></Link>
            </>
          ) : (
            <>
              <Link to='/login' className='px-3 py-1'><LoginButton /></Link>
              <Link to='/register' className='px-3 py-1'><RegisterButton /></Link>
            </>
          )}
        </div>
      </nav>    
  );
};

export default Nav
