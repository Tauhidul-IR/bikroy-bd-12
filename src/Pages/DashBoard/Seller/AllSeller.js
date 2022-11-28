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
            const res = await fetch(`http://localhost:5000/sellers?userType=Seller`)
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch(`http://localhost:5000/sellers?userType=Seller`)
    //         .then(res => res.json())
    //         .then(data => setSellers(data))
    // }, [users?.userType])

    const handleDelete = user => {
        console.log(user)
        fetch(`http://localhost:5000/users/${user._id}`, {
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
            <h1>All Sellers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller?.name}</td>
                                <td>{seller?.email}</td>
                                <td>

                                    <button className='btn btn-primary'>verify</button>

                                </td>
                                {/* The button to open modal */}
                                <label onClick={() => { setDeletigSeller(seller) }} htmlFor="confirmation-modal" className="btn btn-danger btn-sm mt-2">X</label>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingSeller && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingSeller}></ConfirmModal>
            }
        </div>
    );
};

export default AllSeller;