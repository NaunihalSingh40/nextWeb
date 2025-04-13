import { NextWebApi } from "services/NextWeb";

export const getProductsApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "products",
        method: "GET"
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductQuery } = getProductsApi;
