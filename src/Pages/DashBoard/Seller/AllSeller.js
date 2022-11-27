import React, { useEffect, useState } from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import Loading from '../../../Loading/Loading';

const AllSeller = () => {
    // const [users, setUsers] = useState([])
    // const [sellers, setSellers] = useState([]);



    const { data: sellers = [], isLoading } = useQuery({
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
                                    {/* {
                                        user?.role !== "admin" && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                                    } */}
                                    <button className='btn btn-primary'>verify</button>

                                </td>
                                <td><button className='btn btn-primary'>X</button></td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;