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
            target: 'http://localhost:8080', //接口域名
            changeOrigin: true,             //是否跨域
            ws: false,                       //是否代理 websockets
            secure: false,                   //是否https接口
            pathRewrite: {                  //路径重置
                '^/api': ''
            }
        }
    }
}
})
