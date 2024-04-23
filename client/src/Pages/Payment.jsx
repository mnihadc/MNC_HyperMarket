import React, { useState } from 'react';

export default function Payment() {
    const [showUPIInfo, setShowUPIInfo] = useState(false);
    const [showNetBankingInfo, setShowNetBankingInfo] = useState(false);
    const [showCashOnDeliveryInfo, setShowCashOnDeliveryInfo] = useState(false);
    const [cashOnDelivery, setCashOnDelivery] = useState(false);

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
    };

    return (
        <div className='pt-16 pb-16'>
            <div className="flex flex-col space-y-2">
                <div className="flex border border-gray-200 shadow-md p-4 rounded-lg gap-2 bg-green-50">
                    <h2 className="text-xl font-semibold mb-2">UPI</h2>
                    <button
                        className="focus:outline-none mb-2"
                        onClick={toggleUPIInfo}
                    >
                        {showUPIInfo ? '▲' : '▼'}
                    </button>
                    {showUPIInfo && (
                        <div className="mt-2">
                            <p>UPI is a real-time payment system that enables instant money transfers between bank accounts using smartphones. It's convenient, fast, and widely used in India for making payments and other banking transactions.</p>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 border border-gray-200 shadow-md p-4 rounded-lg bg-green-50">
                    <h2 className="text-xl font-semibold mb-2">Net Banking</h2>
                    <button
                        className="focus:outline-none"
                        onClick={toggleNetBankingInfo}
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
                <button className='bg-green-700 rounded-lg font-semibold uppercase p-2 text-white'>Confirm Order</button>
            </div>
        </div>
    );
}
