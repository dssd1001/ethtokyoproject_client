import { useState } from "react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
// import { MDXProvider } from '@mdx-js/react'

import { Layout } from "@/components/Layout";
// import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from "@/components/MobileNavigation";

import "@/styles/tailwind.css";
import "focus-visible";

import { Web3AuthProvider } from "@/services/web3auth";

function onRouteChange() {
  useMobileNavigationStore.getState().close();
}

Router.events.on("routeChangeStart", onRouteChange);
Router.events.on("hashChangeStart", onRouteChange);

export default function App({ Component, pageProps }) {
  let router = useRouter();

  const [web3AuthNetwork, setWeb3AuthNetwork] = useState(process.env.NEXT_PUBLIC_WEB3AUTH_NETWORK);
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_NETWORK_NAME);

  return (
    <>
      <Head>
        {router.pathname === "/" ? (
          <title>Bitcoin Robo-Advisor</title>
        ) : (
          <title>{`${pageProps.title}`}</title>
        )}
        <meta name="description" content={pageProps.description} />
      </Head>
      {/* <MDXProvider components={mdxComponents}> */}
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      </Web3AuthProvider>
      {/* </MDXProvider> */}
    </>
  );
}
