import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserRole = email => {
    const { data, isLoading } = useQuery({
        queryKey: ['user', email],
        queryFn: () => axios.get(`${import.meta.env.VITE_APP_API_URL}/users?email=${email}`),
        refetchOnWindowFocus: false,
    })
    return [data?.data?.role, isLoading];
}

export default useUserRole;