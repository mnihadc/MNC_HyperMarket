import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const isAdmin = currentUser && currentUser.isAdmin;

    return (
        <header className='fixed top-0 w-full' style={{ backgroundColor: '#fceed1' }}>
            <div className='max-w-6xl mx-auto p-3 flex justify-between items-center'>
                <Link to='/'>
                    <h1 className='font-semibold text-xl lg:text-4xl xl:text-4xl text-white' style={{ marginLeft: '1rem', sm: '2rem', lg: '4rem' }}>
                        <span className='sm:text-xl lg:text-3xl xl:text-4xl text-green-500'>MNC</span>
                        <span className='text-sm lg:text-base text-slate-600'>
                            {isAdmin ? '_HyperMarket ADMIN' : '_HyperMarket'}
                        </span>
                    </h1>
                </Link>
                <ul className='flex gap-3'>
                    <Link to='/'>
                        <li className='hover:underline'>Home</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                        ) : (
                            <li className='text-slate-700 hover:underline'>Sign-In</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}

export default Header;
