const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1a1a1d", "@dark": "#1a1a1d" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
