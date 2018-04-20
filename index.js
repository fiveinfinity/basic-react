#!/usr/bin/env node
var program = require('commander');
const { exec } = require('child-process-promise');
const ora = require('ora');
let spinner;
const dependencies = 'npm install --save react react-dom';
const devDependencies = 'npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-loader html-webpack-plugin jest json-loader style-loader url-loader webpack webpack-cli webpack-dev-server webpack-merge';

program
  .version('0.0.1')
  .description('Minimal build system for React, Webpack, Babel, & Jest')
  .option('-n, --name', 'Name your project')
  .action(function (dir, cmd) {
    exec(`mkdir ${dir}`);

    spinner = ora('Installing Dependencies...').start();
    exec(`cp files/package.json ${dir}/package.json && cd ${dir} && npm init -y && ${dependencies} && ${devDependencies}`).then(function () {
      spinner.text = 'Creating Directories...';
      exec(`mkdir ${dir}/public && mkdir ${dir}/src`).then(function () {
        spinner.text = 'Copying Files...';
        exec(`cp files/index.js ${dir}/src/index.js && cp files/index.html ${dir}/public/index.html && cp files/.babelrc ${dir}/.babelrc && cp files/.gitignore ${dir}/.gitignore && cp files/webpack.common.js ${dir}/webpack.common.js && cp files/webpack.dev.js ${dir}/webpack.dev.js`);
        spinner.stop();
      });
    });

    

    
  });

program.parse(process.argv);