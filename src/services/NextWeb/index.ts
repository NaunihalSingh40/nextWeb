import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NextWebApi = createApi({
  reducerPath: "nextWebApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: () => ({}),
});
