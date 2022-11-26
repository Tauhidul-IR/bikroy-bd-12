import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import OpenProductModal from './OpenProductModal/OpenProductModal';
import SingleCategory from './SingleCategory';
// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     QueryClient,
//     QueryClientProvider,
// } from '@tanstack/react-query'
// import Loading from '../../Loading/Loading';

const Category = () => {
    const [categoryService, setCategoryService] = useState([]);
    const [bookingProduct, setBookingProduct] = useState(null)


    const service = useLoaderData()



    useEffect(() => {
        fetch(`http://localhost:5000/allCategoryProducts?categoryName=${service?.category}`)
            .then(res => res.json())
            .then(data => setCategoryService(data))
    }, [service?.category])



    //implement last time
    // const { data: categoryService = [], isLoading } = useQuery({
    //     queryKey: ['categoryService', service?.category],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/allCategoryProducts?categoryName=${service?.category}`)
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    // if (isLoading) {
    //     return <Loading></Loading>
    // }


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