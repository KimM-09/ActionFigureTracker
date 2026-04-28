import React from 'react';
import { Link } from 'react-router';

//Landing page with a description of what the app is for, login button, & register button 
const Homepage = () => {
  return (
    <div className='flex flex-col items-center'>
      <img src='/assets/AEW-Logo.webp' alt='AEW Logo' className='w-xs'/>
      <p className='w-full bg-dark-gray/75 text-gold p-4 text-2xl'>Tired of being at conventions or even at your local toy shop and wondering "Do I have that fig?". Wonder no more! With this application, you can keep track of your entire AEW action figure collection and have it easily accessible anytime!</p> 
    </div>
  )
}

export default Homepage
