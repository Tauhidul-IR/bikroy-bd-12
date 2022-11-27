import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import googleLogo from '../images/google.png'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import useToken from '../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUser, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation()
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true })
    }



    const handleLogin = data => {
        // console.log(data)
        setLoginError('');
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(data.email)

            })
            .catch(error => {
                console.error(error.message)
                setLoginError(error.message)

            })
    }

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user)
                // navigate(from, { replace: true })
                toast.success("login Successfully")
                // setLoginUserEmail(user?.email)
                setLoginUserEmail(user.email)
            })
            .catch(error => {
                console.error(error)
                setLoginError(error.message)
            })
    }





    // const saveUser = (name, email) => {
    //     const user = { name, email };
    //     fetch('http://localhost:5000/users', {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setLoginUserEmail(email)
    //             // getUserToken(email)
    //             // navigate('/');
    //         })
    //         .catch(error => console.error(error))
    // }





    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center font-bold'>Login</h2>
                {/* -----------------Start Form------------------ */}
                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* --------------email---------------------------------- */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text font-bold">Email</span></label>
                        <input
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            type="email" className="input input-bordered w-full max-w-xs" />

                        {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}
                    </div>
                    {/* --------------email---------------------------------- */}




                    {/* --------------password---------------------------------- */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text font-bold">Password</span></label>
                        <input
                            {...register("password", {
                                required: "Password Required",
                                minLength: { value: 6, message: 'Password must be 6 characters or more.!!!' }
                            })}
                            type="password" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-700'>{errors.password?.message}</p>}

                    </div>
                    {/* --------------password---------------------------------- */}


                    {/* --------------Login Btn---------------------------------- */}
                    <input className='btn btn-neutral w-full' type="submit" value={'Login'} />
                </form>

                {/* error display------------------------- */}
                <div>
                    {
                        loginError && <p className='text-red-600'>{loginError}</p>
                    }
                </div>
                {/* -------------End Form-------------- */}


                <p className='font-semibold my-5'>New to Doctors Portal? <Link to={'/signUp'} className='text-secondary'>Create new account</Link></p>
                <div className="divider">OR</div>
                {/* -------------Google Login-------------- */}
                <button onClick={handleGoogle} className='btn btn-outline w-full my-4'>CONTINUE WITH GOOGLE</button>
                {/* -------------Google Login-------------- */}
            </div>
        </div>
    );
};

export default Login;