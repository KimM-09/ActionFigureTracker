import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { Pencil, Trash, Search } from 'lucide-react'


const Dashboard = () => {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('sort');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/figures/my-collection', {
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

  const filteredFigures = figures.filter((figure) => {
    const nameMatch = figure.name.toLowerCase().includes(searchTerm.toLowerCase());
    const collectionMatch = figure.branding.toLowerCase().includes(searchTerm.toLowerCase());

    return nameMatch || collectionMatch;
  });

  const sortedFigures = [...filteredFigures].sort((a,b ) => {
    if(sortType === 'az') {
      return a.name.localeCompare(b.name);
    } else if(sortType === 'za') {
      return b.name.localeCompare(a.name);
    } else if(sortType === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if(sortType === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  })

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to remove this figure from your shelf?")) return
    
    try {
      const response = await fetch(`http://localhost:5001/api/figures/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      })  ;

      if(response.ok){
        setFigures(figures.filter((figure) => figure._id !== id))
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete')
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  }

  if(loading) return <div className='text-center, mt-10'>Scanning the Shelves...</div>;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8'>
        <h1 className='text-3xl bg-light-gray/50 font-bold text-dark-gray text-shadow-lg'>My Collection</h1>
         <div className='relative w-full md:w-96 flex items-center justify-around gap-4'>
           {/* SEARCH BAR  */}
          <input
            type='text'
            placeholder='Search name or Collection'
            className='w-full p-2 pl-10 mb-5 mt-5 md:m-5 bg-light-gray border border-dark-gray rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='w-5 h-5 text-gray-400 absolute left-3 top-8 md:left-6.5 md:top-8' />
          </div>
          <div className='w-full md:w-96 flex items-center justify-start gap-4'>
           {/* SORT DROPDOWN  */}
          <select
            className='relative p-2 border rounded-lg bg-light-gray outline-none focus:ring-2 focus:ring-blue-500'
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="sort">Sort by...</option>
            <option value='newest'>Recently Added</option>
            <option value='oldest'>Oldest Added</option>
            <option value='az'>Alphabetical (A-Z)</option>
            <option value='za'>Alphabetical (Z-A)</option>
          </select>
         </div>
      </div>
      {sortedFigures.length === 0 ? (
        <div className='text-center p-10 bg-white rounded-xl shadow'>
          <p className='text-gray-500'>Your Collection is empty. Time to go hunting!</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedFigures.map((figure) => (
            <div key={figure._id} className='bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition'>
              
              <div className='p-4'>
                <h3 className='text-xl font-bold text-white text-center'>{figure.name}</h3>
                <p className='text-sm text-gold font-semibold'>Collection: {figure.branding}</p>
                <p className='text-sm text-gold font-semibold'>Series: {figure.series}</p>
                <p className='text-sm text-gold font-semibold'>Number: {figure.number}</p>
                <p className='text-sm text-gold font-semibold'>Exclusive: {figure.exclusive}</p>
                <p className='text-sm text-gold font-semibold'>Chase: {figure.chase}</p>
                <p className='text-sm text-gold font-semibold'>Condition: {figure.condition}</p>
                <p className='text-sm text-gold font-semibold'>Notes: {figure.notes}</p>
                <div className='relative mt-2 flex justify-between items-center'>
                  <Link to={`/edit/${figure._id}`} className='text-gray-400 hover:text-blue-500'>
                    <Pencil className='w-6 h-6 mt-3' />
                  </Link>
                  <button
                onClick={() => handleDelete(figure._id)}
                className='absolute top-2 right-2 text-red-400 p-2 hover:cursor-pointer hover:text-red-600'
                title='Delete Figure'
              >
                <Trash className='w-5 h-5' />
              </button>
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
