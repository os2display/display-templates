const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const output = devMode
  ? {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].js",
      clean: true,
    }
  : {
      path: path.resolve(__dirname, "./build"),
      filename: "[name].js",
      libraryTarget: "commonjs",
      clean: true,
    };

const externals = devMode
  ? {}
  : {
      react: "react",
    };

const entry = devMode
  ? {
      examples: path.resolve(__dirname, "./src/index.js"),
    }
  : {
     twentyThreeVideo: path.resolve(__dirname, "./src/twenty-three-video/twenty-three-video.js"),
      "book-review": path.resolve(
        __dirname,
        "./src/book-review/book-review.js"
      ),
      calendar: path.resolve(__dirname, "./src/calendar/calendar.js"),
      contacts: path.resolve(__dirname, "./src/contacts/contacts.js"),
      "image-text": path.resolve(__dirname, "./src/image-text/image-text.js"),
      poster: path.resolve(__dirname, "./src/poster/poster.js"),
      rss: path.resolve(__dirname, "./src/rss/rss.js"),
      slideshow: path.resolve(__dirname, "./src/slideshow/slideshow.js"),
      "instagram-feed": path.resolve(
        __dirname,
        "./src/instagram-feed/instagram-feed.js"
      ),
      iframe: path.resolve(__dirname, "./src/iframe/iframe.js"),
      table: path.resolve(__dirname, "./src/table/table.js"),
      video: path.resolve(__dirname, "./src/video/video.js"),
      travel: path.resolve(__dirname, "./src/travel/travel.js"),
    };

const plugins = devMode
  ? [
      new HtmlWebpackPlugin({
        title: "webpack Examples",
        template: path.resolve(__dirname, "./src/index.html"),
        filename: "index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/fixtures"),
            to: "fixtures",
          },
        ],
      }),
    ]
  : [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*.json"),
            context: path.resolve(__dirname, "src"),
          },
        ],
      }),
      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
      }),
    ];

module.exports = {
  mode: devMode ? "development" : "production",
  entry,
  output,
  externals,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    hot: false,
    contentBase: "/",
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: [
      "0.0.0.0",
      "localhost",
      "display-admin.local.itkdev.dk",
      "display-client.local.itkdev.dk",
      "display-templates.local.itkdev.dk",
    ],
    stats: "minimal",
  },
  optimization: {
    minimize: true,
  },
};
