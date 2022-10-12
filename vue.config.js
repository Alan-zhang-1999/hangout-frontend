const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    open: true,
    https: false,
    proxy: {
        '/api': {
            target: 'http://localhost:8080', //接口域名
            changeOrigin: true,             //是否跨域
            ws: true,                       //是否代理 websockets
            secure: false,                   //是否https接口
            pathRewrite: {                  //路径重置
                '^/api': ''
            }
        }
    }
}
})
