import { createBrowserRouter } from "react-router-dom";
import ProductsLayout from "../layouts/ProductsLayout";
import Root from "../layouts/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            }
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
    }
])

export default router;