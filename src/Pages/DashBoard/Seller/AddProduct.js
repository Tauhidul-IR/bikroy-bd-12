import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../../../Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)
    // const imageHostKey = process.env.REACT_APP_IMGBB_TOKEN;
    const navigate = useNavigate();
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://bikroy-bd-server.vercel.app/category');
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
                        img: imgData.data.url,
                        newPrice: data.price,
                        condition: data.condition,
                        phone: data.phone,
                        postDate: data.publishDate,
                        categoryName: data.category,
                        sellerName: user?.displayName,
                        location: data.location
                    }


                    fetch('https://bikroy-bd-server.vercel.app/addProduct', {
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
        <div className='mb-5'>
            <h1 className='text-4xl font-bold my-7'>Add a product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                {/* --------------email---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Seller Email</span></label>
                    <input
                        {...register("email", {
                            required: "Email is Required"
                        })}
                        type="email" className="input input-bordered w-full max-w-xs" defaultValue={user?.email} readOnly />
                    {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                </div>
                {/* --------------email---------------------------------- */}


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
                    {errors.condition && <p className='text-red-500'>{errors.condition?.message}</p>}
                </div>
                {/* --------------Condition---------------------------------- */}

                {/* --------------Condition---------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text font-bold">Location</span></label>
                    <input
                        {...register("location", {
                            required: "condition is Required"
                        })}
                        type="text" className="input input-bordered w-full max-w-xs" />
                    {errors.location && <p className='text-red-500'>{errors.location?.message}</p>}
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





                {/* --------------category---------------------------------- */}
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
                {/* --------------category---------------------------------- */}


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
                <input className='btn btn-primary mt-5' type="submit" value={'Add Product'} />
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