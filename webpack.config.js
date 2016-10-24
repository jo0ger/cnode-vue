var path = require('path'),
    webpack = require('webpack'),
    ExtracTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin')
    CleanWebpackPlugin = require('clean-webpack-plugin')

var isProduction = function() {
    return process.env.NODE_ENV === "production";
};

var publicPath = "/dist/",
    filename = "build.js";
// if (isProduction()) {
//     publicPath = "/dist/";
//     filename = "build.js";
// }

module.exports = {
    debug: true,
    entry: ["./src/main.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: publicPath,
        filename: filename,
        chunkFilename:"[id].build.js?[chunkhash]"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
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
            loader: 'file'
        }]
    },
    plugins: [
        //提取公共代码，在有多个entry时，这些入口文件可能会有一些公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js"
        }),
        new ExtracTextPlugin({
            filename: "style.css",
            allChunks: true,
            disable: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new HtmlWebpackPlugin({
        //     filename: "../index.html",
        //     template: "./index_dev.html"
        // })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (isProduction()) {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(["dist"], {
            "verbose": true,            //log到console
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
