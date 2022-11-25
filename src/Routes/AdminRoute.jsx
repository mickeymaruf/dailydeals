import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import PageLoading from '../Pages/Shared/PageLoading';

const AdminRoute = ({ children }) => {
    const { userRole, userRoleIsLoading } = useAuth();

    if (userRoleIsLoading) {
        return <PageLoading />
    }

    if (userRole === "admin") {
        return children;
    }

    return <Navigate to="/" />
};

export default AdminRoute;