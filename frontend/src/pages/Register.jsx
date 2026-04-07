import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

//page for new user registration - button to login
const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefalut();
  
      try {
        const response = await fetch('http://localhost:5001/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
  
        if(response.ok) {
          login(data); //save user and token to context
          navigate('/'); //Redirect to collection
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error("Login error", error);
      }
    };
  
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className='p-8 bg-white shadow-md rounded-lg w-96'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
          <input 
            type="text" placeholder='Username'
            className='w-full p-2 mb-4 border rounded'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='email' placeholder='Email'
            className='w-full p-2 mb-4 border rounded'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder='Password'
            className='w-full p-2 mb-4 border rounded'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
            Register
          </button>
        </form>
      </div>
    );
}

export default Register
