import React from 'react';

function CreateListings() {
    return (
        <div className='p-8 pt-24'>
            <h1 className='text-center text-2xl font-bold text-slate-700'>Create Listings</h1>
            <form className='max-w-md mx-auto mt-8'>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Product Name'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='number'
                        id='offerPrice'
                        name='offerPrice'
                        placeholder='Offer Price'
                        className='shadow appearance-none border-2 border-gray-300  rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='number'
                        id='mrp'
                        name='mrp'
                        placeholder='MRP'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='number'
                        id='quantity'
                        name='quantity'
                        placeholder='Quantity'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </div>
    );
}

export default CreateListings;
