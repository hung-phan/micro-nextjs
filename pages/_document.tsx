import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="/static/manifest.json" />
          <link href="/static/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
