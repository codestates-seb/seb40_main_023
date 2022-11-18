import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  <Head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <title>새해복망고로 새해 복 많이 받고!</title>
  </Head>;
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
