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
        const cartRes = await fetch('/api/cart/getCart');
        const productRes = await fetch('/api/cart/getCartProduct');
        const cartData = await cartRes.json();
        const productData = await productRes.json();

        if (cartData && cartData.length > 0 && productData && productData.length > 0) {
          const filteredItems = cartData.map(cartItem => {
            const matchingProduct = productData.find(product => product._id === cartItem.productId);
            if (matchingProduct && cartItem.userId === currentUser._id) {
              return { ...cartItem, cartQuantity: cartItem.quantity, ...matchingProduct };
            } else {
              return null;
            }
          }).filter(Boolean);
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
                <th scope='col'>Size</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCartItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.cartQuantity}</td>
                  <td>{item.quantity}</td>
                  <td>${item.mrp}</td>
                  <td><button type='button' className='btn p-0'><img src='' alt='delete' />remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div><h1 className='fs-2'>Total Price: 25531465/-</h1></div>
        <div>
          <button className='btn bg-success mt-5'>Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
