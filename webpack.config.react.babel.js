import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const config = {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
        vendor: ['react', 'react-dom', 'material-ui', 'react-router'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Account Demo',
            template: './public/index.html',
        }),
    ],
    // watch: true,
};
module.exports = config;
