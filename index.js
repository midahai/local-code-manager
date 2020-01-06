#!/usr/bin/env node
const packageJson = require('./package.json');
const path = require('path');
const {execSync} = require('child_process');

const commander = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const {curry} = require('ramda');
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');

const git = require('./tools/git');
const {getDirList, getGitList} = require('./tools/getDirList');

const listAll = require('./commands/listAll');

// top level async function
(async () => {
  try {
    const program = new commander.Command(packageJson.name)
      .version(packageJson.version, '-v, --version', 'output the current version')

      .command('ls')
      .option('--root <string>', '命令执行的根路径', './')
      .description('列出指定目录下的所有仓库')
      .action(listAll);

    program.parse(process.argv);

    const rootPath = path.resolve(program.root);
    const repos = await getGitList(rootPath);

    const searchRepos = (answersSoFar, input = '') => {
      return new Promise((resolve, reject) => {
        resolve(fuzzy.filter(input, repos).map(repo => repo.original));
      });
    };

    const promptQuestion = {
      type: 'autocomplete',
      name: 'selectRepo',
      message: chalk.yellow('选择仓库：'),
      default: '',
      source: searchRepos,
      // suggestOnly: true
    };

    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

    inquirer
      .prompt(promptQuestion)
      .then(({selectRepo}) => {
        execSync(`open ${selectRepo}`);
      });
  } catch (e) {
    console.log('unhandled error in my code, wow：', e);
  }
})();

// figlet('aoligei', (err, data) => {
//   if (err) {
//     console.log('Something went wrong...');
//     console.dir(err);
//     return;
//   }
//   console.log(data)
// });





