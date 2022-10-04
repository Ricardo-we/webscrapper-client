import { FC } from "react";
import { PlainLink } from "./Link";

interface PaginatorProps {
    numPages?: number;
    to: (index: number) => string;
}

const Paginator: FC<PaginatorProps> = ({ to, numPages = 5 }) => {
    return (
        <div className="container flex flex-row items-center justify-evenly">
            {Array.from(Array(numPages).keys()).map(item => (
                <PlainLink
                    to={to(item)}
                    className="w-9 h-9 m-1 p-2 flex items-center justify-center"
                >
                    {item.toString()}
                </PlainLink>
            ))}
        </div>
    );
}

export default Paginator;