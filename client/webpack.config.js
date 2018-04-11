module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }/*,
	{
	 exclude: /node_modules/,
	 loader: "style-loader" 
	},
	{
	 exclude: /node_modules/,
	 loader: "css-loader",
	 options: { import: false } 
	}*/]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
