import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function PlaceOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [currentUser]);

    return (
        <div className='pt-16 pb-12'>
            <div className="flex items-center mb-1 p-3">
                <Link to={'/cart'}>
                    <button className='text-5xl ml-2 p-2 mb-2'>&#8592;</button>
                </Link>
                <h2 className='font-semibold ml-1 text-2xl'>Order Summary</h2>
            </div>
            {loading && <p className='text-center text-2xl font-semibold'>Loading...</p>}
            <div className={`ml-1 row row-cols-1 row-cols-md-${isMobile ? '2' : '4'}`}>
                {cartItems.map(item => (
                    <div key={item._id} className={`col ${isMobile ? 'mb-3' : ''}`} style={{ width: isMobile ? '48%' : '20%' }}>
                        <div className='card p-2 bg-blue-200'>
                            <img src={item.imageUrls} className='card-img-top w-32 h-32' alt='Default' />
                            <div className='card-body'>
                                <h3 className='card-title font-semibold'>{item.productName}</h3>
                                <p className='card-text'>
                                    <span className='font-semibold'>Size:</span> {item.size}
                                </p>
                                <p className='card-text'>
                                    <span className='font-semibold'>Quantity:</span> {item.quantity}
                                </p>
                                <p className='card-text'>
                                    <span className='font-semibold'>MRP:</span> ₹{item.mrP}
                                </p>
                                <p className='card-text'>
                                    <span className='font-semibold'>Offer Price:</span> ₹{item.offerprice}
                                </p>
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
