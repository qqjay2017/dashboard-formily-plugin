const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";
const isProduct = NODE_ENV === "production";
const publicPath = isProduct ? "/dashboard/" : "/";
const CDN_LIST = isProduct
  ? [
      isProduct
        ? "unpkg/react.production.min.js"
        : "unpkg/react.development.js",
      isProduct
        ? "unpkg/react-dom.production.min.js"
        : "unpkg/react-dom.development.js",
      "unpkg/minio.umd.js",
      "unpkg/handlebars.js",
      "unpkg/html2canvas.min.js",
      "unpkg/echarts.min.js",
      "unpkg/base64.min.js",
      "unpkg/jsrsasign-all-min.js",
    ].map((url) => publicPath + url)
  : ["/unpkg/minio.umd.js"];
function resolve(name) {
  return path.join(__dirname, name);
}
const isAna = false;
const _target = "http://dev.kxgcc.com:30872";
// "http://qzjg.kxgcc.com:30251"
module.exports = {
  mode: NODE_ENV,
  devtool: isProduct ? false : "inline-source-map",
  entry: {
    main: resolve("../src/main.tsx"),
    report: resolve("../src/report/report-main.tsx"),
  },
  output: {
    clean: true,
    filename: isProduct ? "[name].[contenthash].js" : "[name].js",
    path: resolve("../dist"),
    publicPath,
  },
  resolve: {
    alias: {
      "@": resolve("../src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: resolve("../src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              [
                "@babel/preset-react",
                { development: !isProduct, runtime: "automatic" },
              ],
            ],
            plugins: [
              !isProduct && "react-refresh/babel",
              // [
              //   "@emotion",
              //   {
              //     sourceMap: !isProduct,
              //     autoLabel: "dev-only",
              //     labelFormat: "[local]",
              //     cssPropOptimization: true,
              //   },
              // ],
            ].filter(Boolean),
          },
        },
      },

      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",

          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          isProduct ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: isProduct
    ? {
        splitChunks: {
          chunks: "all",

          cacheGroups: {
            lodash: {
              test: /[\\/]node_modules[\\/](lodash-es)[\\/]/,
              name: "lodash-es",
              chunks: "all",
              reuseExistingChunk: true,
              enforce: true,
            },

            antd: {
              test(module) {
                return (
                  module.resource &&
                  (module.resource.includes("antd") ||
                    module.resource.includes("ant-design") ||
                    module.resource.indexOf("rc-") === 0 ||
                    module.resource.includes("@rc-component"))
                );
              },
              name: "chunk-antd",
              chunks: "all",
              reuseExistingChunk: true,
              enforce: true,
            },
            babel: {
              test(module) {
                return module.resource && module.resource.includes("@babel");
              },
              name: "chunk-babel-runtime",
              chunks: "all",
              reuseExistingChunk: true,
              enforce: true,
            },
            formily: {
              test: /[\\/]node_modules[\\/]_?@formily(.*)/,
              name: "chunk-formily",
              chunks: "all",
            },
            libs: {
              minChunks: 3,
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial", // only package third parties that are initially dependent
            },
          },
        },
        minimize: isProduct,
        minimizer: isProduct
          ? [
              new TerserPlugin({
                parallel: true,
              }),
            ]
          : [],
      }
    : undefined,

  plugins: [
    !isProduct && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("index.html"),
      filename: "index.html",
      inject: "body",
      chunks: ["main"],

      CDN_LIST,
    }),
    new HtmlWebpackPlugin({
      template: resolve("../src/report/index.html"),
      filename: "report/index.html",
      inject: "body",
      chunks: ["report"],

      CDN_LIST,
    }),
    isProduct
      ? new CopyPlugin({
          patterns: [{ from: "public", to: "" }],
        })
      : undefined,
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BASE_URL": JSON.stringify(publicPath),
    }),
    new MiniCssExtractPlugin({
      filename: isProduct ? "[name].[contenthash].css" : "[name].css",
    }),
    // isProduct && new MonacoWebpackPlugin(),
    isAna && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  devServer: {
    client: { overlay: false },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/dashboard-report/, to: "/report/index.html" },
      ],
    },
    port: 9522,
    open: false,
    hot: !isProduct,
    proxy: [
      {
        context: [
          "/api/",
          "/public/",
          "/openapi/",
          "/auth/",
          "/cms-static/",
          "/component-shared-center/",
        ],
        target: _target,
        changeOrigin: true,
        pathRewrite: { "^": "" },
      },
      {
        context: ["/dashboard-api/"],
        target: "http://localhost:3001",
        // target: "http://dev.kxgcc.com:30872",
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/dashboard-api/, ""),
      },
    ],
  },
  cache: {
    type: "filesystem",
  },
  externals: isProduct
    ? {
        handlebars: "Handlebars",
        react: "React",
        "react-dom": "ReactDOM",
        html2canvas: "html2canvas",
        echarts: "echarts",
        jsrsasign: "window",
        "js-base64": "Base64",
      }
    : {},
};
