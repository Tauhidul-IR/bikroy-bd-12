import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useToken from '../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState(null)
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }


    const handleSignUp = data => {
        console.log(data)
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast.success("User Create SuccessFully")
                //update user
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                        // navigate('/');
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error)
                setSignUpError(error.message)
            })
    }


    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
                // getUserToken(email)
                // navigate('/');
            })
            .catch(error => console.error(error))
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
                setSignUpError(error.message)
            })
    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center font-bold'>Sign Up</h2>
                {/* -----------------Start Form------------------ */}
                <form onSubmit={handleSubmit(handleSignUp)}>
                    {/* --------------Name---------------------------------- */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text font-bold">Name</span></label>
                        <input
                            {...register("name", {
                                required: 'Name Must Given.'
                            })}
                            type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}

                    </div>
                    {/* --------------Name---------------------------------- */}




                    {/* --------------email---------------------------------- */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text font-bold">Email</span></label>
                        <input
                            {...register("email", {
                                required: "Email is Required"
                            })}
                            type="email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    {/* --------------email---------------------------------- */}





                    {/* --------------password---------------------------------- */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text font-bold">Password</span></label>
                        <input
                            {...register("password", {
                                required: "Password is Required",
                                minLength: { value: 6, message: 'Password must be 6 characters or more.!!!' },
                                // regular expression
                                // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password Must be Strong" }
                            })}
                            type="password" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                    </div>
                    {/* --------------password---------------------------------- */}


                    {/* --------------Submit Btn---------------------------------- */}
                    <input className='btn btn-neutral w-full mt-5' type="submit" value={'Sign Up'} />
                    {/* display Error */}
                    <div>
                        {
                            signUpError && <p className='text-red-600'>{signUpError}</p>
                        }
                    </div>
                </form>
                {/* -------------End Form-------------- */}




                <p className='font-semibold my-5'>Already have an Account? <Link to={'/login'} className='text-secondary'>Login</Link></p>
                <div className="divider">OR</div>
                {/* -------------Google Sign in-------------- */}
                <button onClick={handleGoogle} className='btn btn-outline w-full my-4'>CONTINUE WITH GOOGLE</button>
                {/* -------------Google Sign in-------------- */}
            </div>
        </div>
    );
};

export default SignUp;