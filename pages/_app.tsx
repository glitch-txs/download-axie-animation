import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AxieProvider from '../context/useContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AxieProvider>
      <Component {...pageProps} />
    </AxieProvider>
  )
}

export default MyApp