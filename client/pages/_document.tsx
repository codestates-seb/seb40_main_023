import { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8"></meta>
        <meta
          name="description"
          content="애플망고팀의 사이드 프로젝트 새해복망고 페이지입니다."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
