import { createInterface } from 'readline';

import { Navigation, FileService } from './services/index.js';
import { getLocation, getArgs, getParsedArgs, getCommand } from './helpers/index.js';
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
  }

  async cat(args = '') {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.cat(args);
  }

  async add(fileName = '') {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.add(fileName);
  }

  async rn(filePath = '', newFileName = '') {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.rn(filePath, newFileName);
  }

  async cp(filePath = '', newPath = '') {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.cp(filePath, newPath);
  }

  async mv(filePath = '', newPath = '') {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.mv(filePath, newPath);
  }

  async rm(filePath) {
    this.#fileService = new FileService(this.currentPath);
    await this.#fileService.rm(filePath);
  }

  async start() {
    getLocation(this.currentPath);

    // this.#rl.prompt();

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
      case 'add':
        const fileName = getArgs(line, command);
        this.add(fileName);
        break;
      case 'rn':
        const rnArgs = getArgs(line, command);
        const parsedRnArgs = getParsedArgs(rnArgs)
        this.rn(...parsedRnArgs);
        break;
      case 'cp':
        const cpArgs = getArgs(line, command);
        const parsedCpArgs = getParsedArgs(cpArgs)
        this.cp(...parsedCpArgs);
        break;
      case 'mv':
        const mvArgs = getArgs(line, command);
        const parsedMvArgs = getParsedArgs(mvArgs)
        this.mv(...parsedMvArgs);
        break;
      case 'rm':
        const rmArgs = getArgs(line, command);
        const parsedRmArgs = getParsedArgs(rmArgs)
        this.rm(...parsedRmArgs);
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
