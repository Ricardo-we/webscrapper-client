import { FC } from "react";
import Footer from "../Footer";
import Head from "next/head";
import NavBar from "../Navbar";
import { firstLetterUpperCase } from "../../../libs/utils/string.utils";

interface MainLayoutProps {
	children: JSX.Element | JSX.Element[] | string[] | string;
	viewName?: string;
}

const MainLayout: FC<MainLayoutProps> = ({
	children,
	viewName = "Web scrapper",
}) => {
	return (
		<>
			<Head>
				<title>{firstLetterUpperCase(viewName)}</title>
			</Head>
			<NavBar />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
