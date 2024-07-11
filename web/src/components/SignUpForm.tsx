import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SignUpForm() {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function validFields() {
        const fields = [email, password];
        return fields.every(field => field.trim() !== '');
    }

    function handleSignUp(event: FormEvent) {
        event.preventDefault();
        if (!validFields()) return;
        console.log({
            name: `${firstName} ${lastName}`,
            email, 
            password
        });
    }

    return (
        <form className="md:w-[400px] w-[90vw] flex flex-col gap-6" onSubmit={handleSignUp}>
            <header className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-center">
                    Let's start chating
                </h1>
                <p className="text-muted-foreground text-sm text-center">
                    Enter your informations below to create your account
                </p>
            </header>
            <div className="flex flex-col gap-2">
                <Input 
                    type="text" 
                    placeholder="your first Name" 
                    onChange={event => setFirstName(event.target.value)}
                    required
                />
                <Input 
                    type="text" 
                    placeholder="your last Name" 
                    onChange={event => setLastName(event.target.value)}
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