import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function OrderDetails() {
  const { currentUser } = useSelector((state) => state.user);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null); // 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const addressRes = await fetch(`/api/user/get-addresses/${currentUser._id}`);
        const { addresses } = await addressRes.json();
        setAddresses(addresses);
        const response = await fetch(`/api/order/getOrderDetails/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
          console.log(data);
          const matchedAddress = addresses.find(address => address._id === data.address);
          setAddress(matchedAddress);
          console.log(matchedAddress)
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
  }, [orderId]);

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
    <div className="pt-16 pb-16">
      <div className="flex items-center mb-4 gap-2">
        <Link to="/orders" className="text-blue-500 hover:underline ml-1">Back</Link>
        <h1 className="text-2xl text-center">Order Details</h1>
        <div>
          <p className='font-semibold'>Delivery Time: {calculateDeliveryTime(orderDetails.createdAt)}</p>
          <p>Created At: {new Date(orderDetails.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl">Address Details</h2>
        <p>Name: {address.firstName} {address.lastName}</p>
        <p>Email: {address.email}</p>
        <p>Contact: {address.contact}</p>
        <p>Address: {address.deliveryAddress}</p>
        <p>Landmark: {address.landmark}</p>
        <p>City: {address.city}</p>
        <p>State: {address.state}</p>
        <p>Pincode: {address.pinCode}</p>
      </div>
      <div>
        <h2 className="text-xl ml-1">Cart Details</h2>
        {orderDetails.cart.map(item => (
          <div key={item._id} className="border p-2 mb-2 flex gap-2">
            <img src={item.imageUrls} className='card-img-top w-24 h-24' alt='Default' />
            <div>
              <p className='p-1 font-semibold'>Name: {item.productName}</p>
              <div className='flex gap-2 p-1'>
                <p>size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className='flex gap-2 p-1'>
                <p>MRP: ${item.mrP}</p>
                <p>offerPrice: ${item.offerprice}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="font-bold">Total Price: ${orderDetails.totalPrice}</p>
      </div>
    </div>
  );
}

export default OrderDetails;
