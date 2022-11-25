import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../images/error.png'

const ErrorPage = () => {
    return (
        <div className='flex justify-center'>
            <div>
                <img src={errorImg} alt="" />
                <h5 className='text-center mt-7'><Link to={'/'}>GO TO HOME</Link></h5>
            </div>
        </div>
    );
};

export default ErrorPage;