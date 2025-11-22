import { z } from "zod";

// Schema for Candidate Signup Validation
export const candidateSignupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .optional()
    .refine((phone) => !phone || /^\+?[\d\s\-()]+$/.test(phone), {
      message: "Invalid phone number format"
    })
});

// Schema for Organization Signup Validation
export const organizationSignupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  phone: z
    .string()
    .optional()
    .refine((phone) => !phone || /^\+?[\d\s\-()]+$/.test(phone), {
      message: "Invalid phone number format"
    }),
  organization: z
    .string()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be less than 100 characters")
});

// Legacy schema for backward compatibility (deprecated)
export const signupSchema = candidateSignupSchema;

export type candidateSignupUser = z.infer<typeof candidateSignupSchema>;
export type organizationSignupUser = z.infer<typeof organizationSignupSchema>;
export type signupUser = z.infer<typeof signupSchema>;

// Schema for Login Validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export type loginUser = z.infer<typeof loginSchema>;



export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Password must be at least 6 characters long.'), 
  confirmPassword: z.string()
    .min(1, 'Please confirm your password.') 
}) .refine((val) => val.password === val.confirmPassword, {
  message: 'Passwords do not match.',
  path: ["confirmPassword"]
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const emailSchema =  z.object({
  email: z.string().email("Please provide a valid email address")
});

export type emailFormData = z.infer<typeof emailSchema>;
