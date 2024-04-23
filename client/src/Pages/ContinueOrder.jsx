import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedAddressId } from '../redux/user/userSlice';

function ContinueOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const selectedAddressId = useSelector((state) => state.user.selectedAddressId);
    const [address, setAddress] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const addressRes = await fetch(`/api/user/get-addresses/${currentUser._id}`);
                const { addresses } = await addressRes.json();
                const selectedAddress = addresses.find(address => address._id === selectedAddressId);
                setAddress(selectedAddress);
                if (!selectedAddressId && addresses.length > 0) {
                    dispatch(setSelectedAddressId(addresses[0]._id));
                }
            } catch (error) {
                console.error("Error loading user's addresses:", error);
            }
        };

        fetchAddresses();
    }, [currentUser, dispatch, selectedAddressId]);

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
                {address && (
                    <div className='m-2'>
                        <div className='text-center bg-gray-200 border-2 border-blue-700 rounded-lg p-2'>
                            <p>{address.firstName} {address.lastName}</p>
                            <p>{address.landmark}, {address.pinCode}</p>
                            <p>{address.city}, {address.state}</p>
                            <p>{address.deliveryAddress}</p>
                            <p>{address.email} </p>
                            <div className='flex justify-content-center'>
                                <p className=''>contact: {address.contact}</p>
                                <Link to="/address">
                                    <button className='bg-slate-500 rounded-md text-sm font-medium p-1 text-white ml-2'>Change</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
                {!address && (
                    <Link to="/create-address">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Create Address</button>
                    </Link>
                )}
            </div>
            {address && (
                <div className='flex'>
                    <Link to='/payment'>
                        <button className='bg-green-700 rounded-lg font-semibold uppercase p-1 text-white ml-2'>Place Order</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ContinueOrder;
