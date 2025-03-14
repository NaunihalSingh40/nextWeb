import { NextWebApi } from "services/NextWeb";

export const loginApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostLoginMutation } = loginApi;
