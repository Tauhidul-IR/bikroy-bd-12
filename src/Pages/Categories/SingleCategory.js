import React from 'react';
import { Link } from 'react-router-dom';

const SingleCategory = ({ singleCategory, setBookingProduct }) => {
    // console.log(singleCategory)
    const { _id, sellerImg, sellerName, img, location, name, newPrice, price, usedYear, postDate } = singleCategory;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>Original Price : {price}</p>
                    <p>Resell price : {newPrice}</p>
                    <p>Used Time : {usedYear} year</p>
                    <p>Location : {location}</p>
                    <p>Post Date : {postDate}</p>
                    <div>
                        <div className="avatar indicator my-3">
                            <span className="indicator-item badge badge-success"></span>
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={sellerImg} alt='no img' />
                            </div>
                        </div>
                        <div>
                            {
                                sellerName ? <h4>Seller : {sellerName}</h4> : <p>No Name</p>
                            }
                        </div>
                    </div>
                    <div className="card-actions">
                        {/* The button to open modal */}
                        <label htmlFor="BookingProductModal" className="btn btn-primary" onClick={() => setBookingProduct(singleCategory)} >Book now</label>
                    </div>
                    <Link to={`/product/${_id}`} className="btn btn-active btn-link text-red-600">Report to admin</Link>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;