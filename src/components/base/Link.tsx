import { AnchorHTMLAttributes, FunctionComponent } from "react";

import NextLink from "next/link";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
	children?: JSX.Element | string;
	active?: boolean;
}

const Link: FunctionComponent<LinkProps> = ({
	to,
	children,
	active = false,
	className,
	...props
}) => {
	const activeClass = active ? "bg-indigo-700 text-white " : "text-gray-700 ";

	return (
		<NextLink href={to}>
			<a
				className={
					"block py-2 pr-4 pl-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent " +
					activeClass +
					className
				}
				style={{ cursor: "pointer" }}
				{...props}
			>
				{children}
			</a>
		</NextLink>
	);
};

export interface PlainLinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
	children?: JSX.Element | JSX.Element[] | string | string[];
}

export const PlainLink: FunctionComponent<PlainLinkProps> = ({
	to,
	children,
	...props
}) => {
	return (
		<NextLink href={to}>
			<a {...props}>{children}</a>
		</NextLink>
	);
};

export default Link;
