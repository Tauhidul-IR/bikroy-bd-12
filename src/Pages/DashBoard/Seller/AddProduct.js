import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../../../Loading/Loading';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const imageHostKey = process.env.REACT_APP_IMGBB_TOKEN;
    const navigate = useNavigate();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category');
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }



    const handleAddProduct = (data) => {
        // console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        // const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_TOKEN}`;
        const url = `https://api.imgbb.com/1/upload?key=d7af164dae32ae1803621b0c1dce000c`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    //save doctor to the DB
                    fetch('http://localhost:5000/addProduct', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/myProduct')
                        })
                }
            })
            .catch(error => console.log(error))


    }






    return (
        <div>
            <h1>Add a product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>
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




                {/* --------------Price---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Price</span></label>
                    <input
                        {...register("price", {
                            required: "price is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.price && <p className='text-red-500'>{errors.price?.message}</p>}
                </div>
                {/* --------------Price---------------------------------- */}

                {/* --------------Condition---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Condition</span></label>
                    <input
                        {...register("condition", {
                            required: "condition is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.price && <p className='text-red-500'>{errors.price?.message}</p>}
                </div>
                {/* --------------Condition---------------------------------- */}


                {/* --------------Phone---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Phone</span></label>
                    <input
                        {...register("phone", {
                            required: "condition is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.phone && <p className='text-red-500'>{errors.phone?.message}</p>}
                </div>
                {/* --------------Phone---------------------------------- */}


                {/* --------------publishDate---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">publish Date</span></label>
                    <input
                        {...register("publishDate", {
                            required: "condition is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.publishDate && <p className='text-red-500'>{errors.publishDate?.message}</p>}
                </div>
                {/* --------------publishDate---------------------------------- */}

                {/* --------------publishDate---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Description</span></label>
                    <input
                        {...register("description", {
                            required: "condition is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.description && <p className='text-red-500'>{errors.description?.message}</p>}
                </div>
                {/* --------------publishDate---------------------------------- */}





                {/* --------------Specialty---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Category</span></label>
                    <select {...register("category", {
                        required: "Email is Required"
                    })} className="select select-bordered w-full max-w-xs">

                        {
                            categories.map(category => <option key={category._id} value={category.category}>{category?.category}</option>)
                        }
                    </select>

                </div>
                {/* ----------
                {/* --------------Specialty---------------------------------- */}


                {/* --------------Upload photo---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Photo</span></label>
                    <input
                        {...register("image", {
                            required: 'Photo is required.'
                        })}
                        type="file" className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img?.message}</p>}

                </div>
                {/* --------------Upload photo---------------------------------- */}


                {/* --------------Submit Btn---------------------------------- */}
                <input className='btn btn-neutral w-full mt-5' type="submit" value={'Add Product'} />
                {/* display Error */}
                <div>
                    {
                        // signUpError && <p className='text-red-600'>{signUpError}</p>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddProduct;