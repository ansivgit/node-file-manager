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

// *desc Get path to current dir */
export const getLocation = (path) => {
  console.info(`${MESSAGES.location} ${path}!`);
};

// *desc Get command args */
export const getArgs = (line, command) => {
  console.log(line.slice(command.length + 1));
  return line.slice(command.length + 1)
};

export const getCommand = (line) => {
  const [ command ] = line.trim().split(' ');
  return command;
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
