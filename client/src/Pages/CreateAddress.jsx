import React from 'react';

const CreateAddress = () => {
    return (
        <form className="max-w-md mx-auto mt-8 bg-blue-200 p-7 rounded shadow-md ">
            <h1 className='text-2xl my-7 text-center font-bold text-blue-800' >Create Address</h1>
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mt-6 pb-9">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Save Address
                </button>
            </div>
        </form>
    );
};

export default CreateAddress;
