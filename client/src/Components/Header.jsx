import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (

        <header className='fixed top-0 w-full' style={{ backgroundColor: '#fceed1' }}>
            <div className='max-w-6xl mx-auto p-3 flex justify-between items-center'>
                <Link to='/'>
                    <h1 className='font-semibold text-xl lg:text-4xl xl:text-4xl text-white' style={{ marginLeft: '1rem', sm: '2rem', lg: '4rem' }}>
                        <span className='sm:text-xl lg:text-3xl xl:text-4xl text-green-500'>MNC</span>
                        <span className='text-sm lg:text-base text-slate-600'>_Shopping-Cart</span>
                    </h1>
                </Link>
                <ul className='flex gap-3'>
                    <Link to='/'>
                        <li className='hover:underline'>Home</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='hover:underline'>SignIn</li>
                    </Link>
                </ul>
            </div>
        </header>

    );
}

export default Header;
