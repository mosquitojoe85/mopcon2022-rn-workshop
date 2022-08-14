// Learn more https://docs.expo.io/guides/customizing-metro
const extraNodeModules = require('node-libs-expo');

module.exports = {
  resolver: {
    extraNodeModules,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};