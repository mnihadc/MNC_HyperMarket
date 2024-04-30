import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupermarketListing from '../Components/Listings';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/listing/search', {
        params: {
          productName: searchTerm,
          sortBy
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className='pt-16'>
      <div className='text-center mt-4'>
        <input
          type='text'
          id='searchTerm'
          placeholder='Search'
          value={searchTerm}
          className='bg-slate-300 p-3 rounded-md w-64'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-3 text-center ml-32">
        <label htmlFor="sortBy" className='font-semibold ml-2'>Sort:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className='border rounded-lg p-2'
        >
          <option value="">Relevance</option>
          <option value="offerPrice">Price low to high</option>
          <option value="-offerPrice">Price high to low</option>
          <option value="-createdAt">Latest</option>
          <option value="createdAt">Oldest</option>
        </select>
      </div>
      <div className='p-2'>
        <h2 className='font-semibold text-xl p-1'>Search Results</h2>
        <SupermarketListing searchResults={searchResults} />
      </div>
    </div>
  );
}

export default Search; 
