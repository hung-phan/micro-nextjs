const _ = require("lodash");
const webpack = require("webpack");
const withPWA = require("next-pwa");

const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.unshift(withPWA);
}

module.exports = _.flow(...plugins)({
  pwa: {
    dest: "public",
  },

  serverRuntimeConfig: {
    IS_SERVER: true,
  },

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/images",
            outputPath: "static/images",
          },
        },
      ],
    });

    // compile time config
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ENVIRONMENT": JSON.stringify(
          isServer ? "server" : "client"
        ),
      })
    );

    return config;
  },
});
