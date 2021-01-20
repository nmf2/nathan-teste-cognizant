const merge = require('webpack-merge').default
const common = require('./webpack.common.js')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(common, {
  mode: 'production',
  externals: [
    nodeExternals()
  ]
})
