const path = require('path');
const { env } = require('process');

module.exports = (env, argv) => {

  // This function creates an object which is then used in the webpack config 
  // when the env variable "use_local_chainjs_code_NOT_npm" is set, 
  // webpack will look to get it's source code from ../chain-js/dist/src
  // becasue ts-loader has options: {projectReferences: true} set, 
  // it will rebuild the chainjs source and output to  ../chain-js/dist/src before webpack creates the final bundle
  var local_chainjs_alias = function() {
    if(env.use_local_chainjs_code_NOT_npm == 'true') {
      return {
        "@testlibs/helpers": path.resolve(__dirname, "../helpers/dist/src"), 
      }
    } else {
      return {}
    }
  }();

  return {entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
            loader:'ts-loader',
            options: {projectReferences: true}
          }],
        exclude: [
          /node_modules/
        ],        
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: local_chainjs_alias,
    fallback: {
      "./package": false,
      "electron": false,
      "expect":false,

    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  devtool: 'cheap-module-source-map',
  target: ["node"],
  mode: 'development'
}
};
