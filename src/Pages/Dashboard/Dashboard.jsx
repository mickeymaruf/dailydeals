import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const Dashboard = () => {
    const { userRole } = useAuth();
    if (userRole === "admin") {
        return <Navigate to="/dashboard/allsellers" />
    }

    if (userRole === "seller") {
        return <Navigate to="/dashboard/myproducts" />
    }

    return <Navigate to="/dashboard/myorders" />
};

export default Dashboard;