import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

SwiperCore.use([Navigation]);

function SwiperImage() {
    const imageUrls = ['Z-image.jpg', 'slider2.jpg', 'slider3.jpg', 'slider4.jpg', 'slider5.jpg', 'slider6.jpg'];

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
                                    backgroundSize: 'cover',
                                    marginTop: '28px',
                                    height: '200px', // Default size for mobile
                                    ...(window.innerWidth >= 768 && { // Check for window width
                                        height: `${width}px`, // Larger size for computers
                                    }),
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
