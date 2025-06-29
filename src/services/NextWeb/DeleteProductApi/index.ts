import { NextWebApi } from ".."

export const deleteProductApi = NextWebApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `products/${productId}`,
                method: "DELETE",
            }),
        }),
        
    })
})

export const { useDeleteProductMutation } = deleteProductApi;