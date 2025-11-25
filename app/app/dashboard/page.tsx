import { actions } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function DashboardRoute() {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card
                className="w-full max-w-md"
            >
                <form action={actions.auth.logoutUserAction}>
                    <CardHeader
                        className="w-full max-w-md"
                    >
                        <CardTitle>Logout</CardTitle>
                        <CardDescription>Logout from your account</CardDescription>
                    </CardHeader>
                    <CardFooter
                        className="w-full max-w-md"
                    >
                        <Button variant="destructive" type="submit">Logout</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}