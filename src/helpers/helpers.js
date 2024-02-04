import path from 'path';

import { MESSAGES } from '../constants.js';

// *desc Get users parameters when app starts */
export const getParams = (args = []) => {
  if (!args.slice(2).length) {
    return null;
  }

  const params = args.filter((arg) => arg.includes('--'));

  const paramsObject = {};

  params.forEach((param) => {
    const paramParsed = param.slice(2).split('=');
    paramsObject[paramParsed[0]] = paramParsed[1];
  });

  return paramsObject;
};

// *desc Log path to current dir */
export const getLocation = (path) => {
  console.info(`${MESSAGES.location} ${path}!`);
};

// *desc Get fm's command */
export const getCommand = (line) => {
  const [ command ] = line.trim().split(' ');
  return command;
};

// *desc Get command args */
export const getArgs = (line, command) => {
  // console.log(line.slice(command.length + 1));
  return line.slice(command.length + 1);
};

// *desc Get array of args */
export const getParsedArgs = (args = '') => {
  const parsedArgs = args.trim().split(' ') || [];
  return parsedArgs;
};

// *desc Transform dir entities object to task requirements */
export const listDirAdapter = (entitiesArr) => {
  const sortedList = entitiesArr.sort((a, b) => a.isFile() - b.isFile());

  const listDirToConsole = sortedList.map((dirEnt) => ({
    Name: dirEnt.name,
    Type: dirEnt.isFile() ? 'file' : 'directory',
  }));

  return listDirToConsole;
};

// *desc Get file's dir */
export const getFileDir = async (pathToFile) => {
  try {
    // const isFile = isFileExist(pathToFile);
    const parsedPath = path.parse(pathToFile);
    return parsedPath.dir;
  } catch {
    return null;
  }
};

// *desc Get file name */
export const getFileName = async (pathToFile) => {
  try {
    const parsedPath = path.parse(pathToFile);
    return parsedPath.base;
  } catch {
    return null;
  }
};
