import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { Plus, Pencil, Trash } from 'lucide-react'



// Uers homepage with figures in table, button to add figure, options in figure table to edit/delete
const Dashboard = () => {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch('hrrp://localhost:5001/api/figures/my-collection', {
          headers: {
            'Authorization': `Bearer ${user.token}`, 
          },
        });
        const data = await response.json();
        if(response.ok) {
          setFigures(data);
        }
      } catch (error) {
        console.error('Failed to fetch collection', error);
      } finally {
        setLoading(false);
      }
    };

    if(user?.token) {
      fetchCollection();
    }
  }, [user]);

  if(loading) return <div className='text-center, mt-10'>Scanning the Shelves...</div>;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>My Collection</h1>
        <Link
          to="/add"
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'>
            <Plus /> Add Figure
          </Link>
      </div>
      {figures.length === 0 ? (
        <div className='text-center p-10 bg-white rounded-xl shadow'>
          <p className='text-gray-500'>Your Collection is empty. Time to go hunting!</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {figures.map((figure) => (
            <div key={figure._id} className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition'>
              <div className='p-4'>
                <h3 className='text-xl font-bold text-gray-900'>{figure.name}</h3>
                <p className='text-sm text-blue-600 font-semibold'>Collection: {figure.branding}</p>
                <p className='text-sm text-blue-600 font-semibold'>Series: {figure.series}</p>
                <p className='text-sm text-blue-600 font-semibold'>Number: {figure.number}</p>
                <p className='text-sm text-blue-600 font-semibold'>Exclusive: {figure.exclusive}</p>
                <p className='text-sm text-blue-600 font-semibold'>Chase: {figure.chase}</p>
                <p className='text-sm text-blue-600 font-semibold'>Condition: {figure.condition}</p>
                <p className='text-sm text-blue-600 font-semibold'>Notes: {figure.notes}</p>
                <div className='mt-2 flex justify-between items-center'>
                  <Link to={`/edit/${figure._id}`} className='text-gray-400 hover:text-blue-500'>
                    Edit <Pencil />
                  </Link>
                  <Link to={`/delete/${figure._id}`} className='text-gray-400 hover:text-red-600'>
                    Delete <Trash />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
