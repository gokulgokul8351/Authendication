import { apiSlice } from './apiSlice.js'

const USER_ENDPOINT = '/api/user'

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutAPI: builder.mutation({
      query: () => ({
        url: `${USER_ENDPOINT}/logout`,
        method: 'POST',
      }),
    }),
    registerAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateProfileAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    forgotPasswordAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/forgotpassword`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPasswordAPI: builder.mutation({
      query: ({ password, token }) => ({
        url: `${USER_ENDPOINT}/resetpassword/${token}`,
        method: 'PUT',
        body: { password },
      }),
    }),
  }),
})

export const {
  useLoginAPIMutation,
  useLogoutAPIMutation,
  useRegisterAPIMutation,
  useUpdateProfileAPIMutation,
  useForgotPasswordAPIMutation,
  useResetPasswordAPIMutation,
} = userAPISlice
