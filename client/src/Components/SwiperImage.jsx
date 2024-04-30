import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useMediaQuery } from 'react-responsive';

SwiperCore.use([Navigation]);

function SwiperImage() {
    const imageUrls = ['Z-image.jpg', 'slider2.jpg', 'slider3.jpg', 'slider4.jpg', 'slider5.jpg', 'slider6.jpg'];
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const swiperHeight = isMobile ? '350px' : '600px'; 

    return (
        <main>
            <div>
                <Swiper navigation>
                    {imageUrls.map(url => (
                        <SwiperSlide key={url}>
                            <div
                                className='swiper-image'
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: '100% 100%', 
                                    marginTop: '20px',
                                    height: swiperHeight,
                                    border: 0,
                                }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </main>
    );
}

export default SwiperImage;
