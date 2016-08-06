module.exports = {
    entry: './public/js/app.js',
    output: {
        path: './public/build',
        publicPath: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.(js)$/,
            loader: 'babel-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?size=8192'
        }]
    }
}
