import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

function Cart() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchCart = async () => {
      // Ensure currentUser is not null
      if (!currentUser) return;

      try {
        const cartRes = await fetch(`/api/cart/getCart/${currentUser._id}`);
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
          const total = filteredItems.reduce((acc, item) => acc + item.offerprice * item.cartQuantity, 0);
          setTotalPrice(total);
          setFilteredCartItems(filteredItems);
        } else {
          setFilteredCartItems([]);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error loading in Cart:", error);
      }
    };

    fetchCart();
  }, [currentUser]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pt-20'>
      <div className='container m-auto mt-2'>
        {filteredCartItems.length === 0 ? (
          <div className='text-2xl p-5 font-semibold text-blue text-center'>No items in cart</div>
        ) : (
          <div className={`row row-cols-1 row-cols-md-${isMobile ? '2' : '4'}`}>
            {filteredCartItems.map((item, index) => (
              <div key={item._id} className={`col ${isMobile ? 'mb-3' : ''}`} style={{ width: isMobile ? '50%' : '25%' }}>
                <div className='card p-2 bg-blue-200'>
                  <div className='flex'>
                    <img src={item.imageUrls} className='card-img-top w-24 h-24' alt='Default' />
                    <div className='p-2'>
                      <h3 className='card-title font-semibold'>{item.productName}</h3>
                      <p className='card-text'>Description: {item.description}</p>

                      <select
                        value={item.size}
                        className="form-select w-24 h-9"
                        onChange={(e) => handleChangeSize(item._id, e.target.value)}
                      >
                        {item.quantity && item.quantity.map((size, i) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                  <div className='card-body flex gap-3'>
                    <div>
                      <div className=''>
                        <p className='card-text'>
                          Quantity:
                          <span style={{ marginRight: '5px' }}></span>
                          <span className='quantity-button' style={{ marginRight: '5px', width: '20px', height: '20px', backgroundColor: '#006400', color: '#ffffff', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => decreaseQuantity(item._id)}>-</span>
                          {item.cartQuantity}
                          <span className='quantity-button' style={{ marginLeft: '5px', marginRight: '5px', width: '20px', height: '20px', backgroundColor: '#006400', color: '#ffffff', borderRadius: '50%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => increaseQuantity(item._id)}>+</span>
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='card-text text-decoration-line-through'>MRP: ₹{item.mrP}</p>
                        <p className='card-text font-semibold'>offerPrice: ₹{item.offerprice}</p>
                      </div>

                    </div>
                    <div>
                      <button type='button' className='bg-slate-500 rounded-lg text-white w-20 h-10' onClick={() => handleRemoveCartProduct(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredCartItems.length > 0 && (
          <div className='pb-16 flex justify-center gap-3'>
            <div className='p-1'>
              <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
            </div>
            <div className='p-1 '>
              <Link to={'/place-order'} >
                <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white'>Confirm Order</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
