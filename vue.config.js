module.exports = {
  lintOnSave: false,
  /* 开启vue运行时模板编译功能！！ */
  runtimeCompiler: true,
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
      // 移除cdn配置，改为使用npm安装的依赖
    }
  },
  configureWebpack: (config) => {
    // 打包忽略文件 - 移除externals配置，使用npm安装的依赖
    if (process.env.NODE_ENV === 'production') {
      // 删除config.externals配置，不使用外部CDN
      delete config.externals;

      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 40000000,
        // 生成文件的最大体积
        maxAssetSize: 20000000,
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        }
      };
    } else {
      config.devtool = 'source-map';
    }
  },
  productionSourceMap: false,
  // 强制内联CSS
  css: { extract: true },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log']
        });
        return args;
      });
    }

    config.module
      .rule('js')
      .include.add('/packages')
      .add('/example')
      .end()

      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
  },
  devServer: {
    proxy: {
      '/wisedata/api/dc_easybi/': {
        target: 'http://bigdata-qa.devdolphin.com',
        changeOrigin: true,
        pathRewrite: {
          '^/wisedata/api': ''
        },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('token', 'dc_easybi_admin');
          proxyReq.setHeader('roles', 'ADMIN');
        }
      }
    }
  }
};
