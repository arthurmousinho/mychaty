import { Link } from "react-router-dom";

import defaultAvatar from '../../../assets/default-user-avatar.png'

interface ChatCardProps {
    name: string;
    online: boolean;
}

export function UserCard(props: ChatCardProps) {
    return (
        <Link to={''} className="flex items-center gap-4 p-4 hover:bg-slate-100 rounded">
            <img src={defaultAvatar} className="w-[50px] rounded-full" />
            <header>
                <h3 className="font-medium">
                    {props.name}
                </h3>
                {
                    props.online
                    ? <span className="text-sm text-green-500">Online</span>
                    : <span className="text-sm text-red-500">Offline</span>
                }
            </header>
        </Link>
    )
}