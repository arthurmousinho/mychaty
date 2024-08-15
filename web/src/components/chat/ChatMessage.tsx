interface ChatMessageProps {
    content: string;
    fromLoggedUser: boolean;
}

export function ChatMessage(props: ChatMessageProps) {

    return (
        <div 
            className={`p-3 rounded-xl max-w-xs w-fit
                ${
                    props.fromLoggedUser
                    ? 'bg-blue-500 rounded-br-none self-end'
                    : 'bg-blue-400 rounded-bl-none self-start'
                }    
            `}
        >
            <span className="text-slate-50">
                { props.content }
            </span>
        </div>
    )
}