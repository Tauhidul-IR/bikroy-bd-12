import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import Loading from '../../../Loading/Loading';
// import Loading from '../../Loading/Loading';

const Myorder = () => {
    const { user } = useContext(AuthContext);

    const url = `https://bikroy-bd-server.vercel.app/phoneBookings?email=${user?.email}`

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

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(phoneBookings);

    return (
        <div>
            <h1 className='text-3xl font-bold my-5'>My Orders</h1>


            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 '>
                {
                    phoneBookings &&
                    phoneBookings.map(bookingPhone => <div key={bookingPhone._id} className="card w-full md:w-80 bg-base-100 shadow-xl">
                        <figure><img className='w-28 pt-7' src={bookingPhone?.img} alt="Avatar Tailwind CSS Component" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Name : {bookingPhone?.name}
                            </h2>
                            <p>Email : {bookingPhone?.email}</p>
                            <div className="card-actions justify-end">
                                {
                                    !bookingPhone?.paid && <Link to={`/dashboard/payment/${bookingPhone._id}`}>
                                        <button className='btn btn-primary btn-sm'>
                                            Pay
                                        </button>
                                    </Link>
                                }
                                {
                                    bookingPhone?.paid && <span className='text-primary'>Paid</span>
                                }
                            </div>
                        </div>
                    </div>

                    )

                }

            </div>
        </div>
    );
};

export default Myorder;

