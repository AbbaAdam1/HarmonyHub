import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head'; // Import Head from next/head

// Import font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Add the favicon link */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
