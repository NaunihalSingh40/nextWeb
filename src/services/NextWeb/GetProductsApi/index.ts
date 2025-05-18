import { NextWebApi } from "services/NextWeb";

export const getProductsApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `products/${productId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductQuery, useGetSingleProductQuery } = getProductsApi;
