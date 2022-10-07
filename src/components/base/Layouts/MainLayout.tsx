import { FC } from "react";
import Footer from "../Footer";
import NavBar from "../Navbar";

interface MainLayoutProps {
    children: JSX.Element | JSX.Element[] | string[] | string
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;