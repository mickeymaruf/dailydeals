import apis from "../apis/apis";

const userApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        saveUser: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: "POST",
                body: data
            }),
        }),
        verifyUser: builder.mutation({
            query: (email) => ({
                url: `/verifyUser?email=${email}`,
            }),
            invalidatesTags: ["Sellers"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sellers", "Buyers"]
        }),

        getSellers: builder.query({
            query: () => `/users?role=seller`,
            providesTags: ["Sellers"]
        }),
        getBuyers: builder.query({
            query: () => `/users?role=buyer`,
            providesTags: ["Buyers"]
        }),

        userRole: builder.query({
            query: (email) => `/users/role?email=${email}`,
            transformResponse: (response) => response?.role
        }),
    })
})

export const { useSaveUserMutation, useVerifyUserMutation, useGetSellersQuery, useDeleteUserMutation, useGetBuyersQuery, useUserRoleQuery } = userApi;