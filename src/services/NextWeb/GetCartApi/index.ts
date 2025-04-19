import { NextWebApi } from "services/NextWeb";

export const cartApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url: "cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("accessToken")
              : ""
          }`,
        },
      }),
    }),
    addCartItem: builder.mutation({
      query: (item) => ({
        url: "cart",
        method: "POST",
        body: item,
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("accessToken")
              : ""
          }`,
        },
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PUT",
        body: { quantity, productId: id },
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("accessToken")
              : ""
          }`,
        },
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `cart/${productId}`, // Dynamic route using productId in URL
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("accessToken")
              : ""
          }`,
        },
      }),
    }),
  }),
});

export const {
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
