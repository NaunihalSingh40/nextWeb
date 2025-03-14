import { NextWebApi } from "services/NextWeb";

export const signinApi = NextWebApi.injectEndpoints({
  endpoints: (builder) => ({
    postSigin: builder.mutation({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostSiginMutation } = signinApi;
