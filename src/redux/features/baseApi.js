


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mutex } from "./Mutex";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.73:7000/api/v1/",
  prepareHeaders: (headers) => {

    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log("Initial request:", args);
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("401 Unauthorized detected, attempting refresh");
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("Refresh token attempt with:", localStorage.getItem("refresh_token"));
        const refreshResult = await baseQuery(
          {
            url: "accounts/custom-token-refresh/",
            method: "POST",
            body: { refresh_token: localStorage.getItem("refresh_token") },
          },
          api,
          extraOptions
        );
        console.log("Refresh result:", refreshResult);

        if (refreshResult.data) {
          console.log("Token refreshed:", refreshResult.data);
          localStorage.setItem("access_token", refreshResult.data.access_token);
          localStorage.setItem("refresh_token", refreshResult.data.refresh_token || localStorage.getItem("refresh_token"));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("Refresh failed, redirecting to login");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      console.log("Waiting for another refresh to complete");
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "accounts/login/",
        method: "POST",
        body: userInfo,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "accounts/custom-token-refresh/",
        method: "POST",
        body: { refresh_token: localStorage.getItem("refresh_token") },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "accounts/pass-reset-request/",
        method: "POST",
        body: data,
      }),
    }),
    varifyOtp: builder.mutation({
      query: (payload) => ({
        url: 'accounts/reset-request-activate/',
        method: 'POST',
        body: payload,
      }),
    }),
    resetOtp: builder.mutation({
      query: (resetOtpData) => ({
        url: "accounts/resend-otp/",
        method: "POST",
        body: resetOtpData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetPassword) => ({
        url: "accounts/reset-password/",
        method: "POST",
        body: resetPassword,
      }),
    }),
    // getProfile: builder.query({
    //   query: () => ({
    //     url: "accounts/profile/",


    //   }),
    // }),
    changePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: 'accounts/profile/change-password/',
        method: 'PUT',
        body: { old_password, new_password },
      }),
    }),
    // profileUpdate: builder.mutation({
    //   query: (formData) => ({
    //     url: 'accounts/profile/update/',
    //     method: 'PUT',
    //     body: formData, 
    //     headers: {
    //       'Content-Type': 'multipart/form-data', 
    //     },
    //   }),
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useVerifyEmailMutation,
  useVarifyOtpMutation,
  useRefreshTokenMutation,
  useResetOtpMutation,
  useResetPasswordMutation,
 

  useChangePasswordMutation,
 
} = baseApi;
