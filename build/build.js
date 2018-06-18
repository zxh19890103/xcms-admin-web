const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const spinner = ora('building for production...')
spinner.start()
rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err
  const webpackConfig = require('./webpack.config')
  const webpackConfigProd = require('./webpack.prod.config')
  webpack(webpackMerge(webpackConfig, webpackConfigProd), function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
})
