const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    development: {
        mode: 'development',
        // Use 'inline-source-map' instead 'eval' here.
        // Chrome doesn't allow to use eval in extensions this way.
        devtool: 'inline-source-map',
        node: {
            // Fix strange errors.
            // https://github.com/webpack-contrib/css-loader/issues/447
            fs: 'empty'
        },
        entry: {
            main: './src/main.js',
            background: './src/background.js'
        },
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'dist/js')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    },

    production: {
        mode: 'production',
        node: {
            // Fix strange errors.
            // https://github.com/webpack-contrib/css-loader/issues/447
            fs: 'empty'
        },
        entry: {
            main: './src/main.js',
            background: './src/background.js'
        },
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'dist/js')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};

