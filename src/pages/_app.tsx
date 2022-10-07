import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { FC, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { BackDropLoader } from '../components/base/Spinner'
import MainLayout from '../components/base/Layouts/MainLayout';
import NavBar from '../components/base/Navbar'
import { Provider as ReduxProvider } from "react-redux"
import { store } from '../stores/app.store'
import { useRouter } from 'next/router'

const Loader = ({ }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLoadingStart = (url: string) => (url !== router.asPath) && setIsLoading(true);
  const handleLoadingComplete = (url: string) => setIsLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleLoadingStart)
    router.events.on("routeChangeComplete", handleLoadingComplete)
    router.events.on("routeChangeError", handleLoadingComplete)

    return () => {
      router.events.off("routeChangeStart", handleLoadingStart)
      router.events.off("routeChangeComplete", handleLoadingComplete)
      router.events.off("routeChangeError", handleLoadingComplete)
    }
  }, [])

  return isLoading ? (
    <BackDropLoader />
  ) : <></>
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ReduxProvider store={store}>
      <Loader />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ReduxProvider>
  )
}

export default MyApp
