import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateAddress = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        deliveryAddress: '',
        contact: '',
        pinCode: '',
        city: '',
        state: '',
        landmark: '',
        email: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/user/create-address', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/address');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-blue-200 p-7 rounded shadow-md ">
            <h1 className='text-2xl my-7 text-center font-bold text-blue-800' >Create Address</h1>
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="deliveryAddress" className="block text-gray-700 text-sm font-bold mb-2">
                    Delivery Address
                </label>
                <input
                    type="text"
                    id="deliveryAddress"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
                        Contact
                    </label>
                    <input
                        type="text"
                        id="contact"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="pinCode" className="block text-gray-700 text-sm font-bold mb-2">
                        Pin Code
                    </label>
                    <input
                        type="text"
                        id="pinCode"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="landmark" className="block text-gray-700 text-sm font-bold mb-2">
                    Landmark
                </label>
                <input
                    type="text"
                    id="landmark"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
  
            <div className="mt-6 pb-9">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? 'Saving...' : 'Save Address'}
                </button>
            </div>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
        </form>
    );
};

export default CreateAddress;
