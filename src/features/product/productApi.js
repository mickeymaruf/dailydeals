import apis from "../apis/apis";

const productApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (slug) => slug ? `/category/${slug}` : `/products`,
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: `/products`,
                method: 'POST',
                body: data
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['MyProducts']
        }),


        getMyProducts: builder.query({
            query: (email) => `/myproducts?email=${email}`,
            providesTags: ['MyProducts']
        }),
        advertiseProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['MyProducts']
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useGetMyProductsQuery,
    useAdvertiseProductMutation
}
    = productApi;