import { z } from 'zod';

// Candidate signup validation schema
export const candidateSignupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  phone: z.string().optional().refine((phone) => !phone || /^\+?[\d\s-()]+$/.test(phone), {
    message: 'Invalid phone number format'
  })
});

// Organisation signup validation schema
export const organisationSignupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be less than 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  phone: z.string().optional().refine((phone) => !phone || /^\+?[\d\s-()]+$/.test(phone), {
    message: 'Invalid phone number format'
  }),
  organization: z.string().min(1, 'Organization name is required').max(100, 'Organization name must be less than 100 characters')
});

// Signin validation schema
export const signinSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

// Profile update validation schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters').optional(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters').optional(),
  phone: z.string().optional().refine((phone) => !phone || /^\+?[\d\s-()]+$/.test(phone), {
    message: 'Invalid phone number format'
  }),
  organization: z.string().max(100, 'Organization name must be less than 100 characters').optional()
});

export type CandidateSignupInput = z.infer<typeof candidateSignupSchema>;
export type OrganisationSignupInput = z.infer<typeof organisationSignupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;