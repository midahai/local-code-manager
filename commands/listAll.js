const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');

const {getDirList, getGitList} = require('../tools/getDirList');

function listAll(options) {
  console.log('list all:::', options);
  // const rootPath = path.resolve(program.root);
  // getGitList(rootPath).then(repos => {
  //   const searchRepos = (answersSoFar, input = '') => {
  //     return new Promise((resolve, reject) => {
  //       resolve(fuzzy.filter(input, repos).map(repo => repo.original));
  //     });
  //   };
  //
  //   const promptQuestion = {
  //     type: 'autocomplete',
  //     name: 'testPrompt',
  //     message: chalk.yellow('请选择一个仓库:'),
  //     default: '',
  //     source: searchRepos,
  //     suggestOnly: true
  //   };
  //
  //   inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
  //
  //   inquirer
  //     .prompt(promptQuestion)
  //     .then(res => {
  //       console.log('answer', res);
  //     });
  // }).catch(e => {
  //   console.log('error at listAll: ', e);
  // });
};

module.exports = listAll;
