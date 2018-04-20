#!/usr/bin/env node
var program = require('commander');
const { exec } = require('child-process-promise');;
const ora = require('ora');
let spinner;

const commands = {
  makeDirectories: function(name) { return `mkdir ${name} && mkdir ${name}/public && mkdir ${name}/src` },
  copyPackageJSON: function(name) { return `cp files/package.json ${name}/package.json` },
  enterDirectory: function(name) { return `cd ${name}` },
  npmInit: 'npm init -y',
  dependencies: 'npm install --save react react-dom',
  devDependencies: 'npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-loader html-webpack-plugin jest json-loader style-loader url-loader webpack webpack-cli webpack-dev-server webpack-merge',
  removePackageLock: 'rm -rf package-lock.json',
  copyFiles: function(name) { return `cp files/index.js ${name}/src/index.js && cp files/index.html ${name}/public/index.html` },
  copyUpdates: function(name) { return `cp files/updates/.babelrc ${name}/.babelrc && cp files/updates/.gitignore ${name}/.gitignore && cp files/updates/webpack.common.js ${name}/webpack.common.js && cp files/updates/webpack.dev.js ${name}/webpack.dev.js` }
};

program
  .version('0.0.1')
  .description('Minimal build system for React, Webpack, Babel, & Jest')
  .option('-n, --name <name>', 'Name your project')
  .option('-u, --update', 'Update configuration files')
  .parse(process.argv);

(function(program){
  const { name, update } = program;

  if (!name) {
    console.log('basic-react requires a project name. Please enter your command as follows: `basic-react --name <project name>`');
    return;
  }

  const message = update ? 'Updating Files...' : 'Generating Files & Installing Dependencies...';
  spinner = ora(message).start();

  try {
    const { makeDirectories, copyPackageJSON, enterDirectory, npmInit, dependencies, devDependencies, removePackageLock, copyFiles, copyUpdates } = commands;
    if (update) {
      exec(`${copyUpdates(name)} && ${enterDirectory(name)} && ${removePackageLock} && ${dependencies} && ${devDependencies}`)
      .then(function () { spinner.stop() });
    } else {
      exec(`${makeDirectories(name)} && ${copyPackageJSON(name)} && ${copyFiles(name)} && ${copyUpdates(name)} && ${enterDirectory(name)} && ${npmInit} && ${dependencies} && ${devDependencies}`)
      .then(function () { spinner.stop() });
    }
  } catch (e) {
    spinner.stop()
    console.log('ERROR: ', e);
  }
}(program));
