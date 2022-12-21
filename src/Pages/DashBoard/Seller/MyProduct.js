import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../../Shared/ComfirmModal/ConfirmModal';
import { useQuery, } from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null)
    const [productStatus, setProductStatus] = useState('')



    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://bikroy-bd-server.vercel.app/showAddProduct?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleAdvertisement = product => {
        console.log(product);
        fetch(`https://bikroy-bd-server.vercel.app/advertise/${product?._id}`, {
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
        fetch(`https://bikroy-bd-server.vercel.app/showAddProduct/${product._id}`, {
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
            <h1 className='text-4xl font-bold my-7'>My Product</h1>
            {/* <div className="overflow-x-auto w-full">
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
                                    
                                    <label onClick={() => { setDeletingProduct(product) }} htmlFor="confirmation-modal" className="btn btn-danger">X</label>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div> */}

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 '>
                {
                    myProducts &&
                    myProducts.map(product => <div key={product._id} className="card w-full md:w-80 bg-base-100 shadow-xl">
                        <figure><img className='w-28 pt-7' src={product?.img} alt="Avatar Tailwind CSS Component" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Name : {product?.name}
                            </h2>
                            <p>Email : {product?.email}</p>
                            <div className="card-actions justify-center">
                                <label htmlFor="confirmation-modal" className="btn btn-xs btn-primary">Available</label>
                                {
                                    product?.productStatus ?
                                        <h2 className="btn  btn-xs text-success">advertised</h2>
                                        :
                                        <button onClick={() => handleAdvertisement(product)} className="btn btn-primary btn-xs">advertise</button>
                                }
                                <label onClick={() => { setDeletingProduct(product) }} htmlFor="confirmation-modal" className="btn btn-xs btn-primary">Delete</label>

                            </div>
                        </div>
                    </div>

                    )

                }

            </div>
            {
                deletingProduct && <ConfirmModal title={`Are you want to delete?`} closeModal={closeModal} handleDelete={handleDelete} modalDAta={deletingProduct}></ConfirmModal>
            }
        </div>
    );
};

export default MyProduct;