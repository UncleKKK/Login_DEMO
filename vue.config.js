const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    assetsDir: './',
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: true,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.0.1:8000/',
        //         changeOrigin: true,
        //     },
        // },
    },
}