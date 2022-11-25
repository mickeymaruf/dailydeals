import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
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
import RequireAuth from "./RequireAuth";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

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
            {
                path: '/products',
                element: <RequireAuth><Products /></RequireAuth>,
                loader: () => fetch(`${import.meta.env.VITE_APP_API_URL}/products`),
            },
            {
                path: '/products/category/:slug',
                element: <RequireAuth><Products /></RequireAuth>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_APP_API_URL}/products/category/${params.slug}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <RequireAuth><DashboardLayout /></RequireAuth>,
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
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers /></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers /></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
        ]
    }
])

export default router;