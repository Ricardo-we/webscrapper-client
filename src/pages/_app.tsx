import '../styles/globals.css'

import type { AppProps } from 'next/app'
import NavBar from '../components/base/Navbar'
import { Provider as ReduxProvider } from "react-redux"
import { store } from '../stores/app.store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <NavBar />
      <Component {...pageProps} />
    </ReduxProvider>
  )
}

export default MyApp
