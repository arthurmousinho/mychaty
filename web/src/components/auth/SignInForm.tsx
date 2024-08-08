import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { Heading } from "../text/Heading";

export function SignInForm() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { signIn } = useUser();

    function validFields() {
        const fields = [email, password];
        return fields.every(field => field.trim() !== '');
    }

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();

        if (!validFields()) return;

        await signIn(email, password);
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
            <header className="flex flex-col gap-2">
                <div className="text-center">
                    <Heading variant="primary">
                        Wellcome Back
                    </Heading>
                </div>
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