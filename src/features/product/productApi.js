import apis from "../apis/apis";

const productApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (slug) => slug ? `/category/${slug}` : `/products`,
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
        }),
    })
})

export const { useGetProductsQuery, useGetProductQuery } = productApi;