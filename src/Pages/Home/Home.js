import React from 'react';
import Adverting from './Adverting';
import Banner from './Banner';
import HomeCategory from './HomeCategory';
import Subscribe from './Subscribe';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Adverting></Adverting>
            <HomeCategory></HomeCategory>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;