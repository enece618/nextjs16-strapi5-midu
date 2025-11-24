"use client";
import Link from "next/link";
import { actions } from "@/actions";

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
import { type FormState } from "@/validations/auth";
import { FormError } from "./form-error";

const styles = {
    container: "flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
    form: "w-full max-w-md",
    card: "w-full max-w-md",
    cardHeader: "w-full max-w-md",
    cardContent: "w-full max-w-md space-y-4",
    cardFooter: "w-full max-w-md grid",
    divLink: "w-full max-w-md",
    link: "text-blue-500 hover:text-blue-600"
}

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

export function SignUpForm() {
    const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE);

    console.log(formState);

    return (
        <div>
            <form action={formAction}>
                <Card className={styles.card}>
                    <CardHeader className={styles.cardHeader}>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Sign up to your account</CardDescription>
                    </CardHeader>
                    <CardContent className={styles.cardContent}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="John Doe"
                                    defaultValue={formState.data?.username ?? ''}
                                />
                                <FormError error={formState.zodErrors?.username} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    defaultValue={formState.data?.email ?? ''}
                                />
                                <FormError error={formState.zodErrors?.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    defaultValue={formState.data?.email ?? ''}
                                />
                                <FormError error={formState.zodErrors?.password} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={styles.cardFooter}>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        {
                            formState.strapiErrors && (
                                <p className="text-pink-500 text-xs italic mt-1 py-2">{formState.strapiErrors.message}</p>
                            )
                        }
                    </CardFooter>
                </Card>
                <div className={styles.divLink}>
                    Already have an account?
                    <Link className={styles.link} href="signin">
                        <span className="ml-1">Sign In</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}