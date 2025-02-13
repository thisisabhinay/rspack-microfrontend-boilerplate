const rspack = require("@rspack/core")
const refreshPlugin = require("@rspack/plugin-react-refresh")
const isDev = process.env.NODE_ENV === "development"
const path = require("path")

const printCompilationMessage = require("./compilation.config.js")

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/index.ts"
  },

  devServer: {
    port: 5100,
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
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
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
    new rspack.container.ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {
        remotereact: "remotereact@http://localhost:5101/remoteEntry.js",
        remotevue: "remotevue@http://localhost:5102/remoteEntry.js"
      },
      shared: {
        "react": {
          eager: true,
          singleton: true
        },
        "react-dom": {
          eager: true,
          singleton: true,
          strictVersion: true
        },
        "react-router": {
          eager: true,
          singleton: true,
          strictVersion: true
        },
        "vue": {
          eager: true,
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
