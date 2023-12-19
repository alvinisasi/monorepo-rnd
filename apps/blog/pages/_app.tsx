import Footer from '@/components/footer';
import Header from '@/components/header';
import { Providers } from '@/utils/providers';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Providers options={{ key: 'mui-theme' }}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </Providers>
    )
};

export default MyApp;