

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.73:7000/api/v1/",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    // Do not set Content-Type manually for FormData; let fetchBaseQuery handle it
    return headers;
  },
});

export const ApiSlice = createApi({
  reducerPath: "ApiSlice",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "accounts/profile/",
      }),
       providesTags: ["Profile"],
    }),
    profileUpdate: builder.mutation({
      query: (formData) => ({
        url: "accounts/profile/update/",
        method: "PUT",
        body: formData,
      }),
       invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useProfileUpdateMutation } = ApiSlice;

export default ApiSlice;
