import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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
    };
    fetchCart();
  }, [currentUser]);

  return (
    <div className='pt-20'>
      <h1>Cart Page</h1>
      <div className='container m-auto mt-2'>
        <div className='table-responsive'>
          <table className={`table table-hover ${isMobile ? 'table-mobile' : 'table-desktop'}`}>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.size}</td>
                  <td>${item.price}</td>
                  <td><button type='button' className='btn p-0'><img src='' alt='delete' />remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div><h1 className='fs-2'>Total Price:25531465/-</h1></div>
        <div>
          <button className='btn bg-success mt-5'>Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
