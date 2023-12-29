import Footer from '@/components/footer'
import Header from '@/components/header'
import { AppConfig } from '@/utils/AppConfig'
import { Providers } from '@/utils/providers'
import { HeaderProps } from '@/utils/types'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import './globals.css'
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'

const MyApp = ({ Component, pageProps }: AppProps) => {
    const menus: HeaderProps[] = [
        // { url: '/', label: 'Home' },
        { url: '/posts', label: 'Posts' },
        { url: '/about', label: 'About' },
    ]

    return (
        <Providers options={{ key: 'mui-theme' }}>
            <AppCacheProvider>
                <Head>
                    <title>{AppConfig.title}</title>
                    <meta name='description' content={AppConfig.description} />
                </Head>
                <Header menus={menus} />
                <main style={{ paddingTop: '2rem' }}>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </AppCacheProvider>
        </Providers>
    )
}

export default MyApp
