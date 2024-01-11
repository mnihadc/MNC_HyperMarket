import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.css';

function UserHeader() {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser ? (
        <header className='fixed bottom-0 w-full' style={{ backgroundColor: '#fceed1' }}>

            <div className='flex  mx-auto p-3 items-center justify-between'>
                <Link to='/address' className='hover:underline'>
                    <i className='fas fa-map-marker-alt ml-6' style={{ color: 'gray' }}></i>
                </Link>
                <div className='border-r border-gray-500 h-6'></div>
                <Link to='/cart' className='hover:underline'>
                    <i className='fas fa-shopping-cart ml-2' style={{ color: 'gray' }}></i>
                </Link>
                <div className='border-r border-gray-500 h-6'></div>
                <Link to='/order' className='hover:underline ml-1'>
                    <i className='fas fa-shopping-bag ml-2' style={{ color: 'gray' }}></i>
                </Link>
                <div className='border-r border-gray-500 h-6'></div>
                <Link to='/search' className='hover:underline mr-1'>
                    <i className='fas fa-search mr-4' style={{ color: 'gray' }}></i>
                </Link>
            </div>
        </header>
    ) : null;
}

export default UserHeader;
