import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedAddressId } from '../redux/user/userSlice';
import ViewAddressPage from '../Components/ViewAddress';
import ShortPage from '../../shortPage';

const Address = () => {
    const { currentUser } = useSelector((state) => state.user);
    const selectedAddressId = useSelector((state) => state.user.selectedAddressId);
    const [userAddress, setUserAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewAddress, setViewAddress] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const res = await fetch(`/api/user/get-addresses/${currentUser._id}`);
                const data = await res.json();

                if (data.success) {
                    setUserAddress(data.addresses);
                } else {
                    console.error('Failed to fetch user address:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user address:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAddress();
    }, []);

    useEffect(() => {
        if (userAddress && userAddress.length > 0 && !selectedAddressId) {
            dispatch(setSelectedAddressId(userAddress[0]._id));
        }
    }, [userAddress, selectedAddressId, dispatch]);

    const handleViewAddress = (addressId) => {
        const address = userAddress.find(addr => addr._id === addressId);
        setViewAddress(address);
    };

    const handleCloseViewAddress = () => {
        setViewAddress(null);
    };

    return (
        <div className='p-16'>
            <div className='p-3 bg-slate-200 max-w-lg mx-auto border rounded-lg' style={{ marginTop: '3rem' }}>
                <h1 className="text-2xl font-bold mb-4">Your <span className='text-blue-900'>Address</span></h1>

                <Link to="/create-address" className="mb-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ marginLeft: '7rem' }}>
                    Create address
                </Link>

                {loading ? (
                    <p>Loading...</p>
                ) : userAddress && userAddress.length > 0 ? (
                    userAddress.map((address) => (
                        <div
                            key={address._id}
                            className={`p-8 rounded shadow-md max-w-md mx-auto text-center mb-4 ${selectedAddressId === address._id ? 'border-2 border-green-500' : ''}`}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{address.firstName}'s Address</h3>
                                <p className="text-gray-600">
                                    {address.deliveryAddress}, {address.city}, {address.state}, {address.pinCode}<br />
                                    Contact: {address.contact}<br />
                                    Email: {address.email}
                                </p>
                            </div>
                            <button onClick={() => handleViewAddress(address._id)} className="bg-slate-500 text-white p-2 rounded-md text-sm">View</button>
                        </div>
                    ))
                ) : (
                    <p>No addresses found.</p>
                )}
            </div>

            {viewAddress && (
                <ShortPage onClose={handleCloseViewAddress}>
                    <ViewAddressPage address={viewAddress} onClose={handleCloseViewAddress} />
                </ShortPage>
            )}
        </div>
    );
};

export default Address;
