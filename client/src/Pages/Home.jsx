import React, { useState } from 'react';
import SupermarketListing from '../Components/Listings';
import SwiperImage from '../Components/SwiperImage';

function Home() {
    const [isListingDetailsOpen, setIsListingDetailsOpen] = useState(false);
    const handleProductClick = () => {
        setIsListingDetailsOpen(true);
    };
    return (
        <div className="mx-auto">
            <SwiperImage />
            <div className="mt-1 p-3">
                <h2 className="text-2xl font-semibold">Today Offer's</h2>
                <SupermarketListing />
            </div>
            {isListingDetailsOpen && (
                <ShortPage onClose={() => setIsListingDetailsOpen(false)}>
                    <ListingDetails />
                </ShortPage>
            )}
        </div>
    );
}

export default Home;
