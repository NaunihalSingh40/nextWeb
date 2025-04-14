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
  }),
});

export const { useAddCartItemMutation, useGetCartItemsQuery } = cartApi;
