import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquareCode } from "lucide-react";
import { FormEvent, useState } from "react";

export function Login() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function validFields() {
        const fields = [email, password];
        return fields.every(field => field.trim() !== '');
    }

    function handleSignIn(event: FormEvent) {
        event.preventDefault();
        if (!validFields()) return;
        console.log({email, password});
    }

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
                <form className="md:w-[400px] w-[90vw] flex flex-col gap-6" onSubmit={handleSignIn}>
                    <header className="flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold text-center">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground text-sm text-center">
                            Enter your credentials below to access your account
                        </p>
                    </header>
                    <div className="flex flex-col gap-2">
                        <Input 
                            type="email" 
                            placeholder="name@example.com" 
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <Input 
                            type="password" 
                            placeholder="*******" 
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                        <Button>
                            Sign In
                        </Button>
                        <Button 
                            variant={'outline'} 
                            className="text-muted-foreground"
                        >
                            Create my account
                        </Button>
                    </div>
                </form>
            </div>            
        </main>
    )
}