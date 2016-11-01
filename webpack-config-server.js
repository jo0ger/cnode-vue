var webpack = require("webpack"),
    baseConf = require("./webpack-config-base"),
    ExtracTextPlugin = require("extract-text-webpack-plugin")

var isProduction = process.env.NODE_ENV === "production";

const config = Object.assign({}, baseConf, {
    entry: "./src/entry/server-entry.js",
    target: "node",
    output: Object.assign({}, baseConf.output, {
        filename: "server-build.js",
        libraryTarget: "commonjs2"
    }),
    externals: Object.keys(require("./package.json").dependencies),
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": process.env.NODE_ENV || "development",
                "VUE_ENV": "server"
            }
        }),
        new ExtracTextPlugin({
            filename: isProduction && "style-[hash:8].css" || "style.css",
            allChunks: true,
            disable: false
        }),
    ]
});

module.exports = config;
