import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { Heading } from "../text/Heading";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const avatars = [
    'https://ui.shadcn.com/avatars/01.png',
    'https://ui.shadcn.com/avatars/02.png',
    'https://ui.shadcn.com/avatars/03.png',
    'https://ui.shadcn.com/avatars/04.png',
    'https://ui.shadcn.com/avatars/05.png',
]

export function SignUpForm() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ avatar, setAvatar ] = useState(avatars[0]);

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
            password,
            avatar
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
                <Select onValueChange={value => setAvatar(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="your avatar" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            avatars.map((url, index) => (
                                <SelectItem value={url} className="cursor-pointer">
                                    <div className="flex items-center gap-4 flex-row w-full h-full">
                                        <img src={url} alt={url} className="w-[30px] rounded-full" />
                                        <span>Avatar {index + 1}</span>
                                    </div>
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
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