import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { AppConfig } from '../utils/AppConfig'

const MyDocument = (props: DocumentProps) => {
    return (
        <Html lang={AppConfig.locale}>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin=''
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;1,900&family=Open+Sans&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MyDocument
