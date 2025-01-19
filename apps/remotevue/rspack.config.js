const rspack = require("@rspack/core")
const refreshPlugin = require("@rspack/plugin-react-refresh")
const isDev = process.env.NODE_ENV === "development"
const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")

const printCompilationMessage = require("./compilation.config.js")
const deps = require("./package.json").dependencies

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/index.ts"
  },

  devServer: {
    port: 5102,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage("compiling", port)

      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port)
          } else {
            printCompilationMessage("success", port)
          }
        })
      })
    }
  },

  resolve: {
    extensions: [".js", ".ts", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true
        }
      },
      {
        test: /\.svg$/,
        type: "asset"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {}
                }
              }
            }
          }
        ],
        type: "css"
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev
                  }
                }
              },
              env: {
                targets: ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.container.ModuleFederationPlugin({
      name: "remotevue",
      filename: "remoteEntry.js",
      exposes: {
        "./counter": "./src/components/counter",
        "./vue-mounter": "./src/vue-mounter"
      },
      shared: {
        vue: {
          requiredVersion: deps["vue"],
          singleton: true,
          strictVersion: true
        }
      }
    }),
    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html"
    }),
    isDev ? new refreshPlugin() : null
  ].filter(Boolean)
}
