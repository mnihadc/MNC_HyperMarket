import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
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
          const total = filteredItems.reduce((acc, item) => acc + item.offerPrice, 0);
          setTotalPrice(total);
        } else {
          setFilteredCartItems([]);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error loading in Cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [currentUser]);


  const increaseQuantity = (itemId) => {
    const updatedCartItems = filteredCartItems.map(item => {
      if (item._id === itemId) {
        const newQuantity = item.cartQuantity + 1;
        updateCartItemQuantity(currentUser._id, itemId, newQuantity);
        return { ...item, cartQuantity: newQuantity };
      }
      return item;
    });
    setFilteredCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = filteredCartItems.map(item => {
      if (item._id === itemId && item.cartQuantity > 1) {
        const newQuantity = item.cartQuantity - 1;
        updateCartItemQuantity(currentUser._id, itemId, newQuantity);
        return { ...item, cartQuantity: newQuantity };
      }
      return item;
    });
    setFilteredCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = async (userId, itemId, newQuantity) => {
    try {
      const response = await fetch(`/api/cart/updateCartQuantity/${userId}/${itemId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (response.ok) {
        // Quantity updated successfully
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pt-20'>
      <div className='container m-auto mt-2'>
        {filteredCartItems.length === 0 ? (
          <div className='text-2xl p-5 font-semibold text-blue'>No items in cart</div>
        ) : (
          <div className='row row-cols-1 row-cols-md-3'>
            {filteredCartItems.map((item) => (
              <div key={item._id} className={`col p-1 ${isMobile ? 'mb-3' : ''}`}>
                <div className='card p-2 bg-slate-100'>
                  <div className='flex'>
                    <img src={item.imageUrls} className='card-img-top w-24 h-24' alt='Default' />
                    <div className='p-2'>
                      <h3 className='card-title font-semibold'>{item.productName}</h3>
                      <p className='card-text'>Description: {item.description}</p>
                      <select
                        value={item.selectedSize}
                        className="form-select w-24 h-8"
                      >
                        {item.quantity.map((size) => {
                          return <option key={size} value={size}>{size}</option>;

                        })}

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
                        <p className='card-text text-decoration-line-through'>MRP: ₹{item.mrp}</p>
                        <p className='card-text font-semibold'>MRP: ₹{item.offerPrice}</p>
                      </div>
                    </div>
                    <div>
                      <button type='button' className='bg-slate-500 rounded-lg text-white w-20 h-10'>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='pb-16 flex justify-center gap-3'>
          <div className='p-1'>
            <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
          </div>
          <div className='p-1 '>
            <button className='bg-green-700 rounded-lg font-semibold uppercase p-3 text-white'>CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
