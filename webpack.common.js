const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    articles: './src/javascript/articles.js',
    article: './src/javascript/article.js',
    video: './src/javascript/video.js',
    contract: './src/contract-generator.jsx',
    search: './src/javascript/search.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
    // clean: true
  },

  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer'),
      url: require.resolve('url'),
      querystring: require.resolve('querystring-browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      vm: require.resolve('vm-browserify'),
      timers: require.resolve('timers-browserify')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp4|webm)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Полифилл для process
      Buffer: ['buffer', 'Buffer'] // Полифилл для Buffer
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new CopyPlugin({
      patterns: [
        { from: 'src/share', to: 'share' },
        { from: 'src/share/templates', to: 'templates' },
        { from: 'src/share/contracts', to: 'contracts' },
        { from: 'src/share/covers', to: 'covers' }
      ]
    }),

    // Main page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index', 'video']
    }),

    // Contract generator
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/contract_generator.html',
      filename: './contract_generator.html',
      chunks: ['index', 'contract']
    }),

    // About
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/about.html',
      filename: './about.html',
      chunks: ['index']
    }),

    // Search
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/search.html',
      filename: './search.html',
      chunks: ['index', 'search']
    }),

    // Articles
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/articles.html',
      filename: './articles.html',
      chunks: ['index', 'articles']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/suetulya.html',
      filename: './suetulya.html',
      chunks: ['index', 'articles']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/poteryasha.html',
      filename: './poteryasha.html',
      chunks: ['index', 'articles']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka.html',
      filename: './toksinka.html',
      chunks: ['index', 'articles']
    }),

    // Interviews
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/interviews.html',
      filename: './interviews.html',
      chunks: ['index', 'articles']
    }),

    // Suetulya article pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/suetulya/article_template.html',
      filename: './suetulya/article_template.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/suetulya/finansovaya_podushka.html',
      filename: './suetulya/finansovaya_podushka.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/suetulya/gid_po_deadlines.html',
      filename: './suetulya/gid_po_deadlines.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/suetulya/best_rest.html',
      filename: './suetulya/best_rest.html',
      chunks: ['index', 'article']
    }),

    // Poteryasha article pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/poteryasha/article_template.html',
      filename: './poteryasha/article_template.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/poteryasha/logo_checklist.html',
      filename: './poteryasha/logo_checklist.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/poteryasha/ai_helper.html',
      filename: './poteryasha/ai_helper.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/poteryasha/pricing.html',
      filename: './poteryasha/pricing.html',
      chunks: ['index', 'article']
    }),

    // Toksinka article pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka/article_template.html',
      filename: './toksinka/article_template.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka/personal_boundaries.html',
      filename: './toksinka/personal_boundaries.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka/dream_communication.html',
      filename: './toksinka/dream_communication.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka/samozvanets.html',
      filename: './toksinka/samozvanets.html',
      chunks: ['index', 'article']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/toksinka/price_presentation.html',
      filename: './toksinka/price_presentation.html',
      chunks: ['index', 'article']
    }),

    // Interviews pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/interviews/interview_template.html',
      filename: './interviews/interview_template.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/interviews/tanya_morguleva.html',
      filename: './interviews/tanya_morguleva.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/interviews/anya_matiushchenko.html',
      filename: './interviews/anya_matiushchenko.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/interviews/anya_chekushkina.html',
      filename: './interviews/anya_chekushkina.html',
      chunks: ['index']
    }),
    // Errors
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/errors/404.html',
      filename: './errors/404.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/errors/400.html',
      filename: './errors/400.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/errors/500.html',
      filename: './errors/500.html',
      chunks: ['index']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/header.html'),
        location: 'header',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        location: 'footer',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/filters.html'),
        location: 'filters',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/test.html'),
        location: 'test',
        template_filename: '*',
        priority: 'replace'
      }
    ]),

    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
