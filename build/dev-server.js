const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackConfigDev = require('./webpack.dev.config')
const express = require('express')
const port = 3033

const compiler = webpack(
  webpackMerge(webpackConfig, webpackConfigDev)
)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

const app = express()

app.use('/static', express.static(path.resolve(__dirname, '../static')))
app.use(devMiddleware)
app.use(hotMiddleware)

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at http://localhost:${port} \n`)
})

app.listen(port, () => {
  console.log('listened')
})
