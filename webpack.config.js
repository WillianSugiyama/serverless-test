const path = require('path');
const slsWebpack = require('serverless-webpack');

module.exports = {
    entry: slsWebpack.lib.entries,
    mode: slsWebpack.lib.webpack.isLocal ? 'development' : 'production',
    target: 'node',
    //   externals: [nodeExternals()],
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: __dirname,
            use: [{
                loader: 'babel-loader',
            }, ],
        }, ],
    },
};