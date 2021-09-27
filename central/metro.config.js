// const { getDefaultConfig } = require('@expo/metro-config');

// const {
//     resolver: { sourceExts, assetExts },
// } = getDefaultConfig(__dirname);

// module.exports = {
//     transformer: {
//         getTransformOptions: async () => ({
//             transform: {
//                 experimentalImportSupport: false,
//                 inlineRequires: true,
//             },
//         })
//     },
//     resolver: {
//         sourceExts,
//         assetExts: [...assetExts, 'fcscript']
//     },

// };
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
      resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()
  return {
      transformer: {
          getTransformOptions: async () => ({
              transform: {
                  experimentalImportSupport: false,
                  inlineRequires: false
              }
          })
      },
      resolver: {
        sourceExts,
        assetExts: [...assetExts, 'fcscript']
      }
    }
})()

