// webpack.config.js

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    console.log(env);

    return {
        mode:env.development ? 'development': 'production',
        entry: "./src",
        devServer: {
            hot: true,
            open: true
        },
        devtool: "inline-source-map",
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        resolve: {
            extensions: [".js", ".vue", ".css", ".json",'.tsx', '.ts', '.ejs'],
            modules: [
                __dirname,
                'node_modules',
            ],
            alias: {
                '@': path.resolve('src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(s[ac]ss|less)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    }

};