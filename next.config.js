const _ = require("lodash");
const webpack = require("webpack");
const withOffline = require("next-offline");

const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.unshift(withOffline);
}

module.exports = _.flow(...plugins)({
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "http-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 24 * 60 * 60 // 1 day
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },

  serverRuntimeConfig: {
    IS_SERVER: true
  },

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

    // Optimize output css
    if (
      config.mode === "production" &&
      Array.isArray(config.optimization.minimizer)
    ) {
      const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin());
    }

    // compile time config
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
