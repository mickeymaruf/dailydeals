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
        verifyUser: builder.query({
            query: (email) => `/verifyUser?email=${email}`,
        }),
    })
})

export const { useSaveUserMutation, useVerifyUserQuery } = userApi;