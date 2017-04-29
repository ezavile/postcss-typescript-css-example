const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardWebpackPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.src,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: PATHS.dist,
      filename: '[name].js',
    },
    module: {
      rules: [
        /**
         * Lint TypeScript
         */
        {
          test: /\.(tsx|ts)$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          include: PATHS.src,
          exclude: /node_modules/,
          options: {
            tsConfigFile: 'tsconfig.json',
          }
        },
        /**
         * Lint CSS
         */
        {
          test: /\.(postcss|css)$/,
          enforce: 'pre',
          loader: 'postcss-loader',
          include: PATHS.src,
          exclude: /node_modules/,
          options: {
            plugins: () => ([
              require('stylelint')({
                ignorePath: '/node_modules/**/*.css'
              }),
            ]),
          },
        },
        /**
         * Load TypeScript
         */
        {
          test: /\.(tsx|ts)$/,
          loader: 'light-ts-loader',
          include: PATHS.src,
          exclude: /node_modules/,
        },
        /**
         * Source map
         */
        {
          test: /\.tsx$/,
          loader: 'source-map-loader',
          enforce: 'pre',
          include: PATHS.src,
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'postcss-typescript-css',
        template: 'src/index.html',
      }),
    ]
  }
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    devServer: {
      quiet: true,
      historyApiFallback: true,
      stats: 'none',
      host: 'localhost',
      port: 3000,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    module: {
      rules: [
        /**
         * Configuration without postcss-modules
         */
        {
          test: /\.css$/,
          include: PATHS.src,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('postcss-cssnext'),
                  require('postcss-typescript-css')
                ])
              }
            }
          ]
        },
        /**
         * Configuration using postcss-modules
         */
        {
          test: /\.postcss$/,
          include: PATHS.src,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('postcss-cssnext'),
                  require('postcss-modules')({
                    getJSON: (cssFileName, json) => {
                      require('postcss-typescript-css')({
                        cssFileName,
                        content: json,
                      })();
                    },
                  }),
                ])
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:3000`],
        },
      }),
    ]
  }
])

const pluginExtractCSS = new ExtractTextPlugin({
  filename: '[name].css',
});

const productionConfig = merge([
  {
    output: {
      filename: '[name].js',
    },
    module: {
      rules: [
        /**
         * Configuration without postcss-modules
         */
        {
          test: /\.css$/,
          include: PATHS.src,
          exclude: /node_modules/,
          use: pluginExtractCSS.extract({
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    require('postcss-cssnext'),
                    require('postcss-typescript-css')
                  ])
                }
              }
            ],
            fallback: 'style-loader',
          }),
        },
        /**
         * Configuration using postcss-modules
         */
        {
          test: /\.postcss$/,
          include: PATHS.src,
          exclude: /node_modules/,
          use: pluginExtractCSS.extract({
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    require('postcss-cssnext'),
                    require('postcss-modules')({
                      getJSON: (cssFileName, json) => {
                        require('postcss-typescript-css')({
                          cssFileName,
                          content: json,
                        })();
                      },
                    }),
                  ])
                }
              }
            ],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [
      new DashboardWebpackPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin([PATHS.dist]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      pluginExtractCSS
    ]
  }
])

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
