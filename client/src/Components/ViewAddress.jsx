import React from 'react';

const ViewAddress = ({ address, onClose }) => {
    console.log(address);
    const createdDate = new Date(address.createdAt).toLocaleDateString();
    const updatedDate = new Date(address.updatedAt).toLocaleDateString();
    return (
        <div>
            <button className='btn bg-danger fs-4 absolute top-10 right-10' onClick={onClose}> X </button>
            <div className="text-white flex flex-col items-center h-full p-5 mt-16">
                <h1 className="text-center font-semibold text-2xl p-1">{address.firstName} {address.lastName}'s Address</h1>
                <p className="text-center p-2">
                    {address.deliveryAddress}
                </p>
                <p className='p-1'>
                    {address.city}, {address.state}, {address.pinCode}
                </p>
                <p className='p-1'> Landmark: {address.landmark}</p>
                <p className='p-1'>Contact: {address.contact}<br /></p>
                <p className='p-1'>Email: {address.email}</p>
                <p className='p-1'>
                    Created Date: {createdDate} <br />
                    Updated Date: {updatedDate}
                </p>
            </div>
        </div>
    );
};

export default ViewAddress;
