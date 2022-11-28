import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import OpenProductModal from './OpenProductModal/OpenProductModal';
import SingleCategory from './SingleCategory';

import {
    useQuery,
} from '@tanstack/react-query'

const Category = () => {
    const [bookingProduct, setBookingProduct] = useState(null)


    const service = useLoaderData()


    const { data: categoryService = [], isLoading } = useQuery({
        queryKey: ['categoryService', service?.category],
        queryFn: async () => {
            const res = await fetch(`https://bikroy-bd-server.vercel.app/allCategoryProducts?categoryName=${service?.category}`)
            const data = await res.json();
            return data;
        }
    })



    console.log(categoryService);

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 pl-5'>
                {
                    categoryService.map(singleCategory => <SingleCategory key={singleCategory._id} singleCategory={singleCategory} setBookingProduct={setBookingProduct}></SingleCategory>)

                }

            </div>
            {
                bookingProduct && <OpenProductModal bookingProduct={bookingProduct} setBookingProduct={setBookingProduct}></OpenProductModal>
            }

        </div>
    );
};

export default Category;