if (process.env.ENVIRONMENT === "client") {
  require("font-awesome/scss/font-awesome.scss");
  require("bootstrap/scss/bootstrap.scss");
}

import withRedux from "next-redux-wrapper";
import App from "next/app";
import Head from "next/head";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import createStore from "../share/createStore";

export default withRedux(createStore)(
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
);
