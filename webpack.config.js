const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const generateSCSSPagesEntries = () => {
  const entries = {};
  const files = glob.sync('./src/styles/pages/*.scss');
  files.forEach((file) => {
    const name = path.basename(file, '.scss');
    entries[name] = path.resolve(__dirname, file);
  });
  return entries;
};

const generateJSEntries = () => {
  const entries = {};
  const files = glob.sync('./src/scripts/*.js');
  files.forEach((file) => {
    const name = path.basename(file, '.js'); 
    entries[name] = path.resolve(__dirname, file);
  });
  return entries;
};

const generateHTMLPlugins = () => {
  const files = glob.sync('./src/modules/**/*.html');
  return files.map((file) => {
    const name = path.basename(file, '.html');
    return new HtmlWebpackPlugin({
      template: file,
      filename: `modules/${name}.html`,
      chunks: ['bundle', 'main', name],
      inject: 'head', 
    });
  });
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      bundle: './src/scripts/script.js',
      main: './src/styles/pages/main.scss', 
      game: './src/scripts/game.js',
      ...generateJSEntries(),
      ...generateSCSSPagesEntries(),
    },
    output: {
      filename: isProduction ? 'scripts/[name].[contenthash].js' : 'scripts/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: isProduction ? '/Front_Learning/' : '/',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      open: true,
      hot: true,
      historyApiFallback: true,
      watchFiles: ['./src/**/*.html'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['bundle', 'main', 'game'], 
        inject: 'head',
      }),
      ...generateHTMLPlugins(),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      })] : []),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/images', to: 'images', noErrorOnMissing: true },
          { from: 'src/images/img', to: 'images/img', noErrorOnMissing: true },
          { from: 'src/images/icons', to: 'images/icons', noErrorOnMissing: true },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: 'single', 
    },
    mode: isProduction ? 'production' : 'development', 
    target: 'web',
  };
};
