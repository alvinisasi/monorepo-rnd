import Footer from '@/components/footer';
import Header from '@/components/header';
import { Providers } from '@/utils/providers';
import { HeaderProps } from '@/utils/types';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import App from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const menus: HeaderProps[] = [
        { url: '/', label: 'Home' },
        { url: '/posts', label: 'Posts' },
        { url: '/about', label: 'About' }
    ]

    return (
        <Providers options={{ key: 'mui-theme' }}>
            <Header menus={menus} />
            <Component {...pageProps} />
            <Footer />
        </Providers>
    )
};

// MyApp.getInitialProps = async (
//     context: AppContext
//   ): Promise<AppInitialProps> => {
//     const ctx = await App.getInitialProps(context)
   
//     return { ...ctx }
//   }

export default MyApp;