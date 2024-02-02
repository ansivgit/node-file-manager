import { access, constants } from 'fs/promises';

import { MESSAGES } from '../constants.js';

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

export const getLocation = (path) => {
  console.info(`${MESSAGES.location} ${path}!`);
};

export const isPathExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    console.info(MESSAGES.invalidInput);
    return false;
  }
};

export const getArgs = (line, command) => line.slice(command.length + 1);

export const getCommand = (line) => {
  const [ command ] = line.trim().split(' ');
  return command;
};

export const listDirAdapter = (entitiesArr) => {
  const sortedList = entitiesArr.sort((a, b) => a.isFile() - b.isFile())
  const listDirToConsole = sortedList.map((dirEnt) => ({
    Name: dirEnt.name,
    Type: dirEnt.isFile() ? 'file' : 'directory',
  }));

  return listDirToConsole;
};

