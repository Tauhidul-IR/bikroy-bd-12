import React, { useState } from 'react';
import { useQuery, } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';
import Loading from '../../../Loading/Loading';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null)

    const closeModal = () => {
        setDeletingUser(null);
    }


    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://bikroy-bd-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }


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



    const handleMakeSeller = id => {
        fetch(`https://bikroy-bd-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Make Seller successfully')
                    refetch();
                }
            })
    }



    return (
        <div>
            <h2 className="text-2xl font-bold my-6">ALl User</h2>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 '>
                {
                    users.map(user => <div key={user._id} className="card w-full md:w-80 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">
                                Name : {user?.name}
                            </h2>
                            <p>Email : {user?.email}</p>
                            <div className="card-actions justify-end">
                                {
                                    user?.userType !== "Seller" && user?.role !== "admin" && <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-primary'>Make Seller</button>
                                }
                                {
                                    user?.role === 'admin' ?
                                        <div className="tooltip" data-tip="Unable to Delete">
                                            <h2 className="text-success font-bold">Admin</h2>
                                        </div>
                                        :
                                        <label onClick={() => { setDeletingUser(user) }} htmlFor="confirmation-modal" className="btn btn-xs btn-primary">Delete</label>
                                }
                            </div>
                        </div>
                    </div>

                    )

                }

            </div>




            {
                deletingUser && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingUser}></ConfirmModal>
            }
        </div>
    );
};

export default AllUsers;