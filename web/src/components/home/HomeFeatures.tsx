import { 
    BellRing,
    MessageSquareDot,
    UserRound,
    UserRoundCheck,
    UserRoundPlus, 
    UsersRound 
} from "lucide-react";
import { Card, CardFooter, CardHeader } from "../ui/card";

const features = [
    {
        icon: <MessageSquareDot className="text-primary"/>,
        title: 'Real-Time Messaging',
        description: 'Instantly connect and communicate with your friends through real-time messaging. Whether you\'re coordinating plans or just catching up.'
    },
    {
        icon: <UserRoundPlus className="text-primary"/>,
        title: 'Invite your Friends',
        description: 'Easily expand your network by inviting friends to join the platform. Share unique invite links and get your friends onboard quickly to start chatting and connecting.'
    },
    {
        icon: <UsersRound className="text-primary"/>,
        title: 'Manage Your Friends',
        description: 'Take control of your social circle with our comprehensive friend management tools. Organize, categorize.'
    },
    {
        icon: <UserRoundCheck className="text-primary"/>,
        title: 'Manage Your Invites',
        description: 'Keep track of the invitations you’ve sent and received. Accept or decline invites, and manage your pending connections easily.'
    },
    {
        icon: <UserRound className="text-primary"/>,
        title: 'Manage Your Account',
        description: 'Customize and manage your account settings. Update your profile, change your password, and control your privacy preferences all in one place.'
    },
    {
        icon: <BellRing className="text-primary"/>,
        title: 'Messages Notifications',
        description: 'Stay informed with real-time notifications for new messages. Never miss an important conversation or update with customizable alerts.'
    }
];

export function HomeFeatures() {
    return (
        <section className="Features max-w-[1200px] w-[90vw] flex flex-col gap-4">
            <header>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
                    Features
                </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {
                    features.map((feature, index) => (
                        <Card key={index} className="user-select-none hover:bg-slate-50">
                            <CardHeader className="flex items-center gap-2 flex-row font-semibold">
                                {feature.icon}
                                <h3 style={{marginTop: 0}}>
                                    {feature.title}
                                </h3>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </span>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}