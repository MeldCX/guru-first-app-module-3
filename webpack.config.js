const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SVGStorePlugin = require('webpack-svgstore-plugin');
const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: [
        './src/app/main.jsx'
    ],

    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },

    devtool: 'cheap-eval',

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        alias: {
            glow: path.resolve('./node_modules/@meldcx/glow'),
            styles: path.resolve(SRC_PATH, 'styles'),
            components: path.resolve(SRC_PATH, 'components')
        },
        modules: ['node_modules']
    },


    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [
                    SRC_PATH
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /.html/,
                loader: 'html-loader'
            },
            {
                test: /.svg/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            title: 'MeldCX Guru - First App - A deeper look into components',
            template: path.resolve('./index.html')
        }),
        new SVGStorePlugin({
            // Svgo options
            svgoOptions: {
                plugins: [
                    {removeTitle: true}
                ]
            },
            prefix: 'icon'
        })
    ]
};
