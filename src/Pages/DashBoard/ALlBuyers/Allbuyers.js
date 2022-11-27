import React, { useEffect, useState } from 'react';
import Loading from '../../../Loading/Loading';

const Allbuyers = () => {
    const [allBuyers, setAllBuyers] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/buyers`)
            .then(res => res.json())
            .then(buyerData => {
                const allBuyersData = buyerData.filter(buyer => (buyer.userType !== 'Seller' && buyer.role !== 'admin'));
                setAllBuyers(allBuyersData)
                setIsloading(false)
            })
    }, [])

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <h1>All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer?.name}</td>
                                <td>{buyer?.email}</td>

                                <td><button className='btn btn-primary'>X</button></td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allbuyers;