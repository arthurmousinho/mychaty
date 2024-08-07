import { SearchX } from "lucide-react";

export function EmptyListMessage() {
    return (
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground justify-center">
            <SearchX size={20} />
            Nothing here...
        </span>
    )
}