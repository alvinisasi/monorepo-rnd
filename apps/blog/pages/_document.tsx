import { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from 'next/document';
import { type DocumentHeadTagsProps, DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import { AppConfig } from '@/utils/AppConfig';

const MyDocument = (props: DocumentProps & DocumentHeadTagsProps) => {
  return (
    <Html lang={AppConfig.locale}>
      <Head>
        <DocumentHeadTags {...props} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await documentGetInitialProps(ctx);
  return { ...initialProps };
};

export default MyDocument;