var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

// var env = process.env.MY_ENV;
var env = process.env.IONIC_ENV;

console.log("ENVIROMENT " + env);

if (env === 'prod') {
  useDefaultConfig.prod.resolve.alias = {
    "@app/env": path.resolve(environmentPath('prod'))
  };
}

if (env === 'dev') {
  useDefaultConfig.dev.resolve.alias = {
    "@app/env": path.resolve(environmentPath('dev'))
  };
}

if (env !== 'prod' && env !== 'dev') {

  useDefaultConfig[env] = useDefaultConfig.dev;

  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {

  var filePath = './src/environments/environment' + (env === 'prod' ? '.' + env : '.' + env) + '.ts';

  console.log("ENVIROMENT PATH " + filePath);

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};