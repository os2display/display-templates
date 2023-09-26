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

const timestamp = new Date().getTime();

const transformConfig = (type) => (content) => {
    const config = JSON.parse(content.toString())
    // Base build URL with trailing slash.
    const baseUrl = ('develop' === type
                     ? process.env.DEPLOYMENT_BUILD_BASE_URL_DEVELOP ?? process.env.DEPLOYMENT_BUILD_BASE_URL ?? "https://raw.githubusercontent.com/os2display/display-templates/develop/build/"
                     : process.env.DEPLOYMENT_BUILD_BASE_URL_MAIN  ?? process.env.DEPLOYMENT_BUILD_BASE_URL ?? "https://raw.githubusercontent.com/os2display/display-templates/main/build/")
          .replace(/\/*$/, '/')

    const processPath = (path) => {
        try {
            const url = new URL(path, baseUrl)
            url.searchParams.set('ts', timestamp)
            return url.toString()
        } catch (error) {
            console.error(error)
            return path
        }
    }

    for (const key of ['component', 'admin', 'schema', 'assets']) {
        if (config.resources[key]) {
            config.resources[key] = Array.isArray(config.resources[key])
                ? config.resources[key].map(processPath)
                : processPath(config.resources[key])
        }
    }

    return JSON.stringify(config, null, 2)
}

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
            from: path.resolve(__dirname, "./src/*/*-admin.json"),
            to: "[name][ext]",
            context: path.resolve(__dirname, "src"),
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*-config.json"),
            to: "[name]-main[ext]",
            context: path.resolve(__dirname, "src"),
            toType: "template",
            transform: transformConfig('main')
          },
        ],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/*/*-config.json"),
            to: "[name]-develop[ext]",
            context: path.resolve(__dirname, "src"),
            toType: "template",
            transform: transformConfig('develop')
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
