import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import OpenProductModal from './OpenProductModal/OpenProductModal';
import SingleCategory from './SingleCategory';

const Category = () => {
    const [categoryService, setCategoryService] = useState([]);
    const [bookingProduct, setBookingProduct] = useState(null)
    const service = useLoaderData()
    // console.log(service);

    console.log(categoryService)
    useEffect(() => {
        fetch(`http://localhost:5000/allCategoryProducts?categoryName=${service?.category}`)
            .then(res => res.json())
            .then(data => setCategoryService(data))
    }, [service?.category])




    return (
        <div>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 pl-5'>
                {
                    categoryService.map(singleCategory => <SingleCategory key={singleCategory._id} singleCategory={singleCategory} setBookingProduct={setBookingProduct}></SingleCategory>)

                }

            </div>
            {
                bookingProduct && <OpenProductModal bookingProduct={bookingProduct}></OpenProductModal>
            }

        </div>
    );
};

export default Category;