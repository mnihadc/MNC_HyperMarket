import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Payment() {
    const { currentUser } = useSelector((state) => state.user);
    const selectedAddressId = useSelector((state) => state.user.selectedAddressId);
    const [showUPIInfo, setShowUPIInfo] = useState(false);
    const [showNetBankingInfo, setShowNetBankingInfo] = useState(false);
    const [showCashOnDeliveryInfo, setShowCashOnDeliveryInfo] = useState(false);
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const alertStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'green',
        color: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };
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

                    const total = updatedCartItems && updatedCartItems.length > 0 ? updatedCartItems.reduce((acc, item) => {
                        return acc + (item.offerprice * item.quantity);
                    }, 0) : 0;

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

    const toggleUPIInfo = () => {
        setShowUPIInfo(!showUPIInfo);
        setShowNetBankingInfo(false);
        setShowCashOnDeliveryInfo(false);
    };

    const toggleNetBankingInfo = () => {
        setShowNetBankingInfo(!showNetBankingInfo);
        setShowUPIInfo(false);
        setShowCashOnDeliveryInfo(false);
    };

    const toggleCashOnDeliveryInfo = () => {
        setShowCashOnDeliveryInfo(!showCashOnDeliveryInfo);
        setShowUPIInfo(false);
        setShowNetBankingInfo(false);
    };

    const handleCashOnDeliveryChange = () => {
        setCashOnDelivery(!cashOnDelivery);

        if (!cashOnDelivery) {
            setShowUPIInfo(false);
            setShowNetBankingInfo(false);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/order/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: currentUser._id,
                    cart: cartItems,
                    addressId: selectedAddressId,
                    totalPrice: totalPrice,
                    paymentMethod: cashOnDelivery ? 'Cash on Delivery' : 'Online Payment'
                }),
            });

            if (response.ok) {
                setAlertMessage('Your order is placed');
                setTimeout(() => {
                    setAlertMessage('');
                    // Navigate to order page
                    // Replace the code below with your actual navigation logic
                    window.location.href = '/order';
                }, 3000);
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='pt-16 pb-16'>
            {loading && <div className="overlay">Loading...</div>}
            {alertMessage && <div style={alertStyle}>{alertMessage}</div>}
            <div className="flex flex-col space-y-2">
                <div className={`flex border border-gray-200 shadow-md p-4 rounded-lg gap-2 bg-green-50 ${cashOnDelivery ? 'opacity-50' : ''}`}>
                    <h2 className="text-xl font-semibold mb-2">UPI</h2>
                    <button
                        className="focus:outline-none mb-2"
                        onClick={toggleUPIInfo}
                        disabled={cashOnDelivery}
                    >
                        {showUPIInfo ? '▲' : '▼'}
                    </button>
                    {showUPIInfo && (
                        <div className="mt-2">
                            <p>UPI is a real-time payment system that enables instant money transfers between bank accounts using smartphones. It's convenient, fast, and widely used in India for making payments and other banking transactions.</p>
                        </div>
                    )}
                </div>
                <div className={`flex gap-2 border border-gray-200 shadow-md p-4 rounded-lg bg-green-50 ${cashOnDelivery ? 'opacity-50' : ''}`}>
                    <h2 className="text-xl font-semibold mb-2">Net Banking</h2>
                    <button
                        className="focus:outline-none"
                        onClick={toggleNetBankingInfo}
                        disabled={cashOnDelivery}
                    >
                        {showNetBankingInfo ? '▲' : '▼'}
                    </button>
                    {showNetBankingInfo && (
                        <div className="mt-2">
                            <p>Razorpay is India's leading payment gateway, offering secure online payment solutions for businesses. With Razorpay, businesses can accept payments via various channels, ensuring a smooth checkout experience for customers.</p>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 border border-gray-200 shadow-md p-4 rounded-lg bg-green-50">
                    <h2 className="text-xl font-semibold mb-2">
                        Cash on Delivery
                    </h2>
                    <button
                        className="focus:outline-none"
                        onClick={toggleCashOnDeliveryInfo}
                    >
                        {showCashOnDeliveryInfo ? '▲' : '▼'}
                    </button>
                    {showCashOnDeliveryInfo && (
                        <div className="flex items-center pr-8">
                            <label className="">Cash on Delivery</label>
                            <input
                                type="checkbox"
                                checked={cashOnDelivery}
                                onChange={handleCashOnDeliveryChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white' onClick={handlePlaceOrder}>
                    Confirm Order
                </button>
            </div>
        </div >
    );
}
