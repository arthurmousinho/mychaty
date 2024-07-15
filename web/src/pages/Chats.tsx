import { ChatArea } from "@/components/chat/ChatArea"
import { UserCard } from "@/components/global/UserCard"

const chats = [
    {
        name: 'Diego Fernandes',
        online: true,
    },
    {
        name: 'Mayk Brito',
        online: true,
    },
    {
        name: 'Daniel Castro',
        online: true,
    },
    {
        name: 'Matheus Fraga',
        online: true,
    },
    {
        name: 'Vinícius Barbosa',
        online: false,
    },
    {
        name: 'Arthur Mousinho',
        online: false,
    },
]

export function Chats() {
    return (
        <div className="flex w-full">
            <aside className="w-[350px] py-4 flex flex-col gap-4 bg-slate-50">
                <header className="w-full px-4">
                    <h1 className="text-xl font-semibold">
                        Chats
                    </h1>
                </header>
                <div className="flex flex-col ml-2 mr-2">
                    {
                        chats.map(
                            chat => (
                                <UserCard 
                                    key={chat.name}
                                    name={chat.name} 
                                    online={chat.online} 
                                />
                            )
                        )
                    }
                </div>
            </aside>
            <ChatArea />
        </div>
    )
}