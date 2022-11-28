import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useQuery,
} from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';

const ReportedItem = () => {
    const [deletingProduct, setDeletingProduct] = useState(null)

    const { data: reportedItems = [], isLoading, refetch } = useQuery({
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

    const handleDelete = item => {
        console.log(item)
        fetch(`http://localhost:5000/deleteReportItem/${item.productID}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {

                    refetch();
                    toast.success(`Reported Item Delete SuccessFully`)
                }
            })

        fetch(`http://localhost:5000/deleteReport/${item._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {

                    refetch();
                    toast.success(`Report Delete SuccessFully`)
                }
            })


    }

    const closeModal = () => {
        setDeletingProduct(null);
    }


    return (
        <div className='my-10'>
            <h2 className='text-3xl font-bold'>Reported Items</h2>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-10 pl-5'>


                {
                    reportedItems.map(item => <div className="card w-60 text-black border">
                        <div className="card-body">
                            <h2 className="card-title">Report on {item?.productName}</h2>
                            <p>{item?.report}</p>
                            <div className="card-actions justify-end">
                                <label onClick={() => { setDeletingProduct(item) }} htmlFor="confirmation-modal" className="btn btn-danger">Delete Item</label>
                            </div>
                        </div>
                    </div>)
                }



            </div>
            {
                deletingProduct && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} text={"are you sure to delete it? It will delete item from category page"} modalDAta={deletingProduct}></ConfirmModal>
            }
        </div>
    );
};

export default ReportedItem;