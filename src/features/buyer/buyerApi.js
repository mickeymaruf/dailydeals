import apis from "../apis/apis";

const buyerApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query({
            query: (email) => `/myorders?email=${email}`,
        }),

        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: `/create-payment-intent`,
                method: "POST",
                body: data
            }),
        }),

        makePayments: builder.mutation({
            query: (data) => ({
                url: `/payments`,
                method: "POST",
                body: data
            }),
        }),
    })
})

export const { useGetMyOrdersQuery, useCreatePaymentIntentMutation, useMakePaymentsMutation } = buyerApi;