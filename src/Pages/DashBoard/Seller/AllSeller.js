import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    useQuery,
} from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';

const AllSeller = () => {
    // const [users, setUsers] = useState([])
    // const [sellers, setSellers] = useState([]);
    const [deletingSeller, setDeletigSeller] = useState(null)


    const closeModal = () => {
        setDeletigSeller(null);
    }


    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(`https://bikroy-bd-server.vercel.app/sellers?userType=Seller`)
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch(`https://bikroy-bd-server.vercel.app/sellers?userType=Seller`)
    //         .then(res => res.json())
    //         .then(data => setSellers(data))
    // }, [users?.userType])

    const handleDelete = user => {
        console.log(user)
        fetch(`https://bikroy-bd-server.vercel.app/users/${user._id}`, {
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
                    toast.success(`Delete SuccessFully`)
                }
            })
    }

    console.log(sellers);

    return (
        <div>
            <h1 className="text-2xl font-bold my-6">All Sellers</h1>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 '>
                {
                    sellers.map(seller => <div key={seller._id} className="card w-full md:w-80 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                Name : {seller?.name}
                            </h2>
                            <p>Email : {seller?.email}</p>
                            <div className="card-actions justify-end">
                                <label onClick={() => { setDeletigSeller(seller) }} htmlFor="confirmation-modal" className="btn btn-xs btn-primary mt-2">Delete</label>
                            </div>
                        </div>
                    </div>

                    )

                }

            </div>

            {
                deletingSeller && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingSeller}></ConfirmModal>
            }
        </div>
    );
};

export default AllSeller;