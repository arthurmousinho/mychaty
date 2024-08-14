import { Link } from "react-router-dom";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { GithubIcon, Linkedin } from "lucide-react";

export function HomeDevelopers() {
    return (
        <section className="Developers max-w-[1200px] w-[90vw] flex flex-col gap-4">
            <header>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
                    Developers
                </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    )
}