import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import RegisterButton from '../components/RegisterButton';

//page for new user registration - button to login
const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${API_URL}/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
  
        if(response.ok) {
          login(data); //save user and token to context
          navigate('/my-collection'); //Redirect to collection
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error("Registration error", error);
      }
    };
  
    return (
      <div className='flex flex-col items-center h-screen justify-center'>
        <form onSubmit={handleSubmit} className='p-8 bg-dark-gray shadow-md rounded-lg w-96'>
          <h2 className='text-2xl font-bold mb-6 text-gold text-center'>Register</h2>
          <input 
            type="text" placeholder='Username'
            className='w-full p-2 mb-4 bg-white border rounded'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='email' placeholder='Email'
            className='w-full p-2 mb-4 bg-white border rounded'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder='Password'
            className='w-full p-2 mb-4 bg-white border rounded'
            onChange={(e) => setPassword(e.target.value)}
          />
          <RegisterButton />
        </form>
      </div>
    );
}

export default Register
