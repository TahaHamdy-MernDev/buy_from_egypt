import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query.api";
interface LoginRequest {
  email: string;
  password: string;
}
interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  profileImage: string | null;
  type: string;
  active: boolean;
  emailVerified: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
}
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  type: string;
  phoneNumber: string;
  taxId: string;
  nationalId: string;
  country: string;
  age: string;
}
interface RegisterResponse {
  message: string;
  user: {
    userId: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    nationalId: string;
    country: string;
    taxId: string;
    age: number;
    role: string;
    type: string;
    active: boolean;
    profileImage: string | null;
    about: string | null;
    registrationNumber: string | null;
    industrial: string | null;
    industrySector: string | null;
    commercial: string | null;
    address: string | null;
    otpCode: string | null;
    otpMethod: string | null;
    otpExpiry: string | null;
    emailVerified: boolean;
    isOnline: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
interface ForgotPasswordRequest {
  identifier: string;
}
interface ForgotPasswordResponse {
  message: string;
}
interface VerifyOtpRequest {
  otpCode: string;
  identifier: string;
}
interface VerifyOtpResponse {
  message: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
interface ResetPasswordResponse {
  message: string;
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => {
    return {
      register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => ({
          url: "/auth/register",
          method: "POST",
          body: {
            ...body,
            age: Number(body.age),
          },
        }),
      }),
      login: builder.mutation<LoginResponse, LoginRequest>({
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
      verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
        query: (body) => ({
          url: "/auth/verify-otp-link",
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
      forgotPassword: builder.mutation<
        ForgotPasswordResponse,
        ForgotPasswordRequest
      >({
        query: (body) => ({
          url: "/auth/request-reset",
          method: "POST",
          body,
        }),
      }),
      // auth/reset-password
      resetPassword: builder.mutation<
        ResetPasswordResponse,
        ResetPasswordRequest
      >({
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
