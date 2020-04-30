if (process.env.ENVIRONMENT === "client") {
  require("bootstrap/scss/bootstrap.scss");
}

import withRedux from "next-redux-wrapper";
import App from "next/app";
import Head from "next/head";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import createStore from "../share/createStore";

class MyApp extends App<{ store: Store }> {
  public render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Head>
          <title>My new cool app</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withRedux(createStore)(MyApp);
