import Footer from '@/components/footer';
import Header from '@/components/header';
import { Providers } from '@/utils/providers';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import App from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Providers options={{ key: 'mui-theme' }}>
            <Header />
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