import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';

const ReportAdmin = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)
    const reportedProduct = useLoaderData();
    const navigate = useNavigate();




    const handleReport = (data) => {
        const report = {
            productName: reportedProduct?.name,
            productID: reportedProduct?._id,
            reporterEmail: user?.email,
            report: data.report
        }

        fetch('https://bikroy-bd-server.vercel.app/reportAdmin', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Report Done')
                    navigate('/')
                }
            })
    }



    return (
        <div className='my-12'>
            <h2 className='text-3xl font-bold my-2'>Report on {reportedProduct?.name}</h2>
            <form onSubmit={handleSubmit(handleReport)}>
                {/* --------------email---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Your Report</span></label>
                    <input
                        {...register("report", {
                            required: "Email Address is required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />

                    {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}
                </div>
                {/* --------------email---------------------------------- */}







                {/* --------------Login Btn---------------------------------- */}
                <input className='btn btn-neutral mt-5' type="submit" value={'send Report'} />
            </form>
        </div>
    );
};

export default ReportAdmin;