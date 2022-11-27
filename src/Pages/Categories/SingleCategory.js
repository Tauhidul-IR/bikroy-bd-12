import React from 'react';

const SingleCategory = ({ singleCategory, setBookingProduct }) => {
    console.log(singleCategory)
    const { battery,
        categoryName,
        sellerImg,
        color,
        img,
        location,
        name,
        newPrice,
        price,
        ram,
        size, usedYear } = singleCategory;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>Old Price : {price}</p>
                    <p>Current price : {newPrice}</p>
                    <p>Used Time : {usedYear} year</p>
                    <p>Location : {location}</p>
                    <div className="avatar indicator">
                        <span className="indicator-item badge badge-success"></span>
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={sellerImg} alt='no img' />
                        </div>
                    </div>
                    <div className="card-actions">
                        {/* The button to open modal */}
                        <label htmlFor="BookingProductModal" className="btn btn-primary" onClick={() => setBookingProduct(singleCategory)} >Book now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;