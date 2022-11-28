import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserRole = email => {
    const { data, isLoading, refetch: userRoleRefetch } = useQuery({
        queryKey: ['user', email],
        queryFn: () => axios.get(`https://dailydeals-server.vercel.app/users/role?email=${email}`),
        refetchOnWindowFocus: false,
    })
    return [data?.data?.role, isLoading, userRoleRefetch];
}

export default useUserRole;