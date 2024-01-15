import React from 'react';

const SupermarketListing = () => {
    return (
        <div>
            <div className="p-2 bg-slate-400 card mt-3 border border-gray-300" style={{ "width": "8rem", "maxHeight": "260px" }}>
                <img className="card-img-top" alt="..." style={{ height: "100px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">Card name</h5>
                    <p className="card-text">Card category</p>
                    <div className='d-inline h-100 fs-5'>
                        100 <span className='text-sm'>120</span>
                    </div>
                </div>
                <hr />
                <button className='bg-green-700 font-semibold  rounded-lg uppercase p-1 hover:opacity-95 disabled:opacity-80 text-white w-24'>add</button>
            </div>
        </div>

    )
}

export default SupermarketListing;
