import React from 'react';
import { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';

const ResetPassword = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { resetPassword } = useContext(AuthContext)

    const handleResetPassword = (data) => {
        console.log(data.email);
        resetPassword(data.email)
            .then(() => { })
            .catch(error => console.log(error))
    }


    return (
        <div className='flex justify-center my-10'>
            <form onSubmit={handleSubmit(handleResetPassword)}>
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


                {/* --------------Login Btn---------------------------------- */}
                <input className='btn btn-neutral w-full my-5' type="submit" value={'Reset Password'} />
            </form>
        </div>
    );
};

export default ResetPassword;