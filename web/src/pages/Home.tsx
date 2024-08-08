
import { Button } from "@/components/ui/button";
import { BellRing, Code, Github, GithubIcon, HomeIcon, Linkedin, MessageSquare, MessageSquareDot, Rocket, UserRound, UserRoundCheck, UserRoundPlus, UsersRound } from "lucide-react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/global/Logo";
import { Link } from "react-router-dom";

import heroImage from "../../assets/login-hero.svg";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

import dockerLogo from '../../assets/techs/docker-4.svg';
import typescriptLogo from '../../assets/techs/typescript.svg';
import fastifyLogo from '../../assets/techs/fastify.svg';
import gitLogo from '../../assets/techs/git-icon.svg';
import nodeLogo from '../../assets/techs/nodejs-1.svg';
import postgresLogo from '../../assets/techs/postgresql.svg'; 
import prismaLogo from '../../assets/techs/prisma-3.svg';
import reactLogo from '../../assets/techs/react-2.svg';
import socketIoLogo from '../../assets/techs/socket-io-1.svg';
import viteLogo from '../../assets/techs/vitejs.svg';
import tailwindLogo from '../../assets/techs/tailwind-css-2.svg';
import shadcnLogo from '../../assets/techs/shadcn-ui.png';

const logos = [
    { 
        logo: dockerLogo, 
        title: 'Docker', 
        description: 'Used to containerize the chat application, ensuring consistent environments for development, testing, and deployment.' 
    },
    { 
        logo: typescriptLogo, 
        title: 'TypeScript', 
        description: 'Enhanced code quality and maintainability by adding static typing to JavaScript, helping to catch errors early in the development process.' 
    },
    { 
        logo: fastifyLogo, 
        title: 'Fastify', 
        description: 'Chosen for its high-performance capabilities, it served as the backend framework, handling HTTP requests and managing chat-related APIs.' 
    },
    { 
        logo: gitLogo, 
        title: 'Git', 
        description: 'Utilized for version control, allowing the team to track changes, collaborate effectively, and maintain the project\'s codebase.' 
    },
    { 
        logo: nodeLogo, 
        title: 'Node.js', 
        description: 'Powered the server-side logic of the chat application, enabling real-time data processing and handling concurrent connections efficiently.' 
    },
    { 
        logo: postgresLogo, 
        title: 'PostgreSQL', 
        description: 'Served as the primary database, storing user information, chat history, and managing relational data with strong consistency.' 
    },
    { 
        logo: prismaLogo, 
        title: 'Prisma ORM', 
        description: 'Simplified database interactions by providing an intuitive ORM, allowing for seamless integration with PostgreSQL and ensuring type-safe queries.' 
    },
    { 
        logo: reactLogo, 
        title: 'React', 
        description: 'Used to build the front-end of the chat application, offering a dynamic and responsive user interface with component-based architecture.' 
    },
    { 
        logo: socketIoLogo, 
        title: 'Socket.IO', 
        description: 'Enabled real-time, bi-directional communication between the server and clients, crucial for delivering instant chat messages and updates.' 
    },
    { 
        logo: viteLogo, 
        title: 'Vite', 
        description: 'Facilitated fast development and build processes, allowing the team to quickly iterate on the front-end codebase with minimal configuration.' 
    },
    { 
        logo: tailwindLogo, 
        title: 'Tailwind CSS', 
        description: 'Streamlined the styling of the chat application by providing utility-first CSS classes, enabling rapid and consistent UI design.' 
    },
    { 
        logo: shadcnLogo, 
        title: 'Shadcn/ui', 
        description: 'Leveraged for pre-built, production-ready React components, helping to accelerate UI development with Tailwind CSS integration.' 
    }
];

export function Home() {
    return (
        <main className="w-full overflow-x-hidden overflow-y-hidden flex flex-col justify-center items-center space-y-10">
            <header className="max-w-[1200px] w-full flex flex-row items-center justify-between pt-4">
                <Logo />
                <Card className="flex flex-row items-center gap-4 p-1">
                    <Button variant={'ghost'} className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors">
                        <HomeIcon size={20} />
                        Home
                    </Button>
                    <Button variant={'ghost'} className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors">
                        <Rocket size={20} />
                        Features
                    </Button>
                    <Button variant={'ghost'} className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors">
                        <Code size={20} />
                        Tech Stack
                    </Button>
                    <Button variant={'ghost'} className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors">
                        <UsersRound size={20} />
                        Developers
                    </Button>
                    <Button variant={'ghost'} className="flex items-center gap-2 text-primary hover:bg-primary hover:text-slate-50 transition-colors">
                        <Github size={20} />
                        Github
                    </Button>
                </Card>
                <Button>
                    Sign In
                </Button>
            </header>
            <section className="max-w-[1200px] w-full flex flex-row justify-between items-center">
                <header className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold text-slate-900">
                        Your easiest real-time chatting app
                    </h1>
                    <span className="text-base text-muted-foreground">
                        Connect and communicate seamlessly with our easy-to-use chat platform. Whether you're sharing ideas or just catching up, we make communication effortless and efficient.
                    </span>
                    <footer>
                        <Button className="flex items-center gap-2">
                            Start chatting
                            <MessageSquare size={20} />
                        </Button>
                    </footer>
                </header>
                <img src={heroImage} className="w-[50%]" alt="Hero Image" />
            </section>
            <div className="space-y-16">
                <section className="max-w-[1200px] w-full flex flex-col gap-4">
                    <header>
                        <h2 className="text-4xl font-bold text-slate-900">
                            Features
                        </h2>
                    </header>
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                <MessageSquareDot className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Real-Time Messaging
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Instantly connect and communicate with your friends through real-time messaging. Whether you're coordinating plans or just catching up.
                                </span>
                            </CardFooter>
                        </Card>
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                <UserRoundPlus className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Invite your Friends
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Easily expand your network by inviting friends to join the platform. Share unique invite links and get your friends onboard quickly to start chatting and connecting.
                                </span>
                            </CardFooter>
                        </Card>
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold leading-relaxed">
                                <UsersRound className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Manage Your Friends
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Take control of your social circle with our comprehensive friend management tools. Organize, categorize.
                                </span>
                            </CardFooter>
                        </Card>
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                <UserRoundCheck className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Manage Your Invites
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Keep track of the invitations you’ve sent and received. Accept or decline invites, and manage your pending connections easily.
                                </span>
                            </CardFooter>
                        </Card>
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                <UserRound className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Manage Your Account
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Customize and manage your account settings. Update your profile, change your password, and control your privacy preferences all in one place.
                                </span>
                            </CardFooter>
                        </Card>
                        <Card className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                <BellRing className="text-primary"/>
                                <h3 style={{marginTop: 0}}>
                                    Messages Notifications
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    Stay informed with real-time notifications for new messages. Never miss an important conversation or update with customizable alerts.
                                </span>
                            </CardFooter>
                        </Card>
                    </div>
                </section>

                <section className="max-w-[1200px] w-full flex flex-col gap-4">
                    <header>
                        <h2 className="text-4xl font-bold text-slate-900">
                            Tech Stack
                        </h2>
                    </header>
                        <Carousel 
                            className="w-full"
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                  delay: 2000,
                                }),
                            ]}
                        >
                            <CarouselContent>
                               {
                                    logos.map(item => (
                                        <CarouselItem className="basis-1/3">
                                            <Card className="h-full select-none hover:bg-slate-50">
                                                <CardHeader className="flex flex-row gap-6 items-center">
                                                    <img 
                                                        src={item.logo} 
                                                        alt={item.title}
                                                        className="w-[50px] h-[50px]"
                                                    />
                                                    <header>
                                                        <h3 style={{marginTop: 0}} className="font-semibold">
                                                            {item.title}
                                                        </h3>
                                                        <span className="text-sm text-muted-foreground leading-relaxed">
                                                            {item.description}
                                                        </span>
                                                    </header>
                                                </CardHeader>
                                            </Card>
                                        </CarouselItem>
                                    ))
                               }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                </section>

                <section className="max-w-[1200px] w-full flex flex-col gap-4">
                    <header>
                        <h2 className="text-4xl font-bold text-slate-900">
                            Developers
                        </h2>
                    </header>
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="select-none hover:bg-slate-50">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <img 
                                   src="https://github.com/arthurmousinho.png" 
                                   alt="Arthur Mousinho"
                                   className="w-[50px] rounded-full" 
                                />
                                <header>
                                    <h3 style={{marginTop: 0}} className="font-semibold">
                                        Arthur Mousinho
                                    </h3>
                                    <span className="text-sm text-muted-foreground">
                                        FullStack Developer
                                    </span>
                                </header>
                            </CardHeader>
                            <CardFooter className="flex items-center gap-4">
                                <Link to={'https://github.com/arthurmousinho'} target="_blank">
                                    <Button variant={'outline'} className="text-muted-foreground hover:border-primary hover:text-primary hover:bg-transparent">
                                        <GithubIcon size={20} />
                                    </Button>
                                </Link>
                                <Link to={'https://www.linkedin.com/in/arthurmousinho/'} target="_blank">
                                    <Button variant={'outline'} className="text-muted-foreground hover:border-primary hover:text-primary hover:bg-transparent">
                                        <Linkedin size={20} />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </section>
            </div>
            <footer>

            </footer>
        </main>
    )
}