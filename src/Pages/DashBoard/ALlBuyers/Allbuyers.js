import React, { useEffect, useState } from 'react';
import Loading from '../../../Loading/Loading';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, } from '@tanstack/react-query'

const Allbuyers = () => {
    const [deletingUser, setDeletingUser] = useState(null)

    const closeModal = () => {
        setDeletingUser(null);
    }




    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/buyers`);
            const data = await res.json();
            const allBuyersData = data.filter(buyer => (buyer.userType !== 'Seller' && buyer.role !== 'admin'));
            console.log(allBuyersData);
            return allBuyersData;
        }
    });


    const handleDeleteUser = user => {
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
                    toast.success(`Doctor ${user.name} Delete SuccessFully`)
                }
            })
    }



    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <h1>All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer?.name}</td>
                                <td>{buyer?.email}</td>

                                {/* The button to open modal */}
                                <label onClick={() => { setDeletingUser(buyer) }} htmlFor="confirmation-modal" className="btn btn-danger">X</label>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDeleteUser={handleDeleteUser} modalDAta={deletingUser}></ConfirmModal>
            }
        </div>
    );
};

export default Allbuyers;