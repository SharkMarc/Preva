const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
	DIST: path.resolve(__dirname, "dist"),
	SRC: path.resolve(__dirname, "src"),
	JS: path.resolve(__dirname, "src/js"),
};

module.exports = {
	entry: path.join(paths.JS, "app.js"),
	watchOptions: {poll: 1000},
	output: {
		path: paths.DIST,
		filename: "app.bundle.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, "index.html"),
		}),
		new ExtractTextPlugin("style.bundle.css"),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Popper: ["popper.js", "default"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: "css-loader",
				}),
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					use: ["css-loader", "sass-loader"],
				}),
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					"file-loader",
				],
			},
		],
	},
	// Enable importing JS files without specifying their's extension
	// So we can write: import MyComponent from './my-component';
	// Instead of: import MyComponent from './my-component.jsx';
	resolve: {
		extensions: [".js", ".jsx"],
	}
};
