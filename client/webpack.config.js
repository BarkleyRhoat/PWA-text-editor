const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    stats: {
      children: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        chunks: ["main"],
      }),
      // new HtmlWebpackPlugin({
      //   template: "./src/client/install.html",
      //   filename: "install.html",
      //   chunks: ["install"],
      // }),
      new WebpackPwaManifest({
        name: "PWA Text Editor",
        short_name: "Text Editor",
        description: "A progressive web app text editor",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],

    module: {
      rules: [
        //  CSS loaders and babel here
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};

// module.exports = () => {
//   return {
//     mode: "development",
//     entry: {
//       main: "./src/js/index.js",
//       install: "./src/js/install.js",
//     },
//     output: {
//       filename: "[name].bundle.js",
//       path: path.resolve(__dirname, "dist"),
//     },
//     plugins: [],

//     module: {
//       rules: [],
//     },
//   };
// };
