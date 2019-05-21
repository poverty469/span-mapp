const path = require("path");
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/_settings.scss")]
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  }
};
