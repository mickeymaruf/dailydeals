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

        getReportedProducts: builder.query({
            query: () => `/reportedProducts`,
        }),
        reportProduct: builder.mutation({
            query: ({ _id, email, data }) => ({
                url: `/products/report/${_id}?email=${email}`,
                method: 'POST',
                body: data
            })
        }),
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `/reportedProducts/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useGetMyProductsQuery,
    useAdvertiseProductMutation,
    useReportProductMutation,
    useGetReportedProductsQuery,
    useDeleteReportMutation
}
    = productApi;