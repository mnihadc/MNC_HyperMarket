import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SupermarketListing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [cart, setCart] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const { currentUser } = useSelector((state) => state.user);

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
            } catch (error) {
                console.error("Error loading listings:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, []);

    const handleAdToCart = async (productId, quantity) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
            }
            const res = await fetch(`/api/cart/addtocart/${currentUser._id}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: 1,
                    size: quantity,

                }),
            })
            const data = await res.json();
            setCart(prevCart => [...prevCart, data]);
        } catch (error) {
            console.error("Error adding to cart:", error)

        }
    }

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
                        <div key={product._id} className="card bg-slate-200" style={{ width: "30%", height: "220px" }}>
                            <img src={product.imageUrls} className="card-img-top" alt={product.productName} style={{ height: "105px", objectFit: "contain" }} />
                            <div className="p-1" style={{ height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p className="card-title font-semibold text-1xl" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", maxHeight: "4em" }}>
                                    {product.productName}
                                </p>
                                <p className="card-title" >
                                    {product.quantity[0]}
                                </p>
                            </div>

                            <hr />
                            <button
                                className={`btn btn-success justify-center p-1`}
                                onClick={() => handleAdToCart(product._id, product.quantity[0])}
                                style={{ height: "40px", backgroundColor: productsInCart.includes(product._id) ? 'blue' : 'green' }}>
                                {productsInCart.includes(product._id) ? 'In Cart' : 'Add to Cart'}
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
