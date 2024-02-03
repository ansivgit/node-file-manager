import fs from 'fs';
import path from 'path';

import { isPathExist, isFileExist, listDirAdapter } from '../helpers/index.js';
import { MESSAGES } from '../constants.js';

export class FileService {
  constructor(currentPath) {
    this.currentPath = currentPath;
  }

  async cat(pathToFile) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const absPath = path.resolve(this.currentPath, pathToFile);
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
    const filePath = path.resolve(this.currentPath, fileName);
    const isExistingFile = await isFileExist(filePath).then((res) => res);

    if (isExistingFile) {
      console.info(MESSAGES.fileExist);
      return null;
    };

    fs.appendFile(filePath, '', 'utf8', (err) => {
      if (err) throw err;
      console.info(`${MESSAGES.emptyFileCreated} ${this.currentPath}`);
    });
  }

  rn() {
    fs.readdir(this.currentPath, {withFileTypes: true}, (err, files) => {
      const data = listDirAdapter(files);
      console.table(data)
    });
  }

  cp() {
    fs.readdir(this.currentPath, {withFileTypes: true}, (err, files) => {
      const data = listDirAdapter(files);
      console.table(data)
    });
  }

  mv() {
    fs.readdir(this.currentPath, {withFileTypes: true}, (err, files) => {
      const data = listDirAdapter(files);
      console.table(data)
    });
  }

  rm() {
    fs.readdir(this.currentPath, {withFileTypes: true}, (err, files) => {
      const data = listDirAdapter(files);
      console.table(data)
    });
  }
}
