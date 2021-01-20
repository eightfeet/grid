const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/mf',
        proxy({
            target : 'https://wx-test1.by-health.com/',
            changeOrigin : true,  // 设置跨域请求
        })
    );
};