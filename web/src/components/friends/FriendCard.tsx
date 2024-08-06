import { Card, CardContent, CardHeader } from "../ui/card";
import defaultAvatar from '../../../assets/default-user-avatar.png'
import { User, useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface FriendCardProps {
    user: User;
}

export function FriendCard(props: FriendCardProps) {

    const { deleteFriendById } = useUser();

    async function handleDeleteUserFriend(id: string) {
        await deleteFriendById(id);
    }

    return (
        <Card className="flex flex-col items-start">
            <CardHeader className="flex flex-row items-center gap-2">
                <img src={defaultAvatar} className="w-[50px] rounded-full"/>
                <strong className="text-muted-foreground">
                    { props.user.name }
                </strong>
            </CardHeader>
            <CardContent className="w-full">
                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Button 
                            className="flex gap-2 items-center text-red-500 border-red-500 hover:bg-red-500 hover:text-slate-50 w-full " 
                            variant={'outline'}
                        >
                            <Trash size={20} />
                            Delete Friend
                        </Button>
                    </AlertDialogTrigger>
                   <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete {props.user.name} from your friends list 
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => handleDeleteUserFriend(props.user.id || '')}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                   </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}