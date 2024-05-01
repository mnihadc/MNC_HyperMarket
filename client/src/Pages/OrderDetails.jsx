import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function OrderDetails() {
  const { currentUser } = useSelector((state) => state.user);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const addressRes = await fetch(`/api/user/get-addresses/${currentUser._id}`);
        const { addresses } = await addressRes.json();
        const response = await fetch(`/api/order/getOrderDetails/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
          const matchedAddress = addresses.find(address => address._id === data.address);
          setAddress(matchedAddress);
        } else {
          console.error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [currentUser._id, orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Order details not found</div>;
  }

  const calculateDeliveryTime = (createdAt) => {
    const orderTime = new Date(createdAt);
    orderTime.setHours(orderTime.getHours() + 3); // Adding 3 hours
    return orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='pt-16 pb-16'>
      <div className="flex items-center gap-2">
        <Link to={'/order'}>
          <button className='text-5xl ml-2 p-2 mb-2'>&#8592;</button>
        </Link>
        <h2 className='font-semibold ml-1 text-2xl'>Order Details</h2>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-screen-md">
          <div className="ml-10">
            <p className='font-semibold'>Delivery Time: {calculateDeliveryTime(orderDetails.createdAt)}</p>
            <p>Created At: {new Date(orderDetails.createdAt).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Address Details</h2>
            {address && (
              <>
                <p>Name: {address.firstName} {address.lastName}</p>
                <p>Email: {address.email}</p>
                <p>Contact: {address.contact}</p>
                <p>Address: {address.deliveryAddress}</p>
                <p>Landmark: {address.landmark}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Pincode: {address.pinCode}</p>
              </>
            )}
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 p-5`}>
            {orderDetails.cart.map(item => (
              <div key={item._id} className={`border p-2 ${isMobile ? 'mb-3' : ''}`}>
                <img src={item.imageUrls} className='card-img-top w-40 min-h-36 rounded-md' alt='Product' />
                <div className="p-2">
                  <p className='p-1 font-semibold'>Name: {item.productName}</p>
                  <div className='flex gap-2 p-1'>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className='flex gap-2 p-1'>
                    <p style={{ textDecoration: 'line-through' }}>MRP: ₹{item.mrP}</p>
                    <p>Offer Price: ₹{item.offerprice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-bold text-center p-2 text-2xl">Total Price: ₹{orderDetails.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
