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
import RequireAuth from "./RequireAuth";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Payment from "../Pages/Dashboard/Buyer/Payment";
import Product from "../Pages/Products/Product";

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
                path: '/products',
                element: <Products />
            },
            {
                path: '/category/:slug',
                element: <Products />,
            },
            {
                path: '/products/:id',
                element: <Product />,
            },
        ],
        errorElement: <ErrorPage />
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
                path: '/dashboard/payment/:id',
                element: <Payment />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_APP_API_URL}/bookings/${params.id}`),
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
        ],
        errorElement: <ErrorPage />
    }
])

export default router;