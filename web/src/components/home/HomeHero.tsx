import { MessageSquare } from "lucide-react";
import { AuthDialog } from "../auth/AuthDialog";
import { Button } from "../ui/button";

import heroImage from "../../../assets/hero.svg"

export function HomeHero() {
    return (
        <section className="max-w-[1200px] w-[90vw] md:mt-0 pt-12 flex flex-row justify-between items-center">
            <header className="flex flex-col gap-4 max-w-[587px]">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                    Your easiest real-time chatting app
                </h1>
                <span className="text-sm md:text-base text-muted-foreground">
                    Connect and communicate seamlessly with our easy-to-use chat platform. Whether you're sharing ideas or just catching up, we make communication effortless and efficient.
                </span>
                <footer>
                    <AuthDialog>
                        <Button className="flex items-center gap-2">
                            Start chatting
                            <MessageSquare size={20} />
                        </Button>
                    </AuthDialog>
                </footer>
            </header>
            <img 
                src={heroImage} 
                className="w-[50%] md:block hidden" 
                alt="Hero Image" 
            />
        </section>
    )
}