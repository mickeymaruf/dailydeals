import React, { createContext } from 'react';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get(`https://dailydeals-server.vercel.app/categories`)
            .then(data => data.data)
    })
    return (
        <CategoryContext.Provider value={{ categories, isLoading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;