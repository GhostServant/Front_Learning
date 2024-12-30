const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Функция для динамического создания точек входа для SCSS
const generateSCSSPagesEntries = () => {
  const entries = {};
  const files = glob.sync('./src/styles/pages/*.scss');
  files.forEach((file) => {
    const name = path.basename(file, '.scss'); // Имя файла без расширения
    entries[name] = path.resolve(__dirname, file);
  });
  return entries;
};

// Функция для динамической генерации HtmlWebpackPlugin для всех HTML-файлов в modules
const generateHTMLPlugins = () => {
  const files = glob.sync('./src/modules/**/*.html'); // Ищем все HTML-файлы
  return files.map((file) => {
    const name = path.basename(file); // Имя файла (с расширением)
    return new HtmlWebpackPlugin({
      template: file, // Используем текущий HTML-файл как шаблон
      filename: `modules/${name}`, // Имя выходного файла в dist
    });
  });
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      bundle: './src/scripts/script.js', // Основной JavaScript
      ...generateSCSSPagesEntries(), // Динамическая генерация SCSS
    },
    output: {
      filename: 'scripts/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/', // Убедитесь, что publicPath настроен правильно
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      open: true,
      hot: true, // Включаем Hot Module Replacement
      historyApiFallback: true,
      watchFiles: ['./src/**/*.html'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Используем style-loader в режиме разработки
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
        template: './src/index.html', // Шаблон HTML
        filename: 'index.html',
      }),
      ...generateHTMLPlugins(),
      ...(isProduction ? [new MiniCssExtractPlugin()] : []),
      new webpack.HotModuleReplacementPlugin(), // Явное включение HMR
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/images', to: 'images',noErrorOnMissing: true },
          { from: 'src/images/img', to: 'images/img',noErrorOnMissing: true },
          { from: 'src/images/icons', to: 'images/icons',noErrorOnMissing: true },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: 'single', // Добавьте эту строку для правильной работы HMR
    },
    mode: isProduction ? 'production' : 'development', // Устанавливаем режим в зависимости от аргументов
    target: 'web', // Укажите target для браузера
  };
};
