import React from 'react';
import Footer from '../../Shared/Footer';
import Banner from './Banner';
import HomeCategory from './HomeCategory';
import Subscribe from './Subscribe';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeCategory></HomeCategory>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;