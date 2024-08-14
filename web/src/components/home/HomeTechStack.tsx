import { Card, CardHeader } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

import Autoplay from "embla-carousel-autoplay"

import dockerLogo from '../../../assets/techs/docker-4.svg';
import typescriptLogo from '../../../assets/techs/typescript.svg';
import fastifyLogo from '../../../assets/techs/fastify.svg';
import gitLogo from '../../../assets/techs/git-icon.svg';
import nodeLogo from '../../../assets/techs/nodejs-1.svg';
import postgresLogo from '../../../assets/techs/postgresql.svg'; 
import prismaLogo from '../../../assets/techs/prisma-3.svg';
import reactLogo from '../../../assets/techs/react-2.svg';
import socketIoLogo from '../../../assets/techs/socket-io-1.svg';
import viteLogo from '../../../assets/techs/vitejs.svg';
import tailwindLogo from '../../../assets/techs/tailwind-css-2.svg';
import shadcnLogo from '../../../assets/techs/shadcn-ui.png';

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

export function HomeTechStack() {
    return (
        <section className="max-w-[1200px] w-[90vw] flex flex-col gap-4">
            <header>
                <h2 className="Tech Stack text-2xl md:text-4xl font-bold text-slate-900">
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
                        logos.map((item, index) => (
                            <CarouselItem className="md:basis-1/3" key={index}>
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
    )
}