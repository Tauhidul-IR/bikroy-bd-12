import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen mt-5 rounded" style={{ backgroundImage: `url("http://regxlib.com/wp-content/uploads/2019/01/smarphones.jpg")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold ">BikroyBd</h1>
                        <p className="mb-5 text-2xl">It is a most popular 2nd hand product sell's website in Our Country.</p>
                        <button className="btn btn-primary text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;