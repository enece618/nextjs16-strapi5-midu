"use client";

import Link from "next/link";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { actions } from "@/actions";
import { type FormState } from "@/validations/auth";
import { FormError } from "./form-error";

const INITIAL_STATE: FormState = {
    success: false,
    message: undefined,
    data: {
        username: "",
        email: "",
        password: "",
    },
    strapiErrors: null,
    zodErrors: null,
}

const styles = {
    container: "flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
    form: "w-full max-w-md",
    card: "w-full max-w-md",
    cardHeader: "w-full max-w-md",
    cardContent: "w-full max-w-md space-y-4",
    cardFooter: "w-full max-w-md",
    divLink: "w-full max-w-md",
    link: "text-blue-500 hover:text-blue-600"
}

export function SignInForm() {
    const [formState, formAction] = useActionState(actions.auth.loginUserAction, INITIAL_STATE);
    return (
        <div className={styles.container}>
            <form className={styles.form} action={formAction}>
                <Card className={styles.card}>
                    <CardHeader className={styles.cardHeader}>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Sign in to your account</CardDescription>
                    </CardHeader>
                    <CardContent className={styles.cardContent}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardContent}>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    defaultValue={formState.data?.identifier ?? ''}
                                />
                                <FormError error={formState.zodErrors?.identifier} />
                            </div>
                            <div className={styles.cardContent}>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    defaultValue={formState.data?.password ?? ''}
                                />
                                <FormError error={formState.zodErrors?.password} />
                            </div>
                        </div>
                        {
                            formState.strapiErrors && (
                                <p className="text-pink-500 text-xs italic mt-1 py-2">{formState.strapiErrors.message}</p>
                            )
                        }
                    </CardContent>
                    <CardFooter className={styles.cardFooter}>
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
                <div className={styles.divLink}>
                    Don't have an account?
                    <Link className={styles.link} href="signup">
                        <span className="ml-1">Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}