import React, { useState, useEffect } from 'react';

const SupermarketListing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/listing/show-listings');
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchListing();
    }, []);

    const renderListings = () => {
        if (!listing) {
            return null;
        }

        const rows = [];
        for (let i = 0; i < listing.length; i += 3) {
            const rowListings = listing.slice(i, i + 3);
            const row = (
                <div className="flex justify-between mt-2" key={`row-${i / 3}`}>
                    {rowListings.map((product) => (
                        <div key={product.id} className="card bg-slate-200" style={{ width: "30%", height: "220px" }}>
                            <img src={product.imageUrls} className="card-img-top" alt={product.productName} style={{ height: "105px", objectFit: "contain" }} />
                            <div className="p-1" style={{ height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p className="card-title font-semibold text-1xl" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", maxHeight: "4em" }}>
                                    {product.productName}
                                </p>
                            </div>
                            <hr />
                            <button className={`btn btn-success justify-center p-1`} style={{ height: "40px" }}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            );
            rows.push(row);
        }
        return rows;
    };

    return (
        <div className='pb-16'>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading listings.</p>}
            {renderListings()}
        </div>
    );
};

export default SupermarketListing;
