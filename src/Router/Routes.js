import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashBoardLayout from '../layout/DashBoardLayout';
import Main from '../layout/Main';
import Login from '../LoginPage/Login';
import SignUp from '../LoginPage/SignUp';
import Blogs from '../Pages/Blogs/Blogs';
import Category from '../Pages/Categories/Category';
import Allbuyers from '../Pages/DashBoard/ALlBuyers/Allbuyers';
import AllUsers from '../Pages/DashBoard/AllUsers/AllUsers';
import DashBoard from '../Pages/DashBoard/DashBoard/DashBoard';
import Myorder from '../Pages/DashBoard/MyOrder/Myorder';
import Payment from '../Pages/DashBoard/Payment/Payment';
import ReportedItem from '../Pages/DashBoard/ReportedItem/ReportedItem';
import AddProduct from '../Pages/DashBoard/Seller/AddProduct';
import AllSeller from '../Pages/DashBoard/Seller/AllSeller';
import MyProduct from '../Pages/DashBoard/Seller/MyProduct';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import ReportAdmin from '../Pages/ReportAdmin/ReportAdmin';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';
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
                element: <PrivateRoute><Category></Category></PrivateRoute>,
                loader: ({ params }) => fetch(`https://bikroy-bd-server.vercel.app/category/${params.id}`)
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
                path: '/resetPassword',
                element: <ResetPassword></ResetPassword>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/product/:id',
                element: <ReportAdmin></ReportAdmin>,
                loader: ({ params }) => fetch(`https://bikroy-bd-server.vercel.app/product/${params.id}`)
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
            },
            {
                path: '/dashboard/sellers',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRoute><Allbuyers></Allbuyers></AdminRoute>
            },
            {
                path: '/dashboard/reportedItem',
                element: <AdminRoute><ReportedItem></ReportedItem></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://bikroy-bd-server.vercel.app/phoneBookings/${params.id}`)
            }
        ]
    }
])

export default router;