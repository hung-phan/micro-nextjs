import Document, { Head, Main, NextScript } from "next/document";
import * as React from "react";

class MyDocument extends Document {
  public render() {
    return (
      <html>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="theme-color" content="#000000"/>

        <link rel="manifest" href="/static/manifest.json"/>
        <link href="/static/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}

export default MyDocument;
