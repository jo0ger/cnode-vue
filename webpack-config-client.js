var webpack = require("webpack"),
    path = require("path"),
    baseConf = require("./webpack-config-base"),
    ExtracTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin')

var isProduction = process.env.NODE_ENV === "production";

const config = Object.assign({}, baseConf, {
    plugins: [
        //提取公共代码，在有多个entry时，这些入口文件可能会有一些公共代码
        //将entry中common包含的文件提取到公共js中
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common"],
            filename: isProduction && "client-common-[hash:8].js" || "client-common.js",
            minChunks: Infinity
        }),
        new ExtracTextPlugin({
            filename: isProduction && "style-[hash:8].css" || "style.css",
            allChunks: true,
            disable: false
        }),
        //设置全局变量$和jQuery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
});

if (isProduction) {
    config.debug = false;
    config.devtool = '#source-map'

    config.plugins = (config.plugins || []).concat([
        new CleanWebpackPlugin(["./dist"], {
            "verbose": true, //log到console
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV || "development"
            }
        }),
        //JS压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //将上面生成的js和css的引用追加到./src/html-tpl/tpl.html中，并重新生成index.html
        new HtmlWebpackPlugin({
            filename: "../index.html",
            template: "./src/html-tpl/tpl.html"
        })
    ])
}

module.exports = config;
