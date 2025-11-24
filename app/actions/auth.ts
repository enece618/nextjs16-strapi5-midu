"use server"

import { registerUserService } from "@/lib/strapi";
import { SignUpFormSchema, type FormState } from "@/validations/auth";
import z from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieConfig = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    domain: process.env.HOST ?? 'localhost',
    secure: process.env.NODE_ENV === 'production',
}

export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log("Hello from registerUserAction");

    const fields = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const validatedFields = SignUpFormSchema.safeParse(fields);

    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error)

        console.log("Validation Errors", flattenedErrors.fieldErrors);

        return {
            success: false,
            message: "Validation Failed",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields
        }

    }

    const response = await registerUserService(validatedFields.data)

    if (!response || response.error) {
        return {
            success: false,
            message: "Registration Failed",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    const cookieStore = await cookies()
    cookieStore.set('jwt', response.jwt, cookieConfig)

    redirect('/dashboard')
}