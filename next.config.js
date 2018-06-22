const _ = require("lodash");
const webpack = require("webpack");
const withTypescript = require("@zeit/next-typescript");

module.exports = _.flow(withTypescript)({
  webpack(config, { isServer }) {
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
