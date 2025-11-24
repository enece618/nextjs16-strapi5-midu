import { z } from "zod";

export const SignInFormShema = z.object({
    identifier: z
        .string()
        .min(3, "username or email must be at least 3 characters long"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long"),
})

export const SignUpFormSchema = z.object({
    username: z
        .string()
        .min(3, "username must be at least 3 characters long")
        .max(20, "username must be at most 20 characters long"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long"),
});

export type SignInFormValues = z.infer<typeof SignInFormShema>;
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export type FormState = {
    success?: boolean;
    message?: string;
    data?: {
        identifier?: string;
        username?: string;
        email?: string;
        password?: string;
    };
    strapiErrors?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>
    } | null;
    zodErrors?: {
        identifier?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
    } | null;
}