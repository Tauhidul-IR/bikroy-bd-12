import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Loading/Loading';


const imgUrl = "https://www.cnet.com/a/img/resize/16553e1b4e4ed98372472ca87b76fb88fab86dd5/hub/2022/02/22/3c78d10e-30f2-4a56-9def-60455e08bf53/samsung-galaxy-s22-and-s22-plus-and-s22-ultra-compared-002-copy.jpg?auto=webp&fit=crop&height=1200&width=1200"


const HomeCategory = () => {
    const [homeCategory, setHomeCategory] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    // Use axios
    useEffect(() => {
        axios.get('http://localhost:5000/category')
            .then((res) => {
                setHomeCategory(res.data)
                setIsLoading(false)
            })
            .catch((error) => console.log(error.message))
    }, [])
    console.log(homeCategory)


    if (isloading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-5xl my-7 font-bold text-center'>You can select a Category</h2>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 pl-5'>
                {
                    homeCategory.map(hcategory => <div key={hcategory._id} className="card w-full md:w-96 bg-base-100 shadow-xl image-full">
                        <figure><img src={imgUrl} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-5xl">{hcategory.category}</h2>
                            <p className='text-xl'>All the 2nd hand {hcategory.category} Phone you find here</p>
                            <div className="card-actions justify-center">
                                <Link to={`/category/${hcategory._id}`} className="btn btn-primary">See ALl</Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default HomeCategory;