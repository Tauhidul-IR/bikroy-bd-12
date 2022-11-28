import React from 'react';
import { Link } from 'react-router-dom';
import {
    useQuery,
} from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';

const ReportedItem = () => {

    const { data: reportedItems = [], isLoading } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/report`)
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div className='my-10'>
            <h2 className='text-3xl font-bolf'>Reported Items</h2>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-10 pl-5'>


                {
                    reportedItems.map(item => <div className="card w-60 text-black border">
                        <div className="card-body">
                            <h2 className="card-title">Report on {item?.productName}</h2>
                            <p>{item?.report}</p>
                            <div className="card-actions justify-end">
                                <button className="btn">Delete Item</button>
                            </div>
                        </div>
                    </div>)
                }



            </div>
        </div>
    );
};

export default ReportedItem;