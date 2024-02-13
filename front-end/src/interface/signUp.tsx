import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    firstName:z.string().min(1, "Password must be at least 1 characters"),
    lastName:z.string().min(1, "Password must be at least 1 characters"),
    password: z.string().min(10, "Password must be at least 1 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export interface  UserSignUp  {
  email: String,
  firstName: String,
  lastName: String,
  password: String
  confirmPassword: String,
}