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
      "book-review": path.resolve(
        __dirname,
        "./src/templates/book-review/book-review.js"
      ),
      calendar: path.resolve(__dirname, "./src/templates/calendar/calendar.js"),
      contacts: path.resolve(__dirname, "./src/templates/contacts/contacts.js"),
      "image-text": path.resolve(
        __dirname,
        "./src/templates/image-text/image-text.js"
      ),
      poster: path.resolve(__dirname, "./src/templates/poster/poster.js"),
      rss: path.resolve(__dirname, "./src/templates/rss/rss.js"),
      slideshow: path.resolve(
        __dirname,
        "./src/templates/slideshow/slideshow.js"
      ),
      "instagram-feed": path.resolve(
        __dirname,
        "./src/templates/instagram-feed/instagram-feed.js"
      ),
      iframe: path.resolve(__dirname, "./src/templates/iframe/iframe.js"),
      table: path.resolve(__dirname, "./src/templates/table/table.js"),
      video: path.resolve(__dirname, "./src/templates/video/video.js"),
      travel: path.resolve(__dirname, "./src/templates/travel/travel.js"),
      "vimeo-player": path.resolve(
        __dirname,
        "./src/templates/vimeo-player/vimeo-player.js"
      ),
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
          {
            from: path.resolve(__dirname, "./src/themes"),
            to: "themes",
          },
        ],
      }),
    ]
  : [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/templates/*/*.json"),
            to: "[name][ext]",
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
        test: /\.(woff)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
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
      "nginx",
    ],
    stats: "minimal",
  },
};
