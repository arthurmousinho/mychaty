import { ReactNode } from "react";

type HeadingProps = {
    variant: 'primary' | 'secondary';
    children: ReactNode;
}

export function Heading(props: HeadingProps) {
    if (props.variant === 'primary') {
        return (
            <h1 className="text-2xl font-semibold">
                { props.children }
            </h1>
        )
    }
    
    if (props.variant === 'secondary') {
        return (
            <h1 className="text-xl font-semibold">
                { props.children }
            </h1>
        )
    }
}