import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function PlaceOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartRes = await fetch(`/api/cart/getCart/${currentUser._id}`);
                const productRes = await fetch('/api/cart/getCartProduct');
                const cartData = await cartRes.json();
                const productData = await productRes.json();

                if (cartData && cartData.length > 0 && productData && productData.length > 0) {
                    const updatedCartItems = cartData.map(cartItem => {
                        const matchingProduct = productData.find(product => product._id === cartItem.productId);
                        if (matchingProduct && cartItem.userId === currentUser._id) {
                            return { ...cartItem, productName: matchingProduct.productName, imageUrls: matchingProduct.imageUrls };
                        } else {
                            return null;
                        }
                    }).filter(Boolean);

                    setCartItems(updatedCartItems);
                    const total = updatedCartItems.reduce((acc, item) => {
                        return acc + (item.offerprice * item.quantity);
                    }, 0);
                    setTotalPrice(total);
                } else {
                    setCartItems([]);
                    setTotalPrice(0);
                }
            } catch (error) {
                console.error("Error loading cart items:", error);
            }
        };

        fetchCart();
    }, [currentUser]);

    return (
        <div className='pt-16'>
            <div className="flex items-center mb-1 p-3">
                <Link to={'/cart'}>
                    <button className='text-5xl ml-2 p-2 mb-2'>&#8592;</button>
                </Link>
                <h2 className='font-semibold ml-1 text-2xl'>Order Summary</h2>
            </div>

            <div className={`ml-1 row row-cols-1 row-cols-md-${isMobile ? '2' : '4'}`}>
                {cartItems.map(item => (
                    <div key={item._id} className={`col ${isMobile ? 'mb-3' : ''}`} style={{ width: isMobile ? '48%' : '20%' }}>
                        <div className='card p-2 bg-blue-200'>
                            <div className='flex'>
                                <img src={item.imageUrls} className='card-img-top w-32 h-32' alt='Default' />
                                <div className='p-2 ml-5'>
                                    <h3 className='p-1 card-title font-semibold'>{item.productName}</h3>
                                    <p className='card-text p-1'>
                                        Quantity:
                                        <span style={{ marginRight: '5px' }}></span>
                                        {item.quantity}
                                    </p>
                                    <p className='card-text p-1'>
                                        Size:
                                        <span style={{ marginRight: '5px' }}></span>
                                        {item.size}
                                    </p>
                                </div>
                            </div>
                            <div className='card-body flex justify-center gap-3'>
                                <div>
                                    <div className='flex gap-2'>
                                        <p className='card-text text-decoration-line-through'>MRP: ₹{item.mrP}</p>
                                        <p className='card-text font-semibold'>offerPrice: ₹{item.offerprice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center p-2'>
                <p className='font-semibold text-lg p-2'>Total Items in Cart: <span className='text-2xl'>{cartItems.length}</span></p>
                <p className='font-semibold text-lg p-2'>Total Price: <span className='text-2xl'>₹{totalPrice}</span></p>
                <Link to={'/continue-order'} >
                    <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white'>Continue Order</button>
                </Link>
            </div>
        </div>
    );
}

export default PlaceOrder;
