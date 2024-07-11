import { SignInForm } from "@/components/forms/SignInForm";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { Button } from "@/components/ui/button";
import { MessageSquareCode } from "lucide-react";
import { useState } from "react";

export function SignIn() {

    const [ createAccount, setCreateAccount ] = useState(false);

    return (
        <main className="w-screen h-screen flex md:flex-row flex-col items-center">
            <div className="h-screen w-[50vw] md:flex hidden items-center justify-center relative">
                <h1 className="absolute top-10 left-10 flex items-center text-xl font-bold gap-2 text-blue-500">
                    <MessageSquareCode size={25} strokeWidth={2.5} />
                    myChaty
                </h1>
                <img src="../../assets/login-hero.svg" alt="Social media illustrations by Storyset" />
            </div>
            <div className="h-screen md:w-[50vw] w-screen flex items-center justify-center">
                <div className="flex flex-col gap-2">
                    {
                        createAccount 
                        ? <SignUpForm />
                        : <SignInForm />
                    }
                    <Button 
                        variant={'outline'} 
                        className="text-muted-foreground"
                        onClick={() => setCreateAccount(!createAccount)}
                    >
                        {
                            createAccount 
                            ? 'I already have an account'
                            : 'Create my account'
                        }
                    </Button>
                </div>
            </div>            
        </main>
    )
}