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
            const res = await fetch(url)
            const data = await res.json();
            return data;
        }

    })

    console.log(phoneBookings);

    return (
        <div>
            <h1>My Order</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            phoneBookings &&
                            phoneBookings.map((bookingPhone, i) => <tr key={bookingPhone._id}>
                                <th>{i + 1}</th>
                                <td>{bookingPhone?.name}</td>
                                <td>{bookingPhone?.price}</td>
                                <td> <button>pay</button></td>

                            </tr>)
                        }
                        {/*  */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myorder;