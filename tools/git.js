const {execSync} = require('child_process');
const path = require('path');
const simpleGit = require('simple-git');

// check if at a git repository
const isGit = (gitPath) => {
  return new Promise(resolve => {
    const handler = (er, isRepo) => {
      resolve(isRepo);
    };
    simpleGit(gitPath).checkIsRepo(handler);
  })
};

const checkIgnore = (gitPath, fileList) => {
  return new Promise(resolve => {
    const handler = (er, isIgnored) => {
      resolve(isIgnored)
    };
    simpleGit(gitPath).checkIgnore(fileList, handler);
  });
};

module.exports = {isGit};
