import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;**script-src 'self' http://onlineerp.solution.quebec 'unsafe-inline' 'unsafe-eval';** "
        /> */}
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://3.111.128.67/assignment/* 'unsafe-inline' 'unsafe-eval'" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
