import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Navbar from '../Shared/Navbar';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            {/* <Outlet></Outlet> */}
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-blue-800 font-bold">

                        <li><Link to={'/dashboard/myorder'}>My Order</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to={'/dashboard/allusers'}>All users</Link></li>
                                <li><Link to={'/dashboard/sellers'}>All Seller</Link></li>
                                <li><Link to={'/dashboard/buyers'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/reportedItem'}>Reported Item</Link></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                                <li><Link to={'/dashboard/myProduct'}>My Product</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;