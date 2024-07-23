import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, useUser } from "@/hooks/useUser";
import { FormEvent, useEffect, useState } from "react";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export function Account() {

    const [ user, setUser ] = useState<User>();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');

    const { getLoggedUser, updateUser, deleteUser } = useUser();
    const { toast } = useToast();

    async function loadUserInfos() {
        const userInfos = await getLoggedUser();
        if (!userInfos) return;
        setUser(userInfos);
        setName(userInfos.name);
        setEmail(userInfos.email);
    }

    async function handleEditUser(event: FormEvent) {
        event.preventDefault();
        if (name.trim() !== '' && email.trim() !== '') {
            const userUpdated = await updateUser(name, email);
            userUpdated && setUser(userUpdated);
            userUpdated && setName(userUpdated.name);
            userUpdated && setEmail(userUpdated.email);
            return;
        } 
        toast({
            title: "😥 Error",
            variant: 'destructive',
            description: 'Fill in all fields',
        });
    }

    async function handleDeleteUser() {
        await deleteUser();
    }

    useEffect(() => {
        loadUserInfos();
    }, []);

    return (
        <div className="w-full space-y-4">
            <header className="border-b p-4">
                <h1 className="text-2xl font-semibold">
                    My Account
                </h1>
            </header>
            <main className="flex flex-col gap-4 items-center">
                <form className="space-y-2 w-[500px]" onSubmit={handleEditUser}>
                    <h2 className="text-xl font-semibold">
                        Your Informations
                    </h2>
                    <Input 
                        placeholder="Your useraname" 
                        type="text" 
                        defaultValue={user?.name}
                        onChange={event => setName(event.target.value)} 
                    />
                    <Input 
                        placeholder="Your email" 
                        type="email"  
                        defaultValue={user?.email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Button 
                        className="w-full" 
                        type="submit"
                    >
                        Save Changes
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger className="w-full">
                            <Button 
                                type="button"
                                className="w-full text-red-500 bg-transparent hover:bg-red-500 hover:text-slate-50 transition-colors border border-red-500" 
                            >
                                Delete my account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={handleDeleteUser}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </form>
            </main>
        </div>
    )
}