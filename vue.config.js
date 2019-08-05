const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const name = "vue Element Admin"
module.exports = {
    publicPath: './', //打包后的页面相对路径
    outputDir: 'dist', //
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development', // 在开发环境下进行eslint检查
    productionSourceMap: false,
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: (config) => {
        // 只有在打包页面才会自动生成分析界面
        if (process.env.NODE_ENV === 'production') {
            // if (process.env.npm_lifecycle_event === 'analyze'){
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            // }
        }
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

    }
}