import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashBoardLayout from '../layout/DashBoardLayout';
import Main from '../layout/Main';
import Login from '../LoginPage/Login';
import SignUp from '../LoginPage/SignUp';
import Blogs from '../Pages/Blogs/Blogs';
import Category from '../Pages/Categories/Category';
import AllUsers from '../Pages/DashBoard/AllUsers/AllUsers';
import DashBoard from '../Pages/DashBoard/DashBoard/DashBoard';
import Myorder from '../Pages/DashBoard/MyOrder/Myorder';
import AddProduct from '../Pages/DashBoard/Seller/AddProduct';
import MyProduct from '../Pages/DashBoard/Seller/MyProduct';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                element: <Category></Category>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/myorder',
                element: <Myorder></Myorder>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myProduct',
                element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
            }
        ]
    }
])

export default router;