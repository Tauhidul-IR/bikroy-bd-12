import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext)

    const handlelogout = () => {
        logOutUser()
            .then(() => { })
            .catch(error => console.error(error))
    }

    const menuItem = <React.Fragment>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/'}>Products</Link></li>
        <li><Link to={'/'}>Blogs</Link></li>
        <li><Link to={'/category'}>cetegory</Link></li>

        {/* <li><Link to={'/login'}>Login</Link></li> */}

        {
            user?.email ? <>
                <li><Link to={'/dashboard'}>DashBoard</Link></li>
                <li><button onClick={handlelogout}>Sign Out</button></li>
            </> :
                <>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/signUp'}>SignUp</Link></li>
                </>
        }
    </React.Fragment>



    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItem}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-blue-700 text-2xl">Bikroy-BD</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <Link className="btn">Get started</Link> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;