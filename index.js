#!/usr/bin/env node
var program = require('commander');
const { exec } = require('child-process-promise');;
const ora = require('ora');
let spinner;

const commands = {
  makeDirectories: function(name) { return `mkdir ${name} && mkdir ${name}/public && mkdir ${name}/src && mkdir ${name}/src/components` },
  copyPackageJSON: function(name) { return `cp files/package.json ${name}/package.json` },
  enterDirectory: function(name) { return `cd ${name}` },
  npmInit: 'npm init -y',
  dependencies: 'npm install --save react react-dom rebass styled-components',
  devDependencies: 'npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-loader html-webpack-plugin jest json-loader style-loader url-loader webpack webpack-cli webpack-dev-server webpack-merge babel-plugin-transform-class-properties babel-polyfill babel-plugin-transform-object-rest-spread',
  removePackageLock: 'rm -rf package-lock.json',
  installRedux: 'npm install --save redux react-redux',
  copyFiles: function(name) { return `cp files/index.js ${name}/src/index.js && cp files/index.html ${name}/public/index.html && cp files/components/index.js ${name}/src/components/index.js && cp files/components/title.js ${name}/src/components/title.js && cp files/style-theme.js ${name}/style-theme.js` },
  copyUpdates: function(name) { return `cp files/updates/.babelrc ${name}/.babelrc && cp files/updates/.gitignore ${name}/.gitignore && cp files/updates/webpack.common.js ${name}/webpack.common.js && cp files/updates/webpack.dev.js ${name}/webpack.dev.js` },
  copyRedux: function(name) { return `mkdir ${name}/src/redux && cp files/redux/base.js ${name}/src/index.js && cp files/redux/actions.js ${name}/src/redux/actions.js && cp files/redux/index.js ${name}/src/redux/index.js && cp files/redux/reducers.js ${name}/src/redux/reducers.js && cp files/index.html ${name}/public/index.html && cp files/components/index.js ${name}/src/components/index.js && cp files/redux/component.js ${name}/src/components/title.js && cp files/style-theme.js ${name}/style-theme.js` },
};

program
  .version('0.0.1')
  .description('Minimal build system for React, Webpack, Babel, & Jest')
  .option('-n, --name <name>', 'Name your project')
  .option('-u, --update', 'Update configuration files')
  .option('-r, --redux', 'Add Redux to project')
  .parse(process.argv);

(function(program){
  const { name, update, redux } = program;

  if (!name) {
    console.log('basic-react requires a project name. Please enter your command as follows: `basic-react --name <project name>`');
    return;
  }

  const message = update ? 'Updating Files...' : 'Generating Files & Installing Dependencies...';
  spinner = ora(message).start();

  try {
    const { 
      makeDirectories, 
      copyPackageJSON, 
      enterDirectory, 
      npmInit, 
      dependencies, 
      devDependencies, 
      removePackageLock,
      installRedux,
      copyRedux,
      copyFiles, 
      copyUpdates } = commands;

    if (update) {
      exec(`${copyUpdates(name)} && ${enterDirectory(name)} && ${removePackageLock} && ${dependencies} && ${devDependencies}`)
      .then(function () { spinner.stop() });
    } else if (redux) {
      exec(`${makeDirectories(name)} && ${copyPackageJSON(name)} && ${copyFiles(name)} && ${copyUpdates(name)} && ${copyRedux(name)} && ${enterDirectory(name)} && ${npmInit} && ${dependencies} && ${installRedux} && ${devDependencies}`)
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
