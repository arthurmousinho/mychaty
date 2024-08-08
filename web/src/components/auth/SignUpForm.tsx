import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { Heading } from "../text/Heading";

export function SignUpForm() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { signUp } = useUser();

    function validFields() {
        const fields = [email, password, name];
        return fields.every(field => field.trim() !== '');
    }

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (!validFields()) return;

        const user = {
            name,
            email, 
            password
        }

        await signUp(user as any);
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
            <header className="flex flex-col gap-2">
                <div className="text-center">
                    <Heading variant="primary">
                        Let's start chating
                    </Heading>
                </div>
                <p className="text-muted-foreground text-sm text-center">
                    Enter your informations below to create your account
                </p>
            </header>
            <div className="flex flex-col gap-2">
                <Input 
                    type="text" 
                    placeholder="your name" 
                    onChange={event => setName(event.target.value)}
                    required
                />
                <Input 
                    type="email" 
                    placeholder="your best email" 
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <Input 
                    type="password" 
                    placeholder="create strong password" 
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <Button>
                    Sign Up
                </Button>
            </div>
        </form>
    )
}