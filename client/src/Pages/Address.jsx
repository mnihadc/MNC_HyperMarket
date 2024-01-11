import React from 'react';
import { Link } from 'react-router-dom';

const Address = () => {
    return (
        <div className='p-10 max-w-lg mx-auto border rounded-lg' style={{marginTop:'3rem'}}>
            <h1 className="text-2xl font-bold mb-4">Your <span className='text-blue-900'>Address</span></h1>

            <Link to="/create-address" className="mb-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{marginLeft:'7rem'}}>
                Create address
            </Link>

            <div className="bg-gray-200 p-8 rounded shadow-md max-w-md mx-auto text-center">
                <h3 className="text-lg font-semibold mb-2">Dummy Address</h3>
                <p className="text-gray-600">
                    123 Main St, Cityville, State, 12345<br />
                    Contact: (123) 456-7890<br />
                    Email: your.email@example.com
                </p>
            </div>
        </div>
    );
};

export default Address;
