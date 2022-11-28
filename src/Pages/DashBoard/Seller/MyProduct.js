import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';
import { useQuery, } from '@tanstack/react-query'

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null)
    const [productStatus, setProductStatus] = useState('')



    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/showAddProduct?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });


    const handleAdvertisement = product => {
        console.log(product);
        fetch(`http://localhost:5000/advertise/${product?._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Advertised successfully')
                    refetch();

                }
            })
    }



    console.log(myProducts);

    const handleDelete = product => {
        console.log(product)
        fetch(`http://localhost:5000/showAddProduct/${product._id}`, {
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

    const closeModal = () => {
        setDeletingProduct(null);
    }




    return (
        <div>
            <h1>My Product</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                index
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            myProducts &&
                            myProducts.map((product, i) => <tr key={product._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product?.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {product?.name}
                                </td>
                                <td> {product?.price}</td>
                                <td>

                                    <button className="btn btn-primary btn-xs">Available</button>
                                </td>
                                <td>
                                    {
                                        product?.productStatus ?
                                            <h2 className="btn  btn-xs text-success">advertised</h2>
                                            :
                                            <button onClick={() => handleAdvertisement(product)} className="btn btn-primary btn-xs">advertise</button>
                                    }
                                </td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => { setDeletingProduct(product) }} htmlFor="confirmation-modal" className="btn btn-danger">X</label>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
            {
                deletingProduct && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingProduct}></ConfirmModal>
            }
        </div>
    );
};

export default MyProduct;