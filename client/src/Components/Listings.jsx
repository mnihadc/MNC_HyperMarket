import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortPage from '../../shortPage';
import ListingDetails from './ListingDetails';

const SupermarketListing = ({ searchResults }) => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cart, setCart] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [isListingDetailsOpen, setIsListingDetailsOpen] = useState(false);
    const [clickedProduct, setClickedProduct] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (!currentUser) return; //
                const cartsRes = await fetch(`/api/cart/getCart/${currentUser._id}`);
                const cartData = await cartsRes.json();
                const productsInCartIds = cartData.map(item => item.productId);
                setProductsInCart(productsInCartIds);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [currentUser]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                let data = null;

                if (searchResults) {
                    data = searchResults;
                } else {
                    const res = await fetch('/api/listing/show-listings');
                    data = await res.json();
                    if (data.success === false) {
                        setError(true);
                        setLoading(false);
                        return;
                    }
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
    }, [searchResults]);

    const handleProductClick = (productId) => {
        const product = listing.find(item => item._id === productId);
        setClickedProduct(product);
        setIsListingDetailsOpen(true);
    };

    const handleAdToCart = async (productId, quantity, offerprice, mrP) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }

            const res = await fetch(`/api/cart/addtocart/${currentUser._id}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: 1,
                    size: quantity,
                    offerprice: offerprice,
                    mrP: mrP,
                }),
            });
            const data = await res.json();
            setCart(prevCart => [...prevCart, data]);
            setProductsInCart(prevProducts => [...prevProducts, productId]);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    const handleDeleteListing = async (listingId) => {
        try {
            const res = await fetch('/api/listing/adminDeleteListing', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listingId }),
            });
            const data = await res.json();
            if (data.success) {
                setListing(prevListing => prevListing.filter(listing => listing._id !== listingId));
            } else {
                console.error("Failed to delete listing:", data.message);
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };
    const renderListings = () => {
        if (!listing) {
            return null;
        }

        const rows = [];
        const isMobile = window.innerWidth < 768;
        const cardsPerRow = isMobile ? 3 : 5;
        const cardWidth = isMobile ? "calc(100% / 3 - 24px)" : "250px";
        const cardMargin = isMobile ? "0 12px" : "3px";

        for (let i = 0; i < listing.length; i += cardsPerRow) {
            const rowListings = listing.slice(i, i + cardsPerRow);
            const row = (
                <div className="flex justify-between mt-2 ml-1 mr-1 p-1" key={`row-${i / cardsPerRow}`}>
                    {rowListings.map((product) => (
                        <div key={product._id} className="card bg-slate-200" style={{ width: cardWidth, height: "270px", margin: cardMargin, }}>
                            <img
                                src={product.imageUrls}
                                className="card-img-top rounded-md"
                                alt={product.productName}
                                onClick={() => handleProductClick(product._id)}
                                style={{ height: "150px", width: "170px", margin: "auto" }}
                            />
                            <div className="text-center" style={{ height: "100px" }}>
                                <p className="text-center card-title font-semibold text-1xl" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", maxHeight: "2em", WebkitLineClamp: 2 }}>
                                    {product.productName}
                                </p>

                                <div className='text-center flex justify-center'>
                                    <p className='text-center'>{product.quantity[0]}</p>
                                    {currentUser && currentUser.isAdmin && (
                                        <button
                                            className={`btn btn-danger justify-center p-1 text-sm`}
                                            onClick={() => handleDeleteListing(product._id)}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <div className='flex justify-center gap-2'>
                                    <p className="card-title text-center" style={{ textDecoration: 'line-through' }}>
                                        ₹{product.mrp[0]}
                                    </p>
                                    <p className="card-title text-center font-semibold">
                                        ₹{product.offerPrice[0]}
                                    </p>
                                </div>
                            </div>
                            <hr />

                            <button
                                className={`btn btn-success justify-center p-1`}
                                onClick={() => handleAdToCart(product._id, product.quantity[0], product.offerPrice[0], product.mrp[0])}
                                style={{ height: "50px", backgroundColor: productsInCart.includes(product._id) ? '#00008B' : 'green' }}>
                                {productsInCart.includes(product._id) ? 'In Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))}
                </div>
            );
            rows.push(row);
        }
        return (
            <div className='pb-16'>
                {loading && (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-3xl">Loading...</p>
                    </div>
                )}
                {error && <p>Error loading listings.</p>}
                {rows}
                {isListingDetailsOpen && (
                    <ShortPage onClose={() => setIsListingDetailsOpen(false)}>
                        <ListingDetails product={clickedProduct} onClose={() => setIsListingDetailsOpen(false)} />
                    </ShortPage>
                )}
            </div>
        )
    };


    return (
        <div className='pb-16'>
            {loading && <p className='text-center font-semibold text-2xl'>Loading...</p>}
            {error && <p>Error loading listings.</p>}
            {renderListings()}
        </div>
    );
};

export default SupermarketListing;
