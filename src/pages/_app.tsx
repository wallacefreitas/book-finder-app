import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'

import "../services/axios.config";
import "../globals.css";
import Head from 'next/head';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{"Book Finder"}</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
