import React, { useState } from 'react';
import { useQuery, } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null)

    const closeModal = () => {
        setDeletingUser(null);
    }


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });



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



    const handleMakeSeller = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
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
            <h2 className="text-2xl">ALl User</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {
                                        user?.userType !== "Seller" && user?.role !== "admin" && <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-primary'>Make Seller</button>
                                    }
                                </td>
                                <td>

                                    {/* The button to open modal */}
                                    {
                                        user?.role === 'admin' ?
                                            <div className="tooltip" data-tip="Unable to Delete">
                                                <h2 className="text-success font-bold">Admin</h2>
                                            </div>
                                            :
                                            <label onClick={() => { setDeletingUser(user) }} htmlFor="confirmation-modal" className="btn btn-danger">X</label>
                                    }
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingUser && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingUser}></ConfirmModal>
            }
        </div>
    );
};

export default AllUsers;