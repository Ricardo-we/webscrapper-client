import { FunctionComponent, useState } from "react";
import Link, { PlainLink } from "./Link";
import { VscSearch, VscThreeBars } from "react-icons/vsc";

import IconButton from "./Buttons/IconButton";
import navStyles from "../../styles/components/navbar.module.css";
import useLanguage from "../../hooks/useLanguage";

interface NavBarProps {

}

const NavBarLinkItem = ({ children, to, active = false }: { active?: boolean, children: string | JSX.Element, to: string }) => {
    return (
        <li className="w-full md:w-fit">
            <Link className="w-full" to={to} active={active}>{children}</Link>
        </li>
    )
}

const NavBar: FunctionComponent<NavBarProps> = ({ }) => {
    const { language } = useLanguage("es");
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    return (
        <nav
            className="bg-white  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky top-0 z-30"
        >
            <div className={`container flex flex-wrap justify-between items-center mx-auto h-auto w-fill`}>
                <PlainLink to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        {language?.general?.appName}
                    </span>
                </PlainLink>


                <IconButton
                    size={40}
                    className={`ml-auto rounded sm:flex md:hidden`}
                    onClick={() => setNavOpen(prev => !prev)}
                >
                    <VscThreeBars
                        size={20}
                        className="text-indigo-700"
                    />
                </IconButton>


                <div
                    className={`${navStyles["nav-items-container"]} ${navOpen && navStyles["nav-items-container-collapsed"]}`}
                >
                    <ul
                        className="flex flex-col md:flex-row  p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full overflow-hidden items-center justify-center"
                    >
                        <div className="flex flex-row items-center justify-evenly md:w-5/12 w-full">
                            <input
                                className="outline-none bg-white p-2 w-full rounded-sm"
                                placeholder={language?.fields["search"]}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <PlainLink to={`/search-view?search=${search}`} className="rounded-sm p-2 bg-indigo-800">
                                <VscSearch
                                    size={20}
                                    color="white"
                                />
                            </PlainLink>
                        </div>
                        <NavBarLinkItem to="#">Home</NavBarLinkItem>
                        <NavBarLinkItem to="#">Abput</NavBarLinkItem>
                        <NavBarLinkItem to="#">Services</NavBarLinkItem>
                        <NavBarLinkItem to="#">Contect</NavBarLinkItem>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;