import { AppConfig } from '../utils/AppConfig'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import './globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>{AppConfig.title}</title>
                <meta name='description' content={AppConfig.description} />
            </Head>
            <main style={{ paddingTop: '2rem' }}>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
