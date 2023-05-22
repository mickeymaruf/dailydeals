import { createContext } from 'react';
import { useGetCategoriesQuery } from '../features/product/productApi';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery();

    return (
        <CategoryContext.Provider value={{ categories, isLoading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;