const fs = require('fs');
const path = require('path');

const {isGit} = require('./git');

// 获取所有路径列表
const getDirList = (rootDir = './', {
  mapper = i => i,
  excludes = ['node_modules', '.git', '.idea']
} = {}) => {
  const result = [];

  // 递归的读路径，返回所有的路径
  const readDirSync = (dir) => {
    const fileList = fs.readdirSync(dir);
    fileList.forEach((fileName, index) => {

      // 暂时先用写死的 exclude
      if (~excludes.indexOf(fileName)) {
        return;
      }
      const currentPath = path.join(dir, fileName);
      const info = fs.statSync(currentPath);
      if (info.isDirectory()) {
        result.push(currentPath);
        readDirSync(currentPath);
      }
    });
  };

  readDirSync(rootDir);

  return result.map(mapper);
};

// 拿 git 仓库的列表
const getGitList = async (rootDir = './', {
  excludes = ['node_modules', '.git', '.idea'],
} = {}) => {
  const dirList = getDirList(rootDir, {excludes});

  const reducer = async (accumulator, currentValue) => {
    const result = await accumulator;
    const resultLength = result.length;
    if (resultLength !== 0) {
      const isSubDir = ~currentValue.indexOf(result[result.length - 1]);
      if (!isSubDir && await isGit(currentValue)) {
        result.push(currentValue);
      }
    } else if (await isGit(currentValue)) {
      result.push(currentValue);
    }

    return accumulator;
  };

  return await dirList.reduce(reducer, Promise.resolve([]));
};

module.exports = {
  getDirList,
  getGitList,
};
