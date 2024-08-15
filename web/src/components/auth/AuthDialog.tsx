import { Dialog, DialogContent } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Card, CardHeader } from "../ui/card";
import { useToken } from "@/hooks/useToken";
import { Navigate } from "react-router-dom";

interface AuthDialogProps {
    children: ReactNode
}

export function AuthDialog(props: AuthDialogProps) {

    const { hasToken } = useToken();

    return (
        <Dialog>
            <DialogTrigger>
                { props.children }
            </DialogTrigger>
            <DialogContent>
                {
                    hasToken() 
                    ? <Navigate to={'/chats'} />
                    : (
                        <Tabs defaultValue="signin" className="w-full flex flex-col gap-4 mt-6">
                            <TabsList className="w-full">
                                <TabsTrigger value="signin" className="flex-1">Sign In</TabsTrigger>
                                <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent value="signin" className="w-full flex-1">
                                <Card>
                                    <CardHeader>
                                        <SignInForm />
                                    </CardHeader>
                                </Card>
                            </TabsContent>
                            <TabsContent value="signup" className="w-full flex-1">
                                <Card>
                                    <CardHeader>
                                        <SignUpForm />
                                    </CardHeader>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}