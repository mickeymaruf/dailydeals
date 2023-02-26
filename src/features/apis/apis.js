import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apis = createApi({
    reducerPath: 'apis',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
    endpoints: (builder) => ({})
})

export default apis;