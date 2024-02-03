import fs from 'fs';
import path from 'path';

import { isPathExist, listDirAdapter } from '../helpers/index.js';

export class Navigation {
  constructor(currentPath) {
    this.currentPath = currentPath;
  }

  up() {
    this.currentPath = path.dirname(this.currentPath);
    return this.currentPath;
  }

  async cd(pathToDir) {
    //! добавить валидацию корректности переданного параметра (что не пустой)
    const newPath = path.resolve(this.currentPath, pathToDir);
    const isPathValid = await isPathExist(newPath).then((res) => res);

    if (!isPathValid) {
      return this.currentPath;
    };

    this.currentPath = newPath;
    return this.currentPath;
  }

  ls() {
    fs.readdir(this.currentPath, { withFileTypes: true }, (err, files) => {
      const data = listDirAdapter(files);
      console.table(data)
    });
  }
}
