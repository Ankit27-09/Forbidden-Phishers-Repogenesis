
import { backendUrl } from '@/config/backendUrl';
import type{ loginUser, ResetPasswordFormData, candidateSignupUser, organizationSignupUser } from "@/validation/userSchema";

import axios from 'axios';

const BASE_URL = `${backendUrl}/api/v1`

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Role-based signup functions
export const candidateSignUp = async (data: candidateSignupUser) => {
  return apiClient.post('/auth/candidate/signup', data);
}

export const organizationSignUp = async (data: organizationSignupUser) => {
  return apiClient.post('/auth/organisation/signup', data);
}

// Legacy signup function for backward compatibility
export const signUp = async (data: candidateSignupUser) => {
  return candidateSignUp(data);
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

