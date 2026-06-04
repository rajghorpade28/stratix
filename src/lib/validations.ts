import * as z from "zod";

export const nameValidation = z
  .string()
  .min(2, "Name must be at least 2 characters.")
  .max(50, "Name cannot exceed 50 characters.")
  .regex(/^[a-zA-Z\s\-]+$/, "Name can only contain letters, spaces, and hyphens.")
  .trim();

export const emailValidation = z
  .string()
  .email("Please enter a valid email address.")
  .trim()
  .toLowerCase();

export const phoneValidation = z
  .string()
  .min(10, "Phone number must be at least 10 digits.")
  .max(20, "Phone number cannot exceed 20 characters.")
  .regex(/^\+?[0-9\s\-\(\)]+$/, "Please enter a valid phone number.")
  .trim();

export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.");

// Auth Schemas
export const registerSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Password is required."),
});

export const requestPasswordResetSchema = z.object({
  email: emailValidation,
});

export const resetPasswordSchema = z.object({
  password: passwordValidation,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

// Contact/Project Schemas
export const contactSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const websiteProjectSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type."),
  pages: z.string().min(1, "Please select the number of pages."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  description: z.string().min(10, "Please provide some project details."),
});

export const appProjectSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  company: z.string().optional(),
  platform: z.string().min(1, "Please select a platform."),
  features: z.string().min(1, "Please describe the key features."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  description: z.string().min(10, "Please provide some project details."),
});
