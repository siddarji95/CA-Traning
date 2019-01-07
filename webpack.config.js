const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
//const eventBus = require('eventbusjs');

const isDevEnv = process.env.NODE_ENV === 'development';
console.log('isDevEnv', isDevEnv);

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/js/App.js",
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
			{
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }

        ]
    },
    "devtool": isDevEnv ? "source-map" : "",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
			chunksSortMode: 'none'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
		new CopyWebpackPlugin([
            { from: 'src/config', to: 'config' },
            { from: 'src/css', to: 'css' }
        ], { debug: true })
    ]
};
