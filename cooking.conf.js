var path = require('path')
var cooking = require('cooking')
var webpack = require('webpack')

var config = {
  entry: {
    app: './src/app.js',
    vendor: ['vue', 'vuex']
  },
  dist: './dist',
  externals: {
    'jquery': 'jQuery'
  },
  devServer: {
    port: 8700,
    publicPath: '/',
    hostname: 'localhost',
  },

  // production
  clean: true,
  hash: true,
  sourceMap: false,
  static:true,
  assetsPath: 'images',
  urlLoaderLimit: 10000,
  extractCSS: 'css/[name].[hash:8].css',
  extends: ['vue2','saladcss'],
  postcss: [
    require('postcss-salad')({
      browser: ['ie > 9', 'last 2 version'],
      features: {
        'bem': {
          'shortcuts': {
            'component': 'b',
            'modifier': 'm',
            'descendent': 'e'
          },
          'separators': {
            'descendent': '__',
            'modifier': '--'
          }
        }
      }
    })
  ]
}
if (process.env.NODE_ENV === 'production') {
  config.template = [{
    filename: 'index.html',
    template: 'src/template/index.html',
    chunks: ['manifest', 'vendor', 'app']
  }]
} else {
  config.template = [{
    filename: 'index.html',
    template: 'src/template/index.html',
    chunks: ['vendor', 'app']
  }]
}

cooking.set(config)

cooking.add('resolve.alias', {
  'src': path.resolve(__dirname, './src'),
  'components': path.resolve(__dirname, './src/components'),
  'api': path.resolve(__dirname, './src/api'),
  'pages': path.resolve(__dirname, './src/pages'),
  'store': path.resolve(__dirname, './src/store'),
  'utils': path.resolve(__dirname, './src/utils'),
  vue: 'vue/dist/vue.js'
})
cooking.add('plugin.ProvidePlugin',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }))

if (process.env.NODE_ENV === 'production') {
  cooking.add('output.filename', 'js/[name].[hash:8].js')
  cooking.add('plugin.CommonsChunk1', new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module, count) {
      return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
    }
  }))
  cooking.add('plugin.CommonsChunk2', new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest', chunks: ['vendor']}))
} else {
  cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
    names: ["vendor"]
  }))
}
module.exports = cooking.resolve()