import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import createStore from "../share/createStore";

export default withRedux(createStore)(
  class MyApp extends App<{ store: Store }> {
    public render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  }
);
