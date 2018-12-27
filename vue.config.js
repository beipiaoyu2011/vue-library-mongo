const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const productionGzipExtensions = /\.(js|css|html|svg|jpg|png|gif)?$/i;

const IS_PRO = ['production'].includes(process.env.NODE_ENV);

module.exports = {
    outputDir: 'cdn',
    pages: {
        index: 'src/index.js',
    },
    productionSourceMap: false,
    runtimeCompiler: true,
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             // target: 'http://tools.gofund.cn:8093',
    //             target: 'http://tools-pre.gofund.cn:8093',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': '/api',
    //             },
    //         },
    //     }
    // },
    css: {
        extract: IS_PRO
    },
    chainWebpack: config => {
        // console.log(IS_PRO, config.plugins);
        // 修复HMR
        config.resolve.symlinks(true);
        //alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@less', resolve('src/less'))
            .set('@c', resolve('src/components'))
            .set('@pages', resolve('src/pages'))
            .set('@mixins', resolve('src/mixins'))
            .set('lodash-es', 'lodash')
        // 图片压缩
        config.module
            .rule('imgCompression')
            .test(/\.(jpe?g|png|gif|svg)$/)
            .pre()
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
        // 修改图片是否 inline 大小阈值
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                // Inline files smaller than 10 kB (10240 bytes)
                options.limit = 10 * 1024
                return options
            })
        // 清除默认的 file-loader 设置, 并使用 svg-url-loader 来处理 svg
        config.module
            .rule('svg')
            .uses.clear()
            .end()
            .use('svg-url-loader')
            .loader('svg-url-loader')
            // Inline files smaller than 10 kB (10240 bytes)
            .tap(() => ({
                limit: 10 * 1024,
                noquotes: true,
                name: 'img/[name].[hash:8].[ext]',
            }))
    },

    configureWebpack: config => {
        //analyze lodash  gzip plugins
        if (IS_PRO) {
            const plugins = [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false
                }),
                new LodashWebpackPlugin,
                //压缩gzip
                new CompressionPlugin({
                    deleteOriginalAssets: false,
                    test: productionGzipExtensions,
                    compressionOptions: {
                        numiterations: 15
                    },
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    }
                })
            ];
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
        config.optimization = {
            // just split js
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors',
                        test: /[\\\/]node_modules[\\\/].*js/,
                        minChunks: 2,
                        priority: -10,
                        chunks: 'initial',
                    },
                    common: {
                        name: 'chunk-common',
                        test: /\.js$/,
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true,
                    },
                    css: {
                        name: 'chunk-common',
                        test: /\.less$/,
                        minChunks: 10,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true,
                    },
                },
            },
        };
    }


};