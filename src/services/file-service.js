import fs from 'fs';
import path from 'path';

import { isPathExist, isFileExist, listDirAdapter, getFileDir, getFileName } from '../helpers/index.js';
import { MESSAGES } from '../constants.js';

export class FileService {
  constructor(currentPath) {
    this.currentPath = currentPath;
  }

  #getAbsPath (pathToEnt) {
    return path.resolve(this.currentPath, pathToEnt);
  }

  async cat(pathToFile) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const absPath = this.#getAbsPath(pathToFile);
    const isPathValid = await isPathExist(absPath).then((res) => res);

    if (!isPathValid) {
      return null;
    }

    const readStream = fs.createReadStream(absPath, 'utf8');
    readStream.on('readable', () => {
      console.info(readStream.read());
    });
    // readStream.on('end', () => {
    //   console.log('end');
    // });
    // return this.currentPath;
  }

  async add(fileName) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const absPath = this.#getAbsPath(fileName);
    const isExistingFile = await isFileExist(absPath).then((res) => res);

    if (isExistingFile) {
      console.info(MESSAGES.inputPathExist);
      return null;
    };

    fs.appendFile(absPath, '', 'utf8', (err) => {
      if (err) throw err;
      console.info(`${MESSAGES.emptyFileCreated} ${this.currentPath}`);
    });
  }

  async rn(filePath, newFileName) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const absPath = this.#getAbsPath(filePath);
    const isExistingFile = await isFileExist(absPath).then((res) => res);

    if (!isExistingFile) {
      console.info(MESSAGES.fileNotFound);
      return null;
    };

    const fileDir = await getFileDir(absPath);
    const newFilePath = path.resolve(fileDir, newFileName);

    fs.rename(absPath, newFilePath, (err) => {
      if (err) throw err;
      console.info(MESSAGES.operationComplete);
    });
  }

  async cp(filePath, newPath) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const sourceFileAbsPath = this.#getAbsPath(filePath);
    const destFileAbsPath = this.#getAbsPath(newPath);

    const isExistingFile = await isFileExist(sourceFileAbsPath).then((res) => res);
    if (!isExistingFile) {
      console.info(MESSAGES.fileNotFound);
      return null;
    };
    const fileName = await getFileName(sourceFileAbsPath);

    const isNewPathValid = await isPathExist(destFileAbsPath).then((res) => res);
    if (!isNewPathValid) {
      console.info(MESSAGES.pathNotFound);
      return null;
    };

    const newFileAbsPath = path.resolve(destFileAbsPath, fileName);
    const isAlreadyExist = await isFileExist(newFileAbsPath).then((res) => res);

    if (isAlreadyExist) {
      console.info(MESSAGES.inputPathExist);
      return null;
    };

    const readStream = fs.createReadStream(sourceFileAbsPath);
    const writeStream = fs.createWriteStream(newFileAbsPath);
    readStream.pipe(writeStream);

    return true;
  }

  async mv(filePath, newPath) {
    const isFileCopied = await this.cp(filePath, newPath);
    isFileCopied && await this.rm(filePath);
  }

  async rm(filePath) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const absPath = this.#getAbsPath(filePath);
    const isExistingFile = await isFileExist(absPath).then((res) => res);

    if (!isExistingFile) {
      console.info(MESSAGES.fileNotFound);
      return null;
    };

    fs.rm(absPath, (err) => {
      if (err) throw err;
      console.info(MESSAGES.operationComplete);
    });
  }
}
