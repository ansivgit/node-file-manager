import { createInterface } from 'readline';

import { Navigation, FileService } from './services/index.js';
import { getLocation, getArgs, getCommand } from './helpers/index.js';
import { MESSAGES } from './constants.js';

export class App {
  constructor(currentPath) {
    this.currentPath = currentPath;
  }

  #rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    // prompt: 'COMMAND> ',
  });

  #navigation;
  #fileService;

  async up() {
    this.#navigation = new Navigation(this.currentPath);

    const newPath = await this.#navigation.up();
    this.currentPath = newPath;

    return newPath;
  }

  async cd(args = '') {
    this.#navigation = new Navigation(this.currentPath);

    const newPath = await this.#navigation.cd(args);
    this.currentPath = newPath;

    return newPath;
  }

  async ls() {
    this.#navigation = new Navigation(this.currentPath);
    await this.#navigation.ls();

    return null;
  }

  async cat(args = '') {
    this.#fileService = new FileService();
    await this.#fileService.cat(args);

    return null;
  }

  async start() {
    getLocation(this.currentPath);

    // this.#rl.prompt();

    // TODO вынести колбек в отдельную функцию (перебор всех команд)
    this.#rl.on('line', async (line) => {
      await this.getHandler(line);
      getLocation(this.currentPath);

      // this.#rl.prompt();
    })
    // .on('close', () => {
    //   console.log('Have a great day!');
    //   process.exit(0);
    // });
  }

  exit() {
    process.exit(0);
  }

  async getHandler(line) {
    const command = getCommand(line);

    //TODO переписать по  возможности на вид:
    // await this[command]()

    switch (command) {
      case 'up':
        await this[command]();
        break;
      case 'cd':
        const path = getArgs(line, command);
        await this.cd(path);
        break;
      case 'ls':
        await this.ls();
        break;

      case 'cat':
          const pathToFile = getArgs(line, command);
          this.cat(pathToFile);
          break;

      case '.exit':
        this.exit();
        break;
      default:
        console.info(`${MESSAGES.invalidInput} '${line.trim()}'`);
        break;

      }
  }
}
