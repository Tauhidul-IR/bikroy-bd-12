import React from 'react';

const SingleCategory = ({ singleCategory }) => {
    console.log(singleCategory)
    const { battery,
        categoryName,
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
                    <div className="card-actions">
                        <button className="btn btn-primary">Book now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;