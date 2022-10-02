import { FunctionComponent, useState } from "react";

import Link from "./Link";
import navStyle from "../../styles/components/Navbar.module.css";
import useLanguage from "../../hooks/useLanguage";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = ({ }) => {
    const { language } = useLanguage("es");
    const [navOpen, setNavOpen] = useState<boolean>(false);

    return (
        <nav
            className="bg-white  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky top-0 z-30"
        >
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        {language?.general?.appName}
                    </span>
                </a>

                <div className="w-8/12 ml-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-fill">
                        <input
                            className="outline-none bg-white p-1 w-fill rounded-sm"
                            placeholder={language?.fields["search"]}
                            type="text"
                        />
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                        </li>
                        <li>
                            <Link to="#">About</Link>
                        </li>
                        <li>
                            <Link to="#">Services</Link>
                        </li>
                        <li>
                            <Link to="#">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;