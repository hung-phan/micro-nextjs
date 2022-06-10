import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";

import { wrapper } from "../share/store";

if (process.env.ENVIRONMENT === "client") {
  require("bootstrap/scss/bootstrap.scss");
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>My new cool app</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(MyApp);
