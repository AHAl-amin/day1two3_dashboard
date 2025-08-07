import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.73:7000/api/v1/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    //email verification
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "accounts/pass-reset-request/",
        method: "POST",
        body: data
      })
    }),



    varifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "accounts/reset-request-activate/",
        method: "POST",
        body: otpData
      })
    })


  }),
});

export const {

  useLoginUserMutation,
  useVerifyEmailMutation,
  useVarifyOtpMutation,



} = baseApi;
