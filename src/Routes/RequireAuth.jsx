import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import PageLoading from '../Pages/Shared/PageLoading';

const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoading />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default RequireAuth;