const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'page1'];

module.exports = {
    mode: 'development',
    entry: pages.reduce((config, page) => {
        config[page] = `./src/pages/${page}/${page}.js`
        return config;
    }, {}),
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [].concat(
        pages.map(
            (page) => {
                return new HtmlWebpackPlugin({
                    inject: true,
                    template: `./src/pages/${page}/${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                });
            }
        ),
    ),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.csv$/i,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            }
        ],
    },
};