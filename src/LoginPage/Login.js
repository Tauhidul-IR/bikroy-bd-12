import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import googleLogo from '../images/google.png'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { loginUser, googleSignIn } = useContext(AuthContext);


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('login successSully')
                form.reset();


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
            .catch(error => console.error(error))
    }





    return (
        <div>
            <div className='container'>
                <div className="hero w-full my-20">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-10">
                        <h1 className="text-5xl font-bold text-center">Login</h1>


                        {/* toggle btn for user/admin */}
                        {/* <div className="form-control w-52">
                            <label className="cursor-pointer label">
                                <span className="label-text">Remember me</span>
                                <input type="checkbox" className="toggle toggle-primary" checked />
                            </label>
                        </div> */}

                        {/* login form */}
                        <form onSubmit={handleSubmit} className="card-body">
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
                            <div className="form-control mt-6">
                                <input className="btn btn-error" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className='text-center'>
                            <h2 className='pb-4 text-xl'>Login with</h2>
                            <div className='flex justify-around py-4'>
                                <Link ><img onClick={handleGoogle} className='w-8 h-8' src={googleLogo} alt="" /></Link>
                            </div>
                        </div>
                        <p className='text-center'>New to Genius Car <Link className='text-orange-500 font-bold' to={'/signup'}>Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;