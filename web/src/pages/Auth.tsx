import { SignInForm } from "@/components/forms/SignInForm";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Auth() {

    const [ createAccount, setCreateAccount ] = useState(false);

    return (
        <main className="w-screen h-screen flex md:flex-row flex-col items-center overflow-x-hidden">
            <div className="h-screen w-[50vw] md:flex hidden items-center justify-center relative">
                <Logo />
                <img 
                    src="../../assets/login-hero.svg" 
                    alt="Social media illustrations by Storyset" 
                />
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