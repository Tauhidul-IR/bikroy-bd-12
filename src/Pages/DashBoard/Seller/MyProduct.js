import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyProduct = () => {
    const { user } = useContext(AuthContext);

    const [myProducts, setMyProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/showAddProduct?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyProducts(data))
    }, [user?.email])



    console.log(myProducts);




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
                                                <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {product?.name}
                                </td>
                                <td> {product?.price}</td>
                                <th>
                                    <button className="btn btn-primary btn-xs">advertise</button>
                                </th>
                                <th>
                                    <button className="btn btn-primary btn-xs">X</button>
                                </th>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyProduct;