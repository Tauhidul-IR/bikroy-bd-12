import React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'

const Adverting = () => {




    const { data: advertisedItems = [], isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertisedProduct?productStatus=advertised`)
            const data = await res.json();
            return data;
        }
    })
    console.log(advertisedItems);
    return (
        <div>
            {
                advertisedItems.length > 0 && <>
                    <div className='my-10'>
                        <h1 className='text-3xl font-bold text-center'>Advertising Items</h1>
                        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 pl-5'>


                            {
                                advertisedItems.map(item => <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img src={item?.img} alt="Shoes" className="rounded-xl" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{item?.name}</h2>
                                    </div>
                                </div>)
                            }



                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Adverting;