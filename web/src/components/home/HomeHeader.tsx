import { Link } from "react-scroll";
import { Logo } from "../global/Logo";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { HomeIcon, Rocket, Code, UsersRound, Github, Menu } from "lucide-react";
import { AuthDialog } from "../auth/AuthDialog";

import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export function HomeHeader() {

    const links = [
        { title: "Home", icon: <HomeIcon size={20} />, to: "Home" },
        { title: "Features", icon: <Rocket size={20} />, to: "Features" },
        { title: "Tech Stack", icon: <Code size={20} />, to: "Tech Stack" },
        { title: "Developers", icon: <UsersRound size={20} />, to: "Developers" },
        { title: "Github", icon: <Github size={20} />, to: "https://github.com/arthurmousinho/mychaty" },
    ];

    return (
        <header className="w-[90vw] max-w-[1200px] flex flex-row items-center justify-between pt-4 fixed top-0 bg-white py-2">
            <div className="flex items-center gap-4">
                <Menubar className="w-full h-full md:hidden block">
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Menu className="text-muted-foreground" />
                        </MenubarTrigger>
                        <MenubarContent>
                            {
                                links.map((link, index) => (
                                    link.title !== 'Github' ? 
                                    <Link 
                                        key={index} 
                                        to={link.to} 
                                        smooth={true} 
                                        duration={500} 
                                    >
                                        <Button 
                                            variant={'ghost'} 
                                            className="flex items-center justify-start gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors w-full"
                                        >
                                            { link.icon }
                                            { link.title }
                                        </Button>
                                    </Link>
                                    : <a href={link.to} target="_blank">
                                        <Button 
                                            variant={'ghost'} 
                                            className="flex items-center justify-start gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors w-full"
                                        >
                                            { link.icon }
                                            { link.title }
                                        </Button>
                                    </a>
                                ))
                            }
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <Logo />
            </div>
            <Card className="hidden md:flex flex-row items-center gap-4 p-1">
                {
                    links.map((link, index) => (
                        link.title !== 'Github'
                        ? <Link 
                            key={index} 
                            to={link.to} 
                            smooth={true} 
                            duration={500} 
                            target={ link.title === "Github" ? "_blank" : "_self" }
                        >
                            <Button 
                                variant={'ghost'} 
                                className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors"
                            >
                                { link.icon }
                                { link.title }
                            </Button>
                        </Link>
                        : <a 
                            href={link.to} 
                            target="_blank"
                            key={index}
                        >
                            <Button 
                                variant={'ghost'} 
                                className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors"
                            >
                                { link.icon }
                                { link.title }
                            </Button>
                        </a>
                    ))
                }
            </Card>
            <AuthDialog>
                <Button>Sign In</Button>
            </AuthDialog>
        </header>
    )
}