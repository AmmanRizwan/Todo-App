import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.BASEURL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Todo"],
  endpoints: (builder) => ({}),
});
