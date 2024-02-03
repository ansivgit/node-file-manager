import { access, constants, stat } from 'fs/promises';
import path from 'path';
import fs from 'fs';

import { MESSAGES } from '../constants.js';

// *desc Check if path to dir exist */
export const isPathExist = async (path) => {
  console.log('path from validation: ', path);
  try {
    await access(path);
    return true;
  } catch {
    console.info(`${MESSAGES.invalidInput}: ${path}`);
    // return false;
  }
};

// *desc Check if file exist */
export const isFileExist = async (pathToFile) => {
  console.log('path to file from validation: ', pathToFile);
  try {
    await stat(pathToFile);
    return true;
  } catch {
    return false;
  }
};
