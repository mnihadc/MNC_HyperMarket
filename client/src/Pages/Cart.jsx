import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  const [filteredCartItems, setFilteredCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart/getCart');
        const data = await res.json();
        if (data && data.length > 0) {
          const filteredItems = data.filter(item => item.userId === currentUser._id);
          setFilteredCartItems(filteredItems);
        } else {
          setFilteredCartItems([]);
        }
      } catch (error) {
        console.error("Error loading in Cart:", error);
      }
    }
    fetchCart();
  }, [currentUser]);

  return (
    <div>
      <h1>Cart Page</h1>
      {filteredCartItems.length > 0 ? (
        <ul>
          {filteredCartItems.map(item => (
            <li key={item._id}>
              <div className='pt-10'>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty</p>
      )
      }
    </div >
  );
}

export default Cart;
