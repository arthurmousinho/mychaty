import { Chat } from "@/components/Chat"
import { ChatCard } from "@/components/ChatCard"
import { Sidebar } from "@/components/Sidebar"

const chats = [
    {
        title: 'Diego Fernandes',
        avatar: 'https://github.com/diego3g.png',
        online: true,
    },
    {
        title: 'Mayk Brito',
        avatar: 'https://github.com/maykbrito.png',
        online: true,
    },
    {
        title: 'Daniel Castro',
        avatar: 'https://github.com/odanieldcs.png',
        online: true,
    },
    {
        title: 'Matheus Fraga',
        avatar: 'https://github.com/devfraga.png',
        online: true,
    },
    {
        title: 'Vinícius Barbosa',
        avatar: 'https://github.com/viniciusbarbosa1344.png',
        online: false,
    },
    {
        title: 'Arthur Mousinho',
        avatar: 'https://github.com/arthurmousinho.png',
        online: false,
    },
]

export function Chats() {
    return (
        <main className="flex h-screen w-screen">
            <Sidebar />
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
                                <ChatCard 
                                    avatar={chat.avatar} 
                                    title={chat.title} 
                                    online={chat.online} 
                                />
                            )
                        )
                    }
                </div>
            </aside>
            <Chat />
        </main>
    )
}