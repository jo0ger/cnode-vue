var path = require('path'),
    webpack = require('webpack'),
    ExtracTextPlugin = require("extract-text-webpack-plugin")


var isProduction = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";

var publicPath = "/dist/",
    filename = "client-build.js";
if (isProduction) {
    //这里得加上项目名称
    publicPath = "/dist/";
    filename = "client-build-[hash:8].js";
}

module.exports = {
    debug: true,
    entry: {
        // main: "./src/main.js",
        main: "./src/entry/client-entry.js",
        common: ["jquery", "vue", "vue-router", "vuex", "./src/assets/plugins/simplemde/simplemde.min.js"]
    },
    output: {
        path: './dist',
        publicPath: publicPath,
        filename: filename,
        chunkFilename: "[id].build-[hash:8].js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                postcss: [
                  require('autoprefixer')({
                    browsers: ['last 3 versions']
                  })
                ]
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtracTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader?sourceMap"
            })
        }, {
            test: /\.(sass|scss)$/,
            loader: ExtracTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader?sourceMap!sass-loader"
            })
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.(eot|ttf|woff)$/,
            loader: 'file'
        }, {
            test: /\.md$/,
            loader: 'file',
            query: {
                name: "[name].[ext]?[hash]"
            }
        }]
    },
    resolve: {
        extension: ["", ".js"]
    },
    devServer: {
        publicPath: "./dist/",
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            "/api/*": {
                target: 'https://cnodejs.org',
                host: "cnodejs.org"
            }
        }
    },
    devtool: '#eval-source-map'
}
