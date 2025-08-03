import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.73:7000/api/v1/", 
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState()?.auth?.token;
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({

    //userLogin
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "accounts/login/",
        method: "POST",
        body: userInfo,
      }),
    }),

    //reset pass
  }),
});

export const { useLoginUserMutation } = baseApi;
