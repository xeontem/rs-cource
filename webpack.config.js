const Webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: __dirname + '/src/js/index.js',
    output: {
            path: __dirname + '/dist',
            filename: 'js/bundle.js',
    },
    devtool: 'source-map',
    // ------------------------- plugins ---------------------------------    
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: './'},
            {from: './src/img/', to: './img'},
            {from: './src/css/', to: './css/'},
            {from: './src/jsDepends/', to: './jsDepends/'}
        ]),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 8000,
            server: {
                baseDir: ['./dist']
            }
        })
    ],
    // ------------------------- babel ---------------------------------
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    // ------------------------- server ---------------------------------
    devServer: {
        contentBase: __dirname + '/src',
    },
};

module.exports = config;
