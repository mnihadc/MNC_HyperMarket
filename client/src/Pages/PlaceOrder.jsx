import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
                        console.log("Offer Price:", item.offerprice);
                        console.log("Cart Quantity:", item.quantity);
                        return acc + (item.offerprice * item.quantity);
                    }, 0);
                    setTotalPrice(total);
                    console.log("Total Price:", total);
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
        <div className='pt-20'>
            <div className="flex justify-between items-center mb-4">
        
            <button>&#8592;</button>
                <h2 className='font-semibold text-center'>Order Summary</h2>
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
                    <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white'>Confirm Order</button>
                </Link>
            </div>
        </div>
    );
}

export default PlaceOrder;
