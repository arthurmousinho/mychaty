import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeTechStack } from "@/components/home/HomeTechStack";
import { HomeDevelopers } from "@/components/home/HomeDevelopers";

export function Home() {
    return (
        <main className="Home w-full overflow-x-hidden overflow-y-hidden flex flex-col justify-center items-center space-y-10 mb-10">
            <HomeHeader />
            <HomeHero />
            <div className="space-y-8 md:space-y-16">
                <HomeFeatures />
                <HomeTechStack />
                <HomeDevelopers />
            </div>
        </main>
    )
}