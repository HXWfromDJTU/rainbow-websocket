const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.join(__dirname, 'dist/umd')

module.exports = function (env = {}, argv) {
  // env 来自于 https://webpack.js.org/api/cli/#environment-options
  const PROD = argv.mode === 'production'

  const config = {
    mode: argv.mode,
    entry: path.join(SRC, 'index.ts'),
    target: 'web',
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      extensions: ['.ts', '.js', '.json']
    },
    output: {
      path: DIST,
      filename: `${pkg.name}.umd.js`,
      libraryTarget: 'umd',
      library: 'RainbowWebsocket',
      libraryExport: 'default',
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [{
        test: /\.(js|ts)$/,
        include: [SRC],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            onlyCompileBundledFiles: true
          }
        }
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        NODE_RUNTIME: JSON.stringify(false),
        WEB_RUNTIME: JSON.stringify(true)
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template', 'app.html'),
        inject: true,
        minify: false,
        filename: path.resolve(__dirname, 'dist/umd', 'app.html'),
      }),
    ],
    devtool: false,
    devServer: {
      host: 'localhost',
      open: "Google Chrome",
      openPage: 'app.html',
      disableHostCheck: true,
      hot: true,
      contentBase: [
        path.resolve(__dirname, 'dist/umd')
      ],
    }
  }

  // 不直接定义 port ，这样在本地开发时会自动挑选合适的 port
  if (process.env.PORT) {
    config.devServer.port = process.env.PORT
  }

  if (PROD) {
    // 生成 .min 格式
    const minifiedConfig = merge(config, {
      output: {
        filename: `${pkg.name}.umd.min.js`
      },
      optimization: {
        minimize: true
      },
      devtool: 'source-map',
    })

    return [config, minifiedConfig]
  }
  else {
    return config
  }
}
