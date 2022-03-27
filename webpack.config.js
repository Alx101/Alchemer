const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    "presets": ['@babel/preset-env', '@babel/preset-typescript'],
                    "plugins": ["@babel/plugin-transform-typescript"]
                }
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
        ],
    },
    /* optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                ecma: 5,
                keep_classnames: true,
                keep_fnames: true,
            }
        })],
    }, */
    resolve: {
        extensions: ['.ts']
    },
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'Files'),
    },
};