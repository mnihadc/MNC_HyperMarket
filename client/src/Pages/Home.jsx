import React from 'react';
import SupermarketListing from '../Components/Listings';
import SwiperImage from '../Components/SwiperImage';

function Home() {
    return (
        <div className="container mx-auto my-8">
            <SwiperImage />
            <div className="mt-8 p-2">
                <h2 className="text-2xl font-semibold mb-4 ">Featured Listings</h2>
                <SupermarketListing />
            </div>
        </div>
    );
}

export default Home;
