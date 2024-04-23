import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function PlaceOrder() {
    const { currentUser } = useSelector((state) => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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
                    console.log(updatedCartItems);


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
            <div className="flex items-center mb-4">
                <Link to={'/cart'}>
                    <button className='text-3xl ml-1'>&#8592;</button>
                </Link>
                <h2 className='font-semibold ml-1'>Order Summary</h2>
            </div>
            <div>
                {cartItems.map(item => (
                    <div key={item._id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '1rem' }}>
                        <img src={item.imageUrls} alt={item.productName} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '1rem' }} />
                        <div className='flex-col'>
                            <p className='font-semibold'>{item.productName}</p>
                            <p>Size: {item.size}</p>
                            <p className=''>Quantity: {item.quantity}</p>
                        </div>
                        <div className='pl-2'>
                            <p>MRP: {item.mrP}</p>
                            <p>OfferPrice: {item.offerprice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex'>
                <p>Total Price: ₹{totalPrice}</p>
                <Link to={'/continue-order'} >
                    <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white'>Continue Order</button>
                </Link>
            </div>
        </div>
    );
}

export default PlaceOrder;
