const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: true,
    https: false,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/websocket',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: false,
            secure: false,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}
})
