const path = require('path');

module.exports = {
  reactScriptsVersion: "react-scripts",
  style: {
    css: {
      loaderOptions: () => {
        return {
          url: false,
        };
      },
    },
  },
  devServer: (devServerConfig) => {
    // Phục vụ thư mục public ở root '/' để tránh lỗi load ảnh khi chạy npm run dev
    if (devServerConfig.static) {
      const publicStatic = {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
        watch: true,
      };
      if (Array.isArray(devServerConfig.static)) {
        devServerConfig.static.push(publicStatic);
      } else {
        devServerConfig.static = [devServerConfig.static, publicStatic];
      }
    }
    return devServerConfig;
  },
};