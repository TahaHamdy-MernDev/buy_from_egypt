import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query.api";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (body) => ({
          url: "/auth/register",
          method: "POST",
          body,
        }),
      }),
      login: builder.mutation({
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
      }),
      //logout
      logout: builder.mutation({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
      }),
      //auth/verify-otp
      verifyOtp: builder.mutation({
        query: (body) => ({
          url: "/auth/verify-otp",
          method: "POST",
          body,
        }),
      }),
      //auth/verify-otp-link
      verifyOtpLink: builder.mutation({
        query: (body) => ({
          url: "/auth/verify-otp-link",
          method: "POST",
          body,
        }),
      }),
      //auth/request-reset
      requestReset: builder.mutation({
        query: (body) => ({
          url: "/auth/request-reset",
          method: "POST",
          body,
        }),
      }),
      // auth/reset-password
      resetPassword: builder.mutation({
        query: (body) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
        }),
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyOtpMutation,
  useVerifyOtpLinkMutation,
  useRequestResetMutation,
  useResetPasswordMutation,
} = authApi;
