import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductsLayout from "../layouts/ProductsLayout";
import Root from "../layouts/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import Blog from "../Pages/Others/Blog";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/blog',
                element: <Blog />
            },
        ]
    },
    {
        path: '/products',
        element: <ProductsLayout />,
        children: [
            {
                path: '/products',
                element: <Products />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts />
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers />
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers />
            },
        ]
    }
])

export default router;