import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SignInForm() {

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
            </div>
        </form>
    )
}