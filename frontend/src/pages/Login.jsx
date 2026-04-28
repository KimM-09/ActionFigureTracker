import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import LoginButton from '../components/LoginButton';

//user login page - also have button to register
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if(response.ok) {
        login(data); //save user and token to context
        navigate('/my-collection'); //Redirect to collection
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='p-8 bg-dark-gray shadow-md rounded-lg w-96'>
        <h2 className='text-2xl font-bold mb-6 text-gold text-center'>Collector Login</h2>
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
        <LoginButton />
      </form>
    </div>
  );
}

export default Login
