
import { Button } from "@/components/ui/button";
import { GithubIcon, Linkedin } from "lucide-react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-scroll";

import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeTechStack } from "@/components/home/HomeTechStack";

export function Home() {
    return (
        <main className="Home w-full overflow-x-hidden overflow-y-hidden flex flex-col justify-center items-center space-y-10 mb-10">
            <HomeHeader />
            <HomeHero />
            <div className="space-y-16">
                <HomeFeatures />
                <HomeTechStack />

                <section className="Developers max-w-[1200px] w-full flex flex-col gap-4">
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
        </main>
    )
}