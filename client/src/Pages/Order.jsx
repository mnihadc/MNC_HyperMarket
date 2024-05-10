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
        console.log("Fetching orders...");
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

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/order/deleteOrder/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        console.error('Error deleting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting order:', error.message);
    }
  };

  return (
    <div className="pt-16">
      <h1 className="p-2 mt-3 ml-3 text-2xl font-bold">Orders</h1>
      <div className="p-3 ml-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <div className='text-center font-semibold text-2xl'>Loading...</div>
        ) : (
          orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="border border-gray-200 rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Delivery Time: {calculateDeliveryTime(order.createdAt)}</h4>
                  <Link to={`/order/${order._id}`} className="bg-slate-500 rounded-md font-medium text-xs p-1 text-white">View</Link>
                </div>
                <p className="text-sm">Order Created At: {new Date(order.createdAt).toLocaleString()}</p>
                <p className="text-sm">Number of Products: {order.cart.length}</p>
                <div className="flex justify-between mt-2 gap-4">
                  <p className="text-lg font-semibold">Total Price: ₹{order.totalPrice}/-</p>
                  <div>
                    <button onClick={() => handleDeleteOrder(order._id)} className='text-white bg-red-700 rounded-md p-1 text-xs font-medium '>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-2xl">No orders found</div>
          )
        )}
      </div>
    </div>
  );
}

export default Order;
