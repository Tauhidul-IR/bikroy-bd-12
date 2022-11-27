import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);



const Payment = () => {
    const bookingData = useLoaderData();
    console.log(bookingData);



    return (
        <div>
            <h2 className='text-3xl font-bold mt-4'>Payment for {bookingData?.name}</h2>
            <p className='font-bold'>Please Pay <span className='text-xl font-bold text-primary'>${bookingData?.price}</span></p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm bookingData={bookingData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;