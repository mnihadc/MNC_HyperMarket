import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function ListingDetails({ product, onClose }) {
    const { productName, productCategory, description, imageUrls, mrp, offerPrice, quantity } = product;

    return (
        <div className='text-white'>
            <button className='btn bg-danger fs-4' style={{ position: 'absolute', top: 10, right: 10 }} onClick={onClose}> X </button>
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
                                    width:'200',
                                }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="text-center font-semibold text-2xl ">{productName}</h2>
                <p className='text-center pt-2'>{description}</p>
                <p className='text-center'>{productCategory}</p>
                <div className="flex justify-center gap-4 mt-6">
                    <div>
                        <h3 className='' style={{ textDecoration: 'line-through', textDecorationColor: 'black' }}>MRP:</h3>
                        {mrp.map((price, index) => (
                            <p className='' style={{ textDecoration: 'line-through', textDecorationColor: 'black' }} key={index}>{quantity[index]} - ₹{price}</p>
                        ))}
                    </div>
                    <div>
                        <h3>Offer Price:</h3>
                        {offerPrice.map((price, index) => (
                            <p key={index}>{quantity[index]} - ₹{price}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingDetails;
