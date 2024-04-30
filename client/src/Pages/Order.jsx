import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Order() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const addressRes = await fetch(`/api/user/get-addresses/${currentUser._id}`);
        const { addresses } = await addressRes.json();
        setAddresses(addresses);
        const response = await fetch(`/api/order/getOrders/${currentUser._id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateDeliveryTime = (createdAt) => {
    const orderTime = new Date(createdAt);
    orderTime.setHours(orderTime.getHours() + 3); // Adding 3 hours
    return orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="pt-16">
      <h1 className="p-2 text-2xl font-bold">Orders</h1>
      <div className="p-3 ml-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="border border-gray-200 rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Delivery Time: {calculateDeliveryTime(order.createdAt)}</h4>
                <Link to={`/order/${order._id}`} className="bg-slate-500 rounded-md font-medium text-xs p-1 text-white">View</Link>
              </div>
              <p className="text-sm">Order Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm">Number of Products: {order.cart.length}</p>
              <div className="flex mt-2 gap-4">
                <p className="text-lg font-semibold">Total Price: ${order.totalPrice}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
