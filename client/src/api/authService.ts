
import { backendUrl } from '@/config/backendUrl';
import type{ loginUser, ResetPasswordFormData, signupUser, employerSignupUser, employerLoginUser } from "@/validation/userSchema";

import axios from 'axios';

const BASE_URL = `${backendUrl}/api/v1`

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});


export const signUp = async (data: signupUser) => {
  return apiClient.post('/auth/signup',data)
}

export const signIn = async (data: loginUser) => {
  return apiClient.post('/auth/signin',data)
}

export const forgotPassword = async (data:{email?: string}) => {
    return apiClient.post('/auth/reset-password',data)
}

export const verifyUserEmail = async (verificationToken: string | undefined) => {
  return apiClient.get(`/auth/verify-email/${verificationToken}`)
}

export const verifyResetToken = async (resetToken: string | undefined) => {
    return apiClient.get(`/auth/verify-token/${resetToken}`)
}

export const resetPassword = async (data: ResetPasswordFormData, resetToken: string | undefined) => {
  return apiClient.post(`/auth/reset-password/${resetToken}`, data)
}

// Employer Authentication APIs
export const employerSignUp = async (data: employerSignupUser) => {
  return apiClient.post('/employer-auth/signup', data)
}

export const employerSignIn = async (data: employerLoginUser) => {
  return apiClient.post('/employer-auth/signin', data)
}

export const employerForgotPassword = async (data: {email?: string}) => {
  return apiClient.post('/employer-auth/reset-password', data)
}

export const verifyEmployerEmail = async (verificationToken: string | undefined) => {
  return apiClient.get(`/employer-auth/verify-email/${verificationToken}`)
}

export const verifyEmployerResetToken = async (resetToken: string | undefined) => {
  return apiClient.get(`/employer-auth/verify-token/${resetToken}`)
}

export const employerResetPassword = async (data: ResetPasswordFormData, resetToken: string | undefined) => {
  return apiClient.post(`/employer-auth/reset-password/${resetToken}`, data)
}

