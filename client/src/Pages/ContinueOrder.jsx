import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ContinueOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const addressRes = await fetch(`/api/user/get-addresses/${currentUser._id}`);
                const { addresses } = await addressRes.json();
                setAddress(addresses[0]);
                console.log(addresses[0]);
                console.log(addresses);
            } catch (error) {
                console.error("Error loading user's addresses:", error);
            }
        };

        fetchAddresses();
    }, [currentUser]);

    return (
        <div className='pt-16'>
            <div className='flex item-center'>
                <Link to={'/place-order'}>
                    <button className='text-3xl ml-1'>&#8592;</button>
                </Link>
                <h2 className='font-semibold ml-1 mt-2'>Continue Order</h2>
            </div>
            <div className="my-4">

                <h3 className="font-semibold ml-3">Delivery Address</h3>
                {address ? (
                    <div className='m-2'>
                        <div className='text-center bg-gray-200 border-2 border-blue-700 rounded-lg p-2'>
                            <p>{address.firstName} {address.lastName}</p>
                            <p>{address.landmark}, {address.pinCode}</p>
                            <p>{address.city}, {address.state}</p>
                            <p>{address.deliveryAddress}</p>
                            <p>{address.email} </p>
                            <div className='flex justify-content-center'>
                                <p className=''>contact: {address.contact}</p>
                                <button className='bg-slate-500 rounded-md text-sm font-medium p-1 text-white ml-2'>Change</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/create-address">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Create Address</button>
                    </Link>
                )}
            </div>
            <div className='flex'>
                <Link to='/confirm-order'>
                    <button className='bg-green-700 rounded-lg font-semibold uppercase p-1 text-white ml-2'>Confirm Order</button>
                </Link>
            </div>
        </div>
    );
}

export default ContinueOrder;
