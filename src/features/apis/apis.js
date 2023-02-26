import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apis = createApi({
    reducerPath: 'apis',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({}),
    tagTypes: ['MyProducts']
})

export default apis;