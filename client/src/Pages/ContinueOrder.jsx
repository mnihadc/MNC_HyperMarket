import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedAddressId } from '../redux/user/userSlice';

function ContinueOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const selectedAddressId = useSelector((state) => state.user.selectedAddressId);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [currentUser, dispatch, selectedAddressId]);

    return (
        <div className='pt-16'>

            <div className='flex item-center p-2 ml-1'>
                <Link to={'/place-order'}>
                    <button className='text-5xl'>&#8592;</button>
                </Link>
                <h2 className='font-semibold mt-3 ml-2 text-2xl'>Continue Order</h2>
            </div>
            {loading && <p className='text-center text-xl font-semibold'>Loading...</p>}
            <div className="my-4 flex justify-center">
                <div className='text-center bg-gray-200 border-2 border-blue-700 rounded-lg p-4' style={{ width: '70%', padding: '20px' }}>
                    {address && (
                        <div className='gap-2'>
                            <h3 className="font-semibold p-2">Delivery Address</h3>
                            <p className='p-1'>{address.firstName} {address.lastName}</p>
                            <p className='p-1'>{address.landmark}, {address.pinCode}</p>
                            <p className='p-1'>{address.city}, {address.state}</p>
                            <p className='font-semibold p-1'>{address.deliveryAddress}</p>
                            <p className='p-1'>{address.email} </p>
                            <div className='flex justify-content-center p-1'>
                                <p className=''>contact: {address.contact}</p>
                                <Link to="/address">
                                    <button className='bg-slate-500 rounded-md text-sm font-medium p-2 text-white ml-5'>Change</button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {!address && (
                        <Link to="/address">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Create Address</button>
                        </Link>
                    )}
                </div>
            </div>
            {address && (
                <div className='' style={{ maxWidth: '50%', marginLeft: 'auto' }}>
                    <Link to='/payment'>
                        <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white ml-20'>Place Order</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ContinueOrder;
