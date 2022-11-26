import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import googlelogo from '../images/google.png'
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [signInError, setSignError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)

        setSignError('');
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success('SignUp Successfully..');
                const userInfo = {
                    displayName: name
                }
                updateUser(userInfo)
                    .then(() => {
                        navigate('/');
                    })
                    .catch(error => console.log(error))
                // form.reset();
                // navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error)
                setSignError(error.message)
            })
    }

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user)
                // navigate(from, { replace: true })
                toast.success("login Successfully")
            })
            .catch(error => {
                console.log(error);
                setSignError(error.message)
            })
    }


    return (
        <div>
            <div className='container'>
                <div className="hero w-full my-20">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-10">
                        <h1 className="text-5xl font-bold text-center">SignUp</h1>
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" />

                            </div>
                            {
                                signInError && <p className='text-red-500'>{signInError}</p>
                            }
                            <div className="form-control mt-6">
                                <input className="btn btn-error" type="submit" value="SignUp" />
                            </div>
                        </form>
                        <div className='text-center'>
                            <h2 className='pb-4 text-xl'>SignUp with</h2>
                            <div className='flex justify-around py-4'>
                                <Link ><img onClick={handleGoogle} className='w-8 h-8' src={googlelogo} alt="" /></Link>
                            </div>
                        </div>
                        <p className='text-center'>Already have an Account <Link className='text-orange-500 font-bold' to={'/login'}>Login</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;