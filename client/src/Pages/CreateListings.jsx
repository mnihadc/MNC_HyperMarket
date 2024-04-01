import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from 'react-router-dom';

function CreateListings() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imageUrls: [],
        offers: [{ offerPrice: '', mrp: '' }],
        description: '',
        quantity: [],
        productName: '',
        productCategory: '',
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls),
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress monitoring
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e, index, type) => {
        const { id, value } = e.target;
        if (id.startsWith('quantity')) {
            const updatedQuantity = [...formData.quantity];
            updatedQuantity[index] = value;
            const updatedOffers = [...formData.offers];
            
            updatedOffers[index].offerPrice = value;
            updatedOffers[index].mrp = value;
            setFormData({
                ...formData,
                quantity: updatedQuantity,
                offers: updatedOffers,
            });
        } else if (type === 'offerPrice' || type === 'mrp') {
            const updatedOffers = [...formData.offers];
            updatedOffers[index][type] = value;
            setFormData({
                ...formData,
                offers: updatedOffers,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };


    const handleAddOfferField = () => {
        setFormData({
            ...formData,
            offers: [...formData.offers, { offerPrice: '', mrp: '' }],
        });
    };

    const handleAddQuantityField = () => {
        if (formData.quantity.length < 10) {
            setFormData({
                ...formData,
                quantity: [...formData.quantity, ''],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
            if (formData.quantity.length === 0) return setError('You must add at least one quantity');
            if (!formData.productName.trim() || !formData.productCategory.trim() || !formData.description.trim()) {
                return setError('Product name, category, and description are required');
            }

            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                }),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            navigate('/');
            setLoading(false);
        } catch (error) {
            console.error('Submit Error:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='p-8 pt-24'>
            <h1 className='text-center text-2xl font-bold text-slate-700'>Create Listings</h1>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8'>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Product Name'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='productCategory'
                        name='productCategory'
                        placeholder='Product Category'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-4'>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Short description'
                        className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-4 pb-2">
                    <p className='font-semibold'>Quantity:</p>
                    {formData.quantity.map((quantityItem, index) => (
                        <input
                            key={index}
                            type='text'
                            id={`quantity-${index}`}
                            name={`quantity-${index}`}
                            placeholder='Enter quantity'
                            value={quantityItem}
                            className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                            onChange={(e) => handleChange(e, index, 'quantity')}
                        />
                    ))}
                    {formData.quantity.length < 10 && (
                        <button
                            type='button'
                            onClick={handleAddQuantityField}
                            className='p-3 pb-3 bg-gray-200 text-gray-700 rounded-lg uppercase hover:opacity-95'
                        >
                            Add Quantity
                        </button>
                    )}
                </div>
                {formData.offers.map((offer, index) => (
                    <div key={index} className='mb-4'>
                        <input
                            type='number'
                            id={`offerPrice-${index}`}
                            name={`offerPrice-${index}`}
                            placeholder='Offer Price'
                            className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                            value={offer.offerPrice}
                            onChange={(e) => handleChange(e, index, 'offerPrice')}
                        />
                        <input
                            type='number'
                            id={`mrp-${index}`}
                            name={`mrp-${index}`}
                            placeholder='MRP'
                            className='shadow appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                            value={offer.mrp}
                            onChange={(e) => handleChange(e, index, 'mrp')}
                        />
                    </div>
                ))}
                <button type='button' onClick={handleAddOfferField} className='p-3 bg-gray-200 text-gray-700 rounded-lg uppercase hover:opacity-95'>Add Offer Price and MRP</button>
                <div className="flex gap-4">
                    <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' multiple />
                    <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="Listing Image" className='w-20 h-20 object-contain rounded-lg' />
                            <button onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-95'>Delete</button>
                        </div>
                    ))
                }
                <button disabled={loading || uploading} className='p-3 pb-3 mb-14 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Creating...' : 'Create Listing'}</button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </form>
        </div>
    );
}

export default CreateListings;
