import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/providers/ThemeProvider';
import '@/styles/globals.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme/theme';
import createEmotionCache from '../utils/createEmotionCache';
import dynamic from 'next/dynamic';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Lazy load heavy components
const Layout = dynamic(() => import('../components/Layout'), {
  ssr: true,
  loading: () => <div style={{ height: '100vh', width: '100vw' }} />,
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>FinanceAI - Análise Inteligente</title>
        <meta name="description" content="Sistema de análise financeira com inteligência artificial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
