import React from 'react';

const Subscribe = () => {
    return (
        <div className='my-5'>
            <div className="hero " style={{ backgroundImage: `url("https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F181009133950-google-home-hub.jpg")` }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content ">
                    <div className="my-5">
                        <h1 className="mb-5 text-2xl font-bold">News Letter</h1>
                        <p className="mb-5 text-3xl uppercase">Subscribe To Our Newsletter.</p>
                        <input type="email" placeholder="Enter Email" className="input input-bordered input-primary w-3/4 md:w-full " />
                        <button className="btn  btn-primary mt-5">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;