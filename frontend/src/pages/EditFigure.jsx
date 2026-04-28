import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Ban } from 'lucide-react';

const EditFigure = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const  navigate  = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const [formData, setFormData] = useState({
        name: '',
        branding: '',
        series: '',
        number: '',
        exclusive: '',
        chase: '',
        condition: '',
        notes: ''
    });

    useEffect(() => {
        const fetchFigure = async () => {
            try {
                const response = await fetch(`${API_URL}/api/figures/${id}`, {
                    headers: {'Authorization': `Bearer ${user.token}`}
                });
                const data = await response.json();
                if(response.ok) {
                    setFormData(data);
                }
            } catch (error) {
                console.error("Error fetching figure", error);
            }
        };
        fetchFigure();
    }, [id, user.token]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/figures/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData),
            });

            if(response.ok){
                navigate('/my-collection'); //go back to the dashboard to see the updated figure
            }
        } catch (error) {
            console.error("Update error", error);
        }
    };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-blue-100'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Edit Figure Details</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Figure Name</label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Collection</label>
                <input
                    type='text'
                    name='branding'
                    value={formData.branding}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Series</label>
                <input
                    type='text'
                    name='series'
                    value={formData.series}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Number</label>
                <input
                    type='text'
                    name='number'
                    value={formData.number}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Exclusive</label>
                <input
                    type='text'
                    name='exclusive'
                    value={formData.exclusive}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Chase</label>
                <input
                    type='text'
                    name='chase'
                    value={formData.chase}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Condition</label>
                <input
                    type='text'
                    name='condition'
                    value={formData.condition}
                    required
                    className='mt-1 block w-full p-2 border rounded-md focus:ring-blue-500'
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>Notes</label>
                <textarea
                    name='notes'
                    value={formData.notes}
                    rows='3'
                    className='mt-1 block w-full p-2 border rounded-md'
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className='flex gap-4 pt-4'>
                <button
                    type='submit'
                    className='flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 hover:cursor-pointer font-bold'
                >
                    Update Figure
                </button>
                <button
                    type='button'
                    className='flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 hover:cursor-pointer transition text-center flex items-center justify-center gap-2'
                    onClick={() => navigate('/my-collection')}
                >
                    Cancel <Ban className='w-5 h-5' />
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditFigure