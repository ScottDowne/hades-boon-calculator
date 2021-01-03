const path = require('path');
 
module.exports = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        }
      }
    ]
  }
}
