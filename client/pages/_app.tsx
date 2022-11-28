import "../styles/globals.css";
import { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, pageProps }: AppProps) {
  <Head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <title>새해복망고로 새해 복 많이 받고!</title>
  </Head>;

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <CookiesProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
