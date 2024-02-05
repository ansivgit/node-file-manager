import os from 'os';
import { App } from './app.js';
import { getParams } from './helpers/index.js';

// console.log('hello', process.argv);

const userName = getParams(process.argv)?.username || 'Anonymous';
// const currentPath = process.argv[1] || '/Users/annazhuravleva';

console.info(`Welcome to the File Manager, ${userName}!`);

const app = new App(os.homedir());

app.start();

process.on('exit', () => {
  console.info(`Thank you for using File Manager, ${userName}, goodbye!`);
});
