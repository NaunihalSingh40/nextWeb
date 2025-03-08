import { NextWebApi } from "services/NextWeb";

export const signinApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    postSigin: builder.mutation({
      query: (userData) => ({
        url: "user",
        method: "POST",
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostSiginMutation } = signinApi;
