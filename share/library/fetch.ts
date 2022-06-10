/* global process */
import fetch from "isomorphic-fetch";
import * as _ from "lodash";

const BASE_URL =
  process.env.ENVIRONMENT === "client"
    ? ""
    : `http://localhost:${process.env.PORT}`;

// Default options for the Fetch API
// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
export const create =
  (baseUrl: string) =>
  (url: string, options?: RequestInit): Promise<Response> =>
    fetch(`${baseUrl}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options && options.headers),
      },
      mode: baseUrl ? "cors" : "same-origin",
      credentials: baseUrl ? "include" : "same-origin",
      ..._.omit(options, "headers"),
    });

export default create(BASE_URL);
