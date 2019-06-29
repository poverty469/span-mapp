const path = require("path");
module.exports = {
  publicPath: "/span-mapp",
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
