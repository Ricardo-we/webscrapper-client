import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { FC, useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { BackDropLoader } from "../components/base/Spinner";
import MainLayout from "../components/base/Layouts/MainLayout";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../stores/app.store";
import { useRouter } from "next/router";

const Loader = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleLoadingStart = (url: string) =>
		url !== router.asPath && setIsLoading(true);
	const handleLoadingComplete = (url: string) => setIsLoading(false);

	useEffect(() => {
		router.events.on("routeChangeStart", handleLoadingStart);
		router.events.on("routeChangeComplete", handleLoadingComplete);
		router.events.on("routeChangeError", handleLoadingComplete);

		return () => {
			router.events.off("routeChangeStart", handleLoadingStart);
			router.events.off("routeChangeComplete", handleLoadingComplete);
			router.events.off("routeChangeError", handleLoadingComplete);
		};
	}, []);

	return isLoading ? <BackDropLoader /> : <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const routeDocumentTitle =
		router.asPath.split("/")[1].split("?")[0] || "Home";

	return (
		<ReduxProvider store={store}>
			<Loader>
				<MainLayout viewName={routeDocumentTitle}>
					<Component {...pageProps} />
				</MainLayout>
			</Loader>
		</ReduxProvider>
	);
}

export default MyApp;
