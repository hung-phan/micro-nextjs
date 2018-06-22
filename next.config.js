const _ = require("lodash");
const webpack = require("webpack");
const withTypescript = require("@zeit/next-typescript");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = _.flow(
  withTypescript,
  withCss,
  withSass
)({
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/images",
            outputPath: "static/images"
          }
        }
      ]
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ENVIRONMENT": JSON.stringify(
          isServer ? "server" : "client"
        )
      })
    );

    return config;
  }
});
