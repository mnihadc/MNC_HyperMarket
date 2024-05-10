import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function ListingDetails({ product, onClose }) {
    const { productName, productCategory, description, imageUrls, mrp, offerPrice, quantity } = product;

    return (
        <div className='text-white'>
            <button className='btn bg-danger fs-4' style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }} onClick={onClose}> X </button>
            <div className='p-6'>
                <Swiper navigation>
                    {imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className='swiper-image'
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: 'contain',
                                    height: '220px', 
                                    width: '100%', 
                                }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="text-center font-semibold text-2xl mt-4">{productName}</h2>
                <p className='text-center'>{description}</p>
                <p className='text-center mb-4'>{productCategory}</p>
                
                <div className="flex justify-center gap-4 mt-4">
                    <div>
                        <h3 className='text-gray-400'>MRP:</h3>
                        {mrp.map((price, index) => (
                            <p key={index} className='text-gray-400'>{quantity[index]} - ₹{price}</p>
                        ))}
                    </div>
                    <div>
                        <h3 className='text-green-600'>Offer Price:</h3>
                        {offerPrice.map((price, index) => (
                            <p key={index} className='text-green-500'>{quantity[index]} - ₹{price}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingDetails;
