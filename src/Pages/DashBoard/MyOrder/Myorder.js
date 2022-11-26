import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
// import Loading from '../../Loading/Loading';

const Myorder = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/phoneBookings?email=${user?.email}`

    const { data: phoneBookings = [], isLoading } = useQuery({
        queryKey: ['phoneBookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }

    })

    console.log(phoneBookings);

    return (
        <div>
            <h1 className='text-3xl font-bold my-5'>My Orders</h1>

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
                        </tr>
                    </thead>
                    <tbody>


                        {
                            phoneBookings &&
                            phoneBookings.map((bookingPhone, i) => <tr key={bookingPhone._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={bookingPhone?.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {bookingPhone?.name}
                                </td>
                                <td> {bookingPhone?.price}</td>
                                <th>
                                    <button className="btn btn-primary btn-xs">Pay</button>
                                </th>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Myorder;

