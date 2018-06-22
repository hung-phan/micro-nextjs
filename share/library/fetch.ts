/* global process */
import * as fetch from "isomorphic-fetch";
import omit from "lodash/omit";

export const getBaseUrl = (): string => {
  if (process.env.ENVIRONMENT === "client") {
    return "";
  }

  const { PORT } = process.env;

  if (!PORT) {
    throw new Error("Missing 'process.env.PORT'");
  }

  return `http://localhost:${PORT}`;
};

// Default options for the Fetch API
// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
export const create = (baseUrl: string) => (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options && options.headers)
  };

  return fetch(`${baseUrl}${url}`, {
    headers,
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    ...omit(options, "headers")
  });
};

export default create(getBaseUrl());
