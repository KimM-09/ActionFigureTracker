import React, { useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Ban } from 'lucide-react';

//Add a new figure to your collection
const AddFigure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData ] = useState({
    name: '',
    branding: '',
    series: '',
    number: '',
    exclusive: '',
    chase: '',
    condition: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/figures/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        navigate('/my-collection') // go back to the dashboard to see the new addition
      } else {
        const errorData = await response.json();
        alert(error.message || 'Failed to add figure.')
      }
    } catch (error) {
      console.error("Error adding figure", error);
    }
  }
  return (
    <div className='max-w-2xl mx-auto, mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Add to Collection</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Figure Name</label>
          <input 
            type='text'
            name='name'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. Hangman Adam Page'
            onChange={handleChange}
          />
        </div>
       
        <div>
          <label className='block text-sm font-medium text-gray-700'>Collection</label>
          <input 
            type='text'
            name='branding'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. Unrivaled'
            onChange={handleChange}
          />
          </div>
          
          <div>
          <label className='block text-sm font-medium text-gray-700'>Series</label>
          <input 
            type='text'
            name='series'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. 13'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Number</label>
          <input 
            type='text'
            name='number'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. 118'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Exclusive</label>
          <input 
            type='text'
            name='exclusive'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. Target'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Chase</label>
          <input 
            type='text'
            name='chase'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. Yes, 1:3000'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Condition</label>
          <input 
            type='text'
            name='condition'
            required
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g. New'
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Notes</label>
          <textarea
            name='notes'
            rows='3'
            className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            placeholder='Where did you find it? How much did it cost?'
            onChange={handleChange}
          ></textarea>
        </div>
        {/* BUTTONS */}
        <div className='flex gap-4 pt-4'>
          <button
            type='submit'
            className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-bold transition'
          >
            Add to Collection
          </button>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition'
          >
            Cancel <Ban />
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddFigure
